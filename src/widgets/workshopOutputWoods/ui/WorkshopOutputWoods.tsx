import { FC, useMemo } from 'react'

import { Box, CircularProgress, Typography } from '@mui/material'
import { DataGrid, GridCellParams } from '@mui/x-data-grid'
import { GridColDef } from '@mui/x-data-grid/models/colDef/gridColDef'

import { AddOutputWoodButton } from '@/features/wood-output-woods/add'
import { UpdateOutputWoodButton } from '@/features/wood-output-woods/update'
import { useAuth } from '@/entities/auth'
import { USER_ROLE } from '@/entities/user'
import { useDeleteWorkshopOutMutation } from '@/entities/workshop-out/api'
import { WorkshopOut } from '@/entities/workshop-out/model'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { CommonErrorType } from '@/shared/types'
import { ButtonWithConfirm } from '@/shared/ui'
import {
  CustomGridPanel,
  DataGridContainer,
  dataGridLocaleText,
  dataGridStyles,
} from '@/shared/ui/data-grid'

import { WORKSHOP_OUT_TABLE_COLUMNS } from '../constants'
import { enqueueSnackbar } from 'notistack'

export type WorkshopOutWoodsProps = {
  workshopOutData: WorkshopOut[] | undefined
  isWorkshopOutLoading: boolean
  now: string
}

export const WorkshopOutputWoods: FC<WorkshopOutWoodsProps> = ({
  workshopOutData,
  isWorkshopOutLoading,
  now,
}) => {
  const [deleteWorkshopOutMutation, { isLoading: isLoadingDeleteWorkshopOutMutation }] =
    useDeleteWorkshopOutMutation()

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
                  <UpdateOutputWoodButton workshopOut={params.row} sx={{ mr: 1 }} />
                  <ButtonWithConfirm
                    isLoading={isLoadingDeleteWorkshopOutMutation}
                    header='Удалить лес на выход'
                    description='Вы точно хотите удалить выход леса?'
                    onConfirm={() => {
                      handleDeleteWorkshopOut(params.row.id)
                    }}
                  />
                </Box>
              )
            },
          },
        ]
      : []),
  ]

  const rows = useMemo(() => {
    return workshopOutData
      ? workshopOutData.map(({ id, woodClass, woodType, amount, dimension }) => {
          const dimensionString = `${dimension.width}x${dimension.thickness}x${dimension.length}`

          return {
            id: id,
            woodClass: woodClass.name,
            woodClassId: woodClass.id,
            dimension: dimensionString,
            dimensionId: dimension.id,
            woodType: woodType.name,
            woodTypeId: woodType.id,
            amount: amount,
          }
        })
      : []
  }, [workshopOutData])

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
      <DataGridContainer height={400}>
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
            slots={{ panel: CustomGridPanel }}
          />
        )}
      </DataGridContainer>
    </Box>
  )
}
