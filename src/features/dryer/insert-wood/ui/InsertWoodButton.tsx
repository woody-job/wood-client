import { FC, FormEventHandler, useState } from 'react'

import { Button, ButtonProps, MenuItem, Modal, TextField, Typography } from '@mui/material'

import { ModalContent } from '@/shared/ui'
import { useForm } from 'react-hook-form'
import { useFetchAllWoodClassesQuery } from '@/entities/wood-class'
import { useFetchDimensionsByWoodClassQuery } from '@/entities/dimension'
import { skipToken } from '@reduxjs/toolkit/query'
import { useFetchWoodTypesQuery } from '@/entities/wood-type'

export type InsertWoodFormType = {
  woodClassId: number,
  dimensionId: number,
  woodTypeId: number,
  date: string,
  amount: number
}

export const InsertWoodButton: FC<ButtonProps> = props => {
  const [isOpenInsert, setIsOpenInsert] = useState(false)

  const handleCloseInsert = () => setIsOpenInsert(false)

  const methods = useForm<InsertWoodFormType>()
  const { handleSubmit, register, watch } = methods

  const watchWoodClassId = watch('woodClassId')
  const dimensionId = watch('dimensionId')

  console.log(dimensionId)

  const {
    data: woodClasses,
  } = useFetchAllWoodClassesQuery(undefined, {
    skip: !isOpenInsert,
  })
  const { data: dimensions } = useFetchDimensionsByWoodClassQuery(watchWoodClassId ?? skipToken, {
    skip: !isOpenInsert,
  })
  const { data: woodTypes } = useFetchWoodTypesQuery(undefined, {
    skip: !isOpenInsert,
  })

  const handleSubmitInsert: FormEventHandler = e => {
    e.preventDefault()
  }

  const handleOpenInsert = () => setIsOpenInsert(true)

  return (
    <>
      <Button variant="outlined" onClick={handleOpenInsert} {...props} />

      <Modal
        open={isOpenInsert}
        onClose={handleCloseInsert}
        aria-labelledby="create-user-modal-title"
      >
        <ModalContent
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          onSubmit={handleSubmitInsert}
        >
          <Typography
            id="create-user-modal-title"
            variant="h5"
            component="h2"
            sx={{ textAlign: 'center', mb: 5 }}
          >
            Внести доски
          </Typography>
          <TextField
            select
            placeholder="Сорт"
            sx={{ width: '100%' }}
            {...register('woodClassId', { required: true })}
            defaultValue={watchWoodClassId}
          >
            {/* TODO не отображается placeholder*/}
            {woodClasses?.map(woodClass => (
              <MenuItem value={woodClass.id}>{woodClass.name}</MenuItem>
            ))}
          </TextField>
          <TextField
            select
            placeholder="Сечение"
            sx={{ width: '100%' }}
            {...register('dimensionId', { required: true })}
          >
            {dimensions?.map(dimension => (
              <MenuItem value={dimension.id}>{dimension.name}</MenuItem>
            ))}
          </TextField>
          <TextField
            select
            placeholder="Порода"
            sx={{ width: '100%' }}
            {...register('woodTypeId', { required: true })}
          >
            {woodTypes?.map(woodType => (
              <MenuItem value={woodType.id}>{woodType.name}</MenuItem>
            ))}
          </TextField>
          <TextField type="number" label="Количество" variant="outlined" {...register('amount')} />
          <Button type="submit" sx={{ mt: 5 }} variant="contained" color="primary">
            Внести
          </Button>
        </ModalContent>
      </Modal>
    </>
  )
}
