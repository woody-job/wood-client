import { FC, useMemo } from 'react'

import { useParams } from 'react-router-dom'

import { Box, CircularProgress, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { GridColDef } from '@mui/x-data-grid/models/colDef/gridColDef'

import { AddInputWoodButton } from '@/features/wood-input-woods/add'
import { UpdateInputWoodButton } from '@/features/wood-input-woods/update'
import {
  useDeleteBeamInForWorkshopMutation,
  useFetchAllBeamInForWorkshopQuery,
} from '@/entities/beam-in/api'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { CommonErrorType } from '@/shared/types'
import { ButtonWithConfirm, CustomGridPanel, dataGridStyles } from '@/shared/ui'
import { DataGridContainer, dataGridLocaleText } from '@/shared/ui/data-grid'

import { WORKSHOP_BEAM_IN_TABLE_COLUMNS } from '../constants'
import { WorkshopBeamInTableRow } from '../types/types'
import { enqueueSnackbar } from 'notistack'

type WorkshopInputWoodsProps = {
  now: string
}

export const WorkshopInputWoods: FC<WorkshopInputWoodsProps> = ({ now }) => {
  const { workshopId } = useParams()

  const [deleteBeamInMutation] = useDeleteBeamInForWorkshopMutation()

  const { data: beamIn, isLoading: isBeamInLoading } = useFetchAllBeamInForWorkshopQuery(
    { workshopId: workshopId ? Number(workshopId) : -1, startDate: now, endDate: now },
    { skip: !workshopId }
  )

  const beamInData = beamIn ? beamIn.data : []
  const totalVolume = beamIn?.totalVolume ? beamIn.totalVolume : 0

  const handleDeleteBeamIn = (beamInId: number) => {
    deleteBeamInMutation({ beamInId })
      .unwrap()
      .then(() => {
        enqueueSnackbar('Вход в цех успешно удален', { variant: 'info' })
      })
      .catch((error: CommonErrorType) => {
        defaultErrorHandler(error, message => enqueueSnackbar(message, { variant: 'error' }))
      })
  }

  const columns: GridColDef[] = [
    ...WORKSHOP_BEAM_IN_TABLE_COLUMNS,
    {
      field: 'actions',
      headerName: '',
      disableColumnMenu: true,
      sortable: false,
      width: 100,
      renderCell: params => {
        return (
          <Box sx={{ ml: 'auto' }}>
            <UpdateInputWoodButton beamIn={params.row} sx={{ mr: 1 }} />
            <ButtonWithConfirm
              header='Удалить лес на вход'
              description='Вы точно хотите удалить вход леса?'
              onConfirm={() => {
                handleDeleteBeamIn(params.row.id)
              }}
            >
              Удалить
            </ButtonWithConfirm>
          </Box>
        )
      },
    },
  ]

  const rows: WorkshopBeamInTableRow[] = useMemo(() => {
    return beamInData
      ? beamInData.map(beamIn => {
          return {
            id: beamIn.id,
            amount: beamIn.amount,
            volume: Number((beamIn.beamSize.volume * beamIn.amount).toFixed(2)),
            diameter: beamIn.beamSize.diameter,
          }
        })
      : []
  }, [beamInData])

  return (
    <Box>
      <Box display='flex' mb={1}>
        <Typography variant='h6'>Вход</Typography>
        <AddInputWoodButton now={now} sx={{ ml: 'auto' }}>
          Добавить
        </AddInputWoodButton>
      </Box>
      <DataGridContainer height={400}>
        {isBeamInLoading && (
          <Box sx={{ width: '100%', height: '80%', display: 'grid', placeContent: 'center' }}>
            <CircularProgress size={100} />
          </Box>
        )}
        {beamInData && !isBeamInLoading && (
          <DataGrid
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
            disableMultipleRowSelection
            localeText={dataGridLocaleText}
            sx={dataGridStyles}
            hideFooter
            slots={{ panel: CustomGridPanel }}
          />
        )}
      </DataGridContainer>
      <Typography sx={{ mt: 0.5, mb: 2 }}>Всего м3: {totalVolume}</Typography>
    </Box>
  )
}
