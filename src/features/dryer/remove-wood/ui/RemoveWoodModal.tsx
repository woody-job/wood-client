import { FC, useEffect } from 'react'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'

import { Box, Modal, ModalProps, Typography } from '@mui/material'

import { DryerDataItem, DryerRemoveFormType } from '@/entities/dryer'
import { WoodClass } from '@/entities/wood-class'
import { ModalContent } from '@/shared/ui'
import { ButtonWithLoader } from '@/shared/ui/button'

import { RemoveWoodFormItem } from './RemoveWoodFormItem'

export type RemoveWoodModalProps = Omit<ModalProps, 'children'> & {
  onSubmitForm: SubmitHandler<DryerRemoveFormType>
  isWoodClassesLoading: boolean
  methods: UseFormReturn<DryerRemoveFormType>
  woodClasses: WoodClass[] | undefined
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
    ...modalProps
  } = props

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
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
            Убрать доски
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
                control={control}
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
            Убрать
          </ButtonWithLoader>
        </Box>
      </ModalContent>
    </Modal>
  )
}
