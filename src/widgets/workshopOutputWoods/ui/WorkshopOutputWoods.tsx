import { FC, useMemo } from 'react'

import { useParams } from 'react-router-dom'

import { Box, CircularProgress, Typography } from '@mui/material'
import { DataGrid, GridCellParams } from '@mui/x-data-grid'
import { GridColDef } from '@mui/x-data-grid/models/colDef/gridColDef'

import { AddOutputWoodButton } from '@/features/wood-output-woods/add'
import { UpdateOutputWoodButton } from '@/features/wood-output-woods/update'
import { useAuth } from '@/entities/auth'
import { getDimensionString, useFetchAllDimensionsQuery } from '@/entities/dimension'
import { USER_ROLE } from '@/entities/user'
import { useFetchAllWoodTypesQuery } from '@/entities/wood-type'
import { useDeleteWorkshopOutMutation } from '@/entities/workshop-out/api'
import { WorkshopOut } from '@/entities/workshop-out/model'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { CommonErrorType } from '@/shared/types'
import { ButtonWithConfirm, TableFullscreen } from '@/shared/ui'
import {
  CustomGridPanel,
  DataGridContainer,
  DataGridFullscreenButton,
  dataGridLocaleText,
  dataGridStyles,
} from '@/shared/ui/data-grid'
import { CustomToolbar } from '@/shared/ui/data-grid/ui/CustomToolbar'

import { WORKSHOP_OUT_TABLE_COLUMNS } from '../constants'
import { getWorkshopOutDefaults } from '../libs/helpers'
import { WorkshopOutTableRow } from '../types'
import { enqueueSnackbar } from 'notistack'

export type WorkshopOutWoodsProps = {
  workshopOutData: WorkshopOut[] | undefined
  isWorkshopOutLoading: boolean
  totalWorkshopOutVolume: number
  now: string
}

export const WorkshopOutputWoods: FC<WorkshopOutWoodsProps> = ({
  workshopOutData,
  isWorkshopOutLoading,
  totalWorkshopOutVolume,
  now,
}) => {
  const { workshopId } = useParams()

  const [deleteWorkshopOutMutation, { isLoading: isLoadingDeleteWorkshopOutMutation }] =
    useDeleteWorkshopOutMutation()

  const { data: dimensions } = useFetchAllDimensionsQuery()

  const { data: woodTypes } = useFetchAllWoodTypesQuery()

  const user = useAuth()

  const isAdmin = user?.role.name === USER_ROLE.SUPERADMIN || user?.role.name === USER_ROLE.ADMIN

  const handleDeleteWorkshopOut = (workshopOutId: number) => {
    deleteWorkshopOutMutation({ workshopOutId })
      .unwrap()
      .then(() => {
        enqueueSnackbar('Выход из цеха успешно удален', { variant: 'info' })
      })
      .catch((error: CommonErrorType) => {
        defaultErrorHandler(error, message => enqueueSnackbar(message, { variant: 'error' }))
      })
  }

  const columns: GridColDef[] = [
    ...WORKSHOP_OUT_TABLE_COLUMNS,
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
                  <UpdateOutputWoodButton now={now} workshopOut={params.row} sx={{ mr: 1 }} />
                  <ButtonWithConfirm
                    isLoading={isLoadingDeleteWorkshopOutMutation}
                    header='Удалить лес на выход'
                    description='Вы точно хотите удалить выход леса?'
                    onConfirm={() => {
                      handleDeleteWorkshopOut(params.row.workshopOutId)
                    }}
                  />
                </Box>
              )
            },
          },
        ]
      : []),
  ]

  const rows: WorkshopOutTableRow[] = useMemo(() => {
    if (!workshopOutData || !dimensions || !workshopId || !woodTypes) {
      return []
    }

    const defaults = getWorkshopOutDefaults({
      dimensions,
      woodTypes,
      workshopId,
    })

    const actualData = workshopOutData.map(({ id, woodClass, woodType, amount, dimension }) => {
      return {
        id: id,
        woodClass: woodClass.name,
        woodClassId: woodClass.id,
        dimension: getDimensionString(dimension),
        dimensionId: dimension.id,
        woodType: woodType.name,
        woodTypeId: woodType.id,
        amount: amount,
        workshopOutId: id,
        isEmptyDefault: false,
      }
    })

    const output = defaults

    actualData.forEach(actualDataWorkshopOut => {
      const inDefaults = output.find(defaultItem => {
        return (
          defaultItem.dimensionId === actualDataWorkshopOut.dimensionId &&
          defaultItem.woodTypeId === actualDataWorkshopOut.woodTypeId
        )
      })

      if (inDefaults) {
        inDefaults.amount = actualDataWorkshopOut.amount
        inDefaults.workshopOutId = actualDataWorkshopOut.id
        inDefaults.isEmptyDefault = false

        return
      }

      output.unshift(actualDataWorkshopOut)
    })

    return output
  }, [workshopOutData, dimensions, woodTypes])

  return (
    <Box>
      <Box display='flex' mb={1}>
        <Typography variant='h6'>Выход</Typography>
        {isAdmin && (
          <AddOutputWoodButton now={now} sx={{ ml: 'auto' }}>
            Добавить
          </AddOutputWoodButton>
        )}
      </Box>
      <TableFullscreen
        renderTable={({ fullscreen, onFullscreen }) => (
          <DataGridContainer height={fullscreen ? '100%' : '50vh'}>
            {onFullscreen && <DataGridFullscreenButton onClick={onFullscreen} />}
            {isWorkshopOutLoading && (
              <Box sx={{ width: '100%', height: '80%', display: 'grid', placeContent: 'center' }}>
                <CircularProgress size={100} />
              </Box>
            )}
            {workshopOutData && !isWorkshopOutLoading && (
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
      <Typography sx={{ mt: 0.5, mb: 2 }}>Всего м3: {totalWorkshopOutVolume}</Typography>
    </Box>
  )
}
