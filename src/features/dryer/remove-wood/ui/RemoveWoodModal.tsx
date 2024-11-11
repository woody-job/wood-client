import { FC, useEffect } from 'react'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'

import { Box, Modal, ModalProps, Typography } from '@mui/material'

import { DryerDataItem, DryerRemoveFormType } from '@/entities/dryer'
import { WoodClass } from '@/entities/wood-class'
import { ModalContent } from '@/shared/ui'
import { ButtonWithLoader } from '@/shared/ui/button'

import { RemoveWoodFormItem } from './RemoveWoodFormItem'
import { WoodType } from '@/entities/wood-type'

export type RemoveWoodModalProps = Omit<ModalProps, 'children'> & {
  onSubmitForm: SubmitHandler<DryerRemoveFormType>
  isWoodClassesLoading: boolean
  methods: UseFormReturn<DryerRemoveFormType>
  woodClasses: WoodClass[] | undefined
  woodTypes: WoodType[] | undefined
  isWoodTypesLoading: boolean
  isLoading: boolean
  fields: Record<'id', string>[]
  dryerData: DryerDataItem[]
}

export const RemoveWoodModal: FC<RemoveWoodModalProps> = props => {
  const {
    onSubmitForm,
    methods,
    woodClasses,
    isWoodClassesLoading,
    isLoading,
    fields,
    dryerData,
    woodTypes,
    isWoodTypesLoading,
    ...modalProps
  } = props

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    watch,
    reset,
  } = methods

  useEffect(() => {
    if (!dryerData) {
      return
    }

    reset({
      woods: dryerData.map(item => {
        return {
          dryerChamberDataRecordId: item.id,
          woodClassId: item.woodClass.id,
          woodTypeId: item.woodType.id,
          dimensionId: item.dimension.id,
          amount: item.amount,
        }
      }),
    })
  }, [dryerData])

  return (
    <Modal {...modalProps} aria-labelledby='create-user-modal-title'>
      <ModalContent
        component='form'
        sx={{
          display: 'flex',
          width: 510,
          maxHeight: '90vh',
          flexDirection: 'column',
          '.MuiFormControl-root, .MuiCircularProgress-root': {
            mt: 2,
          },
          alignItems: 'center',
        }}
        onSubmit={handleSubmit(onSubmitForm)}
      >
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            width: 505,
            overflowY: 'scroll',
            pr: 0.5,
            px: 3,
            pb: 1,
          }}
        >
          <Typography
            id='create-user-modal-title'
            variant='h5'
            component='h2'
            sx={{ textAlign: 'center', mb: 2 }}
          >
            Выгрузить доски
          </Typography>

          {fields.map((field, fieldIndex) => {
            return (
              <RemoveWoodFormItem
                field={field}
                fieldIndex={fieldIndex}
                register={register}
                errors={errors}
                isWoodClassesLoading={isWoodClassesLoading}
                woodClasses={woodClasses}
                woodTypes={woodTypes}
                isWoodTypesLoading={isWoodTypesLoading}
                control={control}
                watch={watch}
              />
            )
          })}

          <ButtonWithLoader
            isLoading={isLoading}
            type='submit'
            sx={{ mt: 2 }}
            loaderSx={{ top: -14 }}
            variant='contained'
            color='primary'
          >
            Выгрузить
          </ButtonWithLoader>
        </Box>
      </ModalContent>
    </Modal>
  )
}
