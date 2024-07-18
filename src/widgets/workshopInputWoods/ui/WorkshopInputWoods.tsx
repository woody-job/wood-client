import { FC, useMemo, useState } from 'react'

import { useParams } from 'react-router-dom'

import { Box, CircularProgress, Typography } from '@mui/material'
import { DataGrid, GridCellParams } from '@mui/x-data-grid'
import { GridColDef } from '@mui/x-data-grid/models/colDef/gridColDef'

import { AddInputWoodButton } from '@/features/wood-input-woods/add'
import { UpdateInputWoodButton } from '@/features/wood-input-woods/update'
import { useAuth } from '@/entities/auth'
import {
  useDeleteBeamInForWorkshopMutation,
  useFetchAllBeamInForWorkshopQuery,
  useFetchBeamSizesByLengthQuery,
} from '@/entities/beam-in/api'
import { USER_ROLE } from '@/entities/user'
import { EVENT_NAME } from '@/shared/constants'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { useSubscribeEvent } from '@/shared/libs/hooks/subscribe-event'
import { CommonErrorType } from '@/shared/types'
import { ButtonWithConfirm, CustomGridPanel, dataGridStyles, TableFullscreen } from '@/shared/ui'
import {
  DataGridContainer,
  DataGridFullscreenButton,
  dataGridLocaleText,
} from '@/shared/ui/data-grid'
import { CustomToolbar } from '@/shared/ui/data-grid/ui/CustomToolbar'

import { WORKSHOP_BEAM_IN_TABLE_COLUMNS } from '../constants'
import { getWorkshopBeamInDefaults } from '../libs/helpers'
import { WorkshopBeamInTableRow } from '../types/types'
import { enqueueSnackbar } from 'notistack'

type WorkshopInputWoodsProps = {
  now: string
}

export const WorkshopInputWoods: FC<WorkshopInputWoodsProps> = ({ now }) => {
  const { workshopId } = useParams()

  const user = useAuth()

  const isAdmin = user?.role.name === USER_ROLE.SUPERADMIN || user?.role.name === USER_ROLE.ADMIN

  const [deleteBeamInMutation, { isLoading: isLoadingDeleteBeamInMutation }] =
    useDeleteBeamInForWorkshopMutation()

  const { data: beamIn, isLoading: isBeamInLoading } = useFetchAllBeamInForWorkshopQuery(
    { workshopId: workshopId ? Number(workshopId) : -1, startDate: now, endDate: now },
    { skip: !workshopId }
  )

  const { data: beamSizes } = useFetchBeamSizesByLengthQuery({ length: 6 })

  const beamInData = beamIn ? beamIn.data : []
  const totalVolume = beamIn?.totalVolume ? beamIn.totalVolume : 0

  const [selectedWoodNamingId, setSelectedWoodNamingId] = useState<number | null>(null)

  useSubscribeEvent(EVENT_NAME.WOOD_NAMING_OF_THE_DAY_CHANGE, ({ detail: { woodNamingId } }) => {
    setSelectedWoodNamingId(woodNamingId ?? null)
  })

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
    ...(isAdmin
      ? [
          {
            field: 'actions',
            headerName: '',
            disableColumnMenu: true,
            sortable: false,
            width: 100,
            renderCell: (params: GridCellParams) => {
              return (
                <Box sx={{ ml: 'auto' }}>
                  <UpdateInputWoodButton
                    selectedWoodNamingId={selectedWoodNamingId}
                    beamIn={params.row}
                    now={now}
                    sx={{ mr: 1 }}
                  />
                  <ButtonWithConfirm
                    isLoading={isLoadingDeleteBeamInMutation}
                    header='Удалить лес на вход'
                    description='Вы точно хотите удалить вход леса?'
                    disabled={!params.row.amount}
                    onConfirm={() => {
                      handleDeleteBeamIn(params.row.beamInId)
                    }}
                  >
                    Удалить
                  </ButtonWithConfirm>
                </Box>
              )
            },
          },
        ]
      : []),
  ]

  const rows: WorkshopBeamInTableRow[] = useMemo(() => {
    if (!beamInData || !workshopId || !beamSizes) {
      return []
    }

    const defaults = getWorkshopBeamInDefaults(beamSizes, workshopId)

    const actualData = beamInData.map(beamIn => {
      return {
        id: new Date().valueOf(),
        amount: beamIn.amount,
        volume: Number((beamIn.beamSize.volume * beamIn.amount).toFixed(2)),
        diameter: beamIn.beamSize.diameter,
        beamSizeId: beamIn.beamSize.id,
        beamInId: beamIn.id,
        beamSize: beamIn.beamSize,
        woodNaming: beamIn.woodNaming.name,
        isEmptyDefault: false,
      }
    })

    const output = defaults

    actualData.forEach(actualDataBeamIn => {
      const inDefaults = output.find(defaultItem => {
        return defaultItem.diameter === actualDataBeamIn.diameter
      })

      if (inDefaults) {
        inDefaults.amount = actualDataBeamIn.amount
        inDefaults.beamInId = actualDataBeamIn.beamInId
        inDefaults.woodNaming = actualDataBeamIn.woodNaming
        inDefaults.isEmptyDefault = false
        inDefaults.volume = Number(
          (actualDataBeamIn.beamSize.volume * actualDataBeamIn.amount).toFixed(2)
        )

        return
      }

      output.unshift(actualDataBeamIn)
    })

    return output
  }, [beamInData, beamSizes])

  return (
    <Box>
      <Box display='flex' mb={1}>
        <Typography variant='h6'>Вход</Typography>
        {isAdmin && (
          <AddInputWoodButton
            selectedWoodNamingId={selectedWoodNamingId}
            now={now}
            sx={{ ml: 'auto' }}
          >
            Добавить
          </AddInputWoodButton>
        )}
      </Box>
      <TableFullscreen
        renderTable={({ fullscreen, onFullscreen }) => (
          <DataGridContainer height={fullscreen ? '95vh' : '50vh'}>
            {onFullscreen && <DataGridFullscreenButton onClick={onFullscreen} />}
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
                // @eslint-ignore
                // @ts-expect-error 'error occured'
                slots={{ panel: CustomGridPanel, toolbar: CustomToolbar }}
                slotProps={{
                  toolbar: { withExcelExport: false },
                }}
              />
            )}
          </DataGridContainer>
        )}
      />
      <Typography sx={{ mt: 0.5, mb: 2 }}>Всего м3: {totalVolume}</Typography>
    </Box>
  )
}
