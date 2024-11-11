import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'

import { Button } from '@mui/material'

import {
  DryerDataItem,
  DryerRemoveFormType,
  RemoveWoodFromChamberType,
  useTakeOutMutation,
} from '@/entities/dryer'
import { useFetchAllWoodClassesQuery } from '@/entities/wood-class'
import { defaultErrorHandler } from '@/shared/libs/helpers'

import { RemoveWoodModal } from './RemoveWoodModal'
import { useSnackbar } from 'notistack'
import { useFetchAllWoodTypesQuery } from '@/entities/wood-type'
import { ConfirmCloseModal } from '@/shared/ui/modal'

export type RemoveWoodButtonProps = {
  dryerId: number
  dryerData: DryerDataItem[] | undefined
}

export const RemoveWoodButton: FC<RemoveWoodButtonProps> = ({ dryerId, dryerData }) => {
  const [isOpenRemove, setOpenRemove] = useState(false)
  const [isConfirmCloseModalOpen, setConfirmCloseModalOpen] = useState(false)

  const [takeOut, { isLoading: isLoadingTakeOut }] = useTakeOutMutation()

  const { data: woodClasses, isLoading: isWoodClassesLoading } = useFetchAllWoodClassesQuery(
    undefined,
    { skip: !isOpenRemove }
  )

  const { data: woodTypes, isLoading: isWoodTypesLoading } = useFetchAllWoodTypesQuery(undefined, {
    skip: !isOpenRemove,
  })

  const methods = useForm<DryerRemoveFormType>({
    defaultValues: {
      woods: [
        {
          woodClassId: undefined,
          dimensionId: undefined,
          woodTypeId: undefined,
          amount: NaN,
          dryerChamberDataRecordId: undefined,

          modifiedWoods: undefined,
        },
      ],
    },
  })

  const {
    reset,
    control,
    formState: { isDirty },
  } = methods

  const { fields } = useFieldArray({ control, name: 'woods' })

  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (!isOpenRemove) {
      reset()
    }
  }, [isOpenRemove, reset])

  const handleOpenConfirmModal = () => {
    setConfirmCloseModalOpen(true)
  }

  const handleCloseConfirmModal = () => {
    setConfirmCloseModalOpen(false)
  }

  const handleSubmitConfirmModal = () => {
    setConfirmCloseModalOpen(false)
    setOpenRemove(false)
  }

  const handleOpenRemove = () => {
    setOpenRemove(true)
  }

  const handleCloseRemove = ({ avoidConfirm = false }: { avoidConfirm?: boolean }) => {
    if (avoidConfirm) {
      setOpenRemove(false)

      return
    }

    if (isDirty) {
      handleOpenConfirmModal()

      return
    }

    setOpenRemove(false)
  }

  const handleTakeOut: SubmitHandler<DryerRemoveFormType> = ({ woods }) => {
    const woodsForRequest: RemoveWoodFromChamberType = []

    woods.forEach(wood => {
      const correspondingWoodData = dryerData?.find(
        dataItem => dataItem.id === wood.dryerChamberDataRecordId
      )

      if (!correspondingWoodData) {
        return null
      }

      woodsForRequest.push({
        woodClassId: correspondingWoodData.woodClass.id,
        amount: wood.amount ?? correspondingWoodData.amount,
        dimensionId: correspondingWoodData.dimension.id,
        woodTypeId: correspondingWoodData.woodType.id,
        date: correspondingWoodData.date,
        chamberIterationCount: correspondingWoodData.chamberIterationCountWhenBringingIn,
        dryerChamberDataRecordId: wood.dryerChamberDataRecordId ?? 0,
      })

      if (wood.modifiedWoods && wood.modifiedWoods.length > 0) {
        wood.modifiedWoods.forEach(modifiedWood => {
          if (!modifiedWood.woodClassId || !modifiedWood.amount) {
            return
          }

          woodsForRequest.push({
            woodClassId: modifiedWood.woodClassId,
            amount: modifiedWood.amount,
            dimensionId: correspondingWoodData.dimension.id,
            woodTypeId: correspondingWoodData.woodType.id,
            date: correspondingWoodData.date,
            chamberIterationCount: correspondingWoodData.chamberIterationCountWhenBringingIn,
          })
        })
      }
    })

    takeOut({ dryerChamberId: dryerId, changedWoods: woodsForRequest })
      .unwrap()
      .then(errors => {
        handleCloseRemove({ avoidConfirm: true })

        if (errors.length) {
          errors.forEach(error => {
            enqueueSnackbar(error, { variant: 'error' })
          })

          return
        }

        enqueueSnackbar('Доски успешно убраны', { variant: 'info' })
      })
      .catch(error => {
        defaultErrorHandler(error, message => enqueueSnackbar(message, { variant: 'error' }))
      })
  }

  return (
    <>
      <ConfirmCloseModal
        isConfirmCloseModalOpen={isConfirmCloseModalOpen}
        handleSubmitConfirmModal={handleSubmitConfirmModal}
        handleCloseConfirmModal={handleCloseConfirmModal}
        title='Закрытие формы'
        description='В форме есть несохраненные данные. Вы точно хотите закрыть?'
      />

      <Button
        variant='gray'
        size='small'
        onClick={handleOpenRemove}
        disabled={dryerData ? dryerData.length === 0 : true}
      >
        Выгрузить
      </Button>

      <RemoveWoodModal
        open={isOpenRemove}
        onClose={handleCloseRemove}
        onSubmitForm={handleTakeOut}
        methods={methods}
        woodClasses={woodClasses}
        woodTypes={woodTypes}
        isWoodTypesLoading={isWoodTypesLoading}
        isWoodClassesLoading={isWoodClassesLoading}
        isLoading={isLoadingTakeOut}
        fields={fields}
        dryerData={dryerData ?? []}
      />
    </>
  )
}
