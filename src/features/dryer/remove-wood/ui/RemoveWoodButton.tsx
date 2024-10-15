import { FC, useEffect, useState } from 'react'

import { Button } from '@mui/material'

import { DryerDataItem, DryerRemoveFormType, useTakeOutMutation } from '@/entities/dryer'
import { defaultErrorHandler } from '@/shared/libs/helpers'

import { useSnackbar } from 'notistack'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { useFetchAllWoodClassesQuery } from '@/entities/wood-class'
import { RemoveWoodModal } from './RemoveWoodModal'

export type RemoveWoodButtonProps = {
  dryerId: number
  dryerData: DryerDataItem[] | undefined
}

export const RemoveWoodButton: FC<RemoveWoodButtonProps> = ({ dryerId, dryerData }) => {
  const [isOpenRemove, setOpenRemove] = useState(false)

  const [takeOut, { isLoading: isLoadingTakeOut }] = useTakeOutMutation()

  const { data: woodClasses, isLoading: isWoodClassesLoading } = useFetchAllWoodClassesQuery(
    undefined,
    { skip: !isOpenRemove }
  )

  const methods = useForm<DryerRemoveFormType>({
    defaultValues: {
      woods: [
        {
          woodClassId: undefined,
          amount: NaN,
          dryerChamberDataRecordId: undefined,
        },
      ],
    },
  })

  const { reset, control } = methods

  const { fields } = useFieldArray({ control, name: 'woods' })

  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (!isOpenRemove) {
      reset()
    }
  }, [isOpenRemove, reset])

  const handleOpenRemove = () => {
    setOpenRemove(true)
  }

  const handleCloseRemove = () => {
    setOpenRemove(false)
  }

  const handleTakeOut: SubmitHandler<DryerRemoveFormType> = ({ woods }) => {
    const woodsForRequest = woods.map(wood => {
      return {
        woodClassId: wood.woodClassId ?? 0,
        amount: wood.amount ?? 0,
        dryerChamberDataRecordId: wood.dryerChamberDataRecordId ?? 0,
      }
    })

    takeOut({ dryerChamberId: dryerId, changedWoods: woodsForRequest })
      .unwrap()
      .then(errors => {
        handleCloseRemove()

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
      <Button
        variant='gray'
        size='small'
        onClick={handleOpenRemove}
        disabled={dryerData ? dryerData.length === 0 : true}
      >
        Убрать
      </Button>

      <RemoveWoodModal
        open={isOpenRemove}
        onClose={handleCloseRemove}
        onSubmitForm={handleTakeOut}
        methods={methods}
        woodClasses={woodClasses}
        isWoodClassesLoading={isWoodClassesLoading}
        isLoading={isLoadingTakeOut}
        fields={fields}
        dryerData={dryerData ?? []}
      />
    </>
  )
}
