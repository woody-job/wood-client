import { FC } from 'react'
import {
  Control,
  Controller,
  FieldErrors,
  UseFieldArrayRemove,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form'

import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'

import { BeamSize } from '@/entities/beam-in/model'
import { BeamShipmentFormType } from '@/entities/beam-shipment'

type AddBeamShipmentFormItemProps = {
  field: Record<'id', string>
  fieldIndex: number
  watch: UseFormWatch<BeamShipmentFormType>
  register: UseFormRegister<BeamShipmentFormType>
  control: Control<BeamShipmentFormType>
  errors: FieldErrors<BeamShipmentFormType>
  remove: UseFieldArrayRemove
  isBeamSizesLoading: boolean
  beamSizes: BeamSize[] | undefined
}

export const AddBeamShipmentFormItem: FC<AddBeamShipmentFormItemProps> = ({
  field,
  fieldIndex,
  watch,
  register,
  control,
  remove,
  errors,
  isBeamSizesLoading,
  beamSizes,
}) => {
  const watchLength = watch('length')
  const watchWoodTypeId = watch('woodTypeId')

  const isFormItemDisabled = !watchLength || !watchWoodTypeId

  const watchVolume = watch(`beamShipmentItems.${fieldIndex}.volume` as const)
  const watchAmount = watch(`beamShipmentItems.${fieldIndex}.amount` as const)
  const watchBeamSizeId = watch(`beamShipmentItems.${fieldIndex}.beamSizeId` as const)

  // Ошибка при отсутствии заполненных полей
  const isValidateError =
    errors?.beamShipmentItems?.[fieldIndex]?.volume?.type === 'validate' ||
    errors?.beamShipmentItems?.[fieldIndex]?.amount?.type === 'validate' ||
    errors?.beamShipmentItems?.[fieldIndex]?.beamSizeId?.type === 'validate'

  // Ошибка при заполнении для пиловочника
  const isSawingError =
    !errors?.beamShipmentItems?.[fieldIndex]?.volume &&
    (errors?.beamShipmentItems?.[fieldIndex]?.amount?.type === 'validate' ||
      errors?.beamShipmentItems?.[fieldIndex]?.beamSizeId?.type === 'validate')

  const formElements = (
    <Box>
      {/* Поле "объем" есть смысл отображать только у первого элемента fields array */}
      {fieldIndex === 0 && (
        <TextField
          label='Объем, м3'
          variant='outlined'
          type='number'
          inputProps={{
            step: 'any',
            ...register(`beamShipmentItems.${fieldIndex}.volume` as const, {
              validate: value => {
                if (watchAmount && watchBeamSizeId) {
                  return true
                }

                if (!value && !watchAmount && !watchBeamSizeId) {
                  return 'Введите либо объем (для баланса), либо диаметр с количеством (для пиловочника)'
                }

                return true
              },
            }),
          }}
          disabled={Boolean(isFormItemDisabled || watchAmount || watchBeamSizeId)}
        />
      )}

      <TextField
        label='Количество'
        variant='outlined'
        type='number'
        disabled={Boolean(isFormItemDisabled || watchVolume)}
        inputProps={{
          // Для предотвращения изменения значения поля при скролле
          onWheel: e => e.currentTarget.blur(),

          ...register(`beamShipmentItems.${fieldIndex}.amount` as const, {
            validate: value => {
              if (watchVolume) {
                return true
              }

              if (!value || !watchBeamSizeId) {
                return 'Для пиловочника введите количество И диаметр'
              }

              return true
            },
          }),
        }}
      />

      {isBeamSizesLoading ? (
        <CircularProgress size={20} />
      ) : (
        <Controller
          name={`beamShipmentItems.${fieldIndex}.beamSizeId`}
          control={control}
          rules={{
            validate: value => {
              if (watchVolume) {
                return true
              }

              if (!value || !watchAmount) {
                return 'Для пиловочника введите количество И диаметр'
              }

              return true
            },
          }}
          render={({ field: { value, onChange } }) => {
            return (
              <TextField
                select
                label={!watchLength ? 'Выберите длину' : 'Диаметр'}
                disabled={Boolean(isFormItemDisabled || watchVolume)}
                value={value}
                onChange={onChange}
              >
                {beamSizes?.map(beamSize => (
                  <MenuItem key={beamSize.id} value={beamSize.id}>
                    {beamSize.diameter} см
                  </MenuItem>
                ))}
              </TextField>
            )
          }}
        />
      )}
      {isValidateError && (
        <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
          {errors?.beamShipmentItems?.[fieldIndex]?.volume?.message}
        </Typography>
      )}
      {isSawingError && (
        <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
          {errors?.beamShipmentItems?.[fieldIndex]?.amount?.message}
        </Typography>
      )}
    </Box>
  )

  return (
    <>
      <Grid container flexDirection='row' spacing={2} key={field.id}>
        <Grid item flex={'0 0 70%'}>
          {formElements}
        </Grid>
        <Grid item flexGrow={1}>
          <Box
            sx={{
              height: '100%',
              width: '100%',
              display: 'grid',
              alignItems: 'center',
            }}
          >
            <Button variant='outlined' onClick={() => remove(fieldIndex)}>
              Удалить
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 5, mb: 3, width: '100%' }} />
    </>
  )
}
