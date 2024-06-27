import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'

import { Button, ButtonProps } from '@mui/material'

import { InsertWoodModal } from '@/features/dryer/insert-wood'
import { DryerBringInFormType, useBringInMutation } from '@/entities/dryer'
import { useFetchAllWoodClassesQuery } from '@/entities/wood-class'
import { useFetchAllWoodTypesQuery } from '@/entities/wood-type'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { CommonErrorType } from '@/shared/types'

import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'

export type InsertWoodButtonProps = ButtonProps & {
  dryerId: number
}

export const InsertWoodButton: FC<InsertWoodButtonProps> = props => {
  const { dryerId, ...buttonProps } = props
  const [isOpenInsert, setIsOpenInsert] = useState(false)

  const methods = useForm<DryerBringInFormType>({
    defaultValues: {
      woods: [
        {
          woodClassId: undefined,
          dimensionId: undefined,
          woodTypeId: undefined,
          amount: NaN,
        },
      ],
    },
  })
  const { reset, control } = methods

  const { fields, append, remove } = useFieldArray({ control, name: 'woods' })

  const { enqueueSnackbar } = useSnackbar()

  const [bringInMutation, { isLoading: isLoadingBringInMutation }] = useBringInMutation()
  const { data: woodClasses, isLoading: isWoodClassesLoading } = useFetchAllWoodClassesQuery(
    undefined,
    { skip: !isOpenInsert }
  )

  const { data: woodTypes, isLoading: isWoodTypesLoading } = useFetchAllWoodTypesQuery(undefined, {
    skip: !isOpenInsert,
  })

  useEffect(() => {
    if (!isOpenInsert) {
      reset()
    }
  }, [isOpenInsert, reset])

  const handleCloseInsert = () => setIsOpenInsert(false)

  const handleSubmitInsert: SubmitHandler<DryerBringInFormType> = ({ woods }) => {
    const woodsForRequest = woods.map(wood => {
      return {
        woodClassId: wood.woodClassId ?? 0,
        dimensionId: wood.dimensionId ?? 0,
        woodTypeId: wood.woodTypeId ?? 0,
        amount: wood.amount,
        date: dayjs().toISOString(),
      }
    })

    bringInMutation({
      dryerChamberId: dryerId,
      woods: woodsForRequest,
    })
      .unwrap()
      .then(() => {
        enqueueSnackbar('Доски успешно внесены', { variant: 'success' })
        handleCloseInsert()
      })
      .catch((error: CommonErrorType) => {
        defaultErrorHandler(error, message => enqueueSnackbar(message, { variant: 'error' }))
      })
  }

  const handleOpenInsert = () => setIsOpenInsert(true)

  return (
    <>
      <Button variant='outlined' onClick={handleOpenInsert} size='small' {...buttonProps} />

      <InsertWoodModal
        open={isOpenInsert}
        onClose={handleCloseInsert}
        onSubmitForm={handleSubmitInsert}
        methods={methods}
        woodClasses={woodClasses}
        isWoodClassesLoading={isWoodClassesLoading}
        woodTypes={woodTypes}
        isWoodTypesLoading={isWoodTypesLoading}
        isLoading={isLoadingBringInMutation}
        fields={fields}
        append={append}
        remove={remove}
      />
    </>
  )
}
