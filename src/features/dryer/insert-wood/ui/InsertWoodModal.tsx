import { FC } from 'react'
import {
  SubmitHandler,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormReturn,
} from 'react-hook-form'

import { Box, Button, Divider, Modal, ModalProps, TextField, Typography } from '@mui/material'

import { DryerBringInFormType } from '@/entities/dryer'
import { WoodClass } from '@/entities/wood-class'
import { WoodType } from '@/entities/wood-type'
import { ModalContent } from '@/shared/ui'
import { ButtonWithLoader } from '@/shared/ui/button'

import { InsertWoodFormItem } from './InsertWoodFormItem'

export type InsertWoodModalProps = Omit<ModalProps, 'children'> & {
  onSubmitForm: SubmitHandler<DryerBringInFormType>
  isWoodClassesLoading: boolean
  isWoodTypesLoading: boolean
  methods: UseFormReturn<DryerBringInFormType>
  woodClasses: WoodClass[] | undefined
  woodTypes: WoodType[] | undefined
  isLoading: boolean
  fields: Record<'id', string>[]
  append: UseFieldArrayAppend<DryerBringInFormType, 'woods'>
  remove: UseFieldArrayRemove
}

export const InsertWoodModal: FC<InsertWoodModalProps> = props => {
  const {
    onSubmitForm,
    methods,
    woodClasses,
    isWoodClassesLoading,
    woodTypes,
    isWoodTypesLoading,
    isLoading,
    fields,
    append,
    remove,
    ...modalProps
  } = props

  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
    control,
  } = methods

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
            Внести доски
          </Typography>

          <TextField
            label='Цикл сушки'
            variant='outlined'
            type='number'
            inputProps={{
              ...register('chamberIterationCount', {
                required: true,
                valueAsNumber: true,
              }),
            }}
          />
          {errors?.chamberIterationCount?.type === 'required' && (
            <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
              Цикл сушки обязателен
            </Typography>
          )}

          <Divider sx={{ my: 5 }} />

          {fields.map((field, fieldIndex) => {
            return (
              <InsertWoodFormItem
                field={field}
                fieldIndex={fieldIndex}
                watch={watch}
                register={register}
                errors={errors}
                isWoodClassesLoading={isWoodClassesLoading}
                isWoodTypesLoading={isWoodTypesLoading}
                woodClasses={woodClasses}
                woodTypes={woodTypes}
                control={control}
                remove={remove}
              />
            )
          })}

          <Button
            onClick={() =>
              append({
                woodClassId: undefined,
                dimensionId: undefined,
                woodTypeId: undefined,
                amount: NaN,
              })
            }
            variant='outlined'
          >
            Добавить
          </Button>

          <ButtonWithLoader
            isLoading={isLoading}
            type='submit'
            sx={{ mt: 2 }}
            loaderSx={{ top: -14 }}
            variant='contained'
            color='primary'
          >
            Внести
          </ButtonWithLoader>
        </Box>
      </ModalContent>
    </Modal>
  )
}
