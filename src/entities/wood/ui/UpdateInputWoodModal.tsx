import { FC, useEffect, useMemo } from 'react'
import { Control, SubmitHandler, UseFormReturn } from 'react-hook-form'

import { CircularProgress, Modal, ModalProps, TextField, Typography } from '@mui/material'

import { BeamInFormType, BeamSize } from '@/entities/beam-in/model'
import { WoodNaming } from '@/entities/wood-naming'
import { ModalContent } from '@/shared/ui'
import { ButtonWithLoader } from '@/shared/ui/button'
import { FormAutocomplete } from '@/shared/ui/FormAutocomplete'

export interface UpdateInputWoodModalProps extends Omit<ModalProps, 'children'> {
  title: string
  action: string
  onUpdate: SubmitHandler<BeamInFormType>
  methods: UseFormReturn<BeamInFormType>
  beamSizes: BeamSize[] | undefined
  isLoadingBeamSizes: boolean
  isLoading: boolean
  selectedWoodNamingId: number | null
  woodNamings: WoodNaming[] | undefined
  isLoadingWoodNamings: boolean
  control: Control<BeamInFormType, any>
}

export const UpdateInputWoodModal: FC<UpdateInputWoodModalProps> = ({
  title,
  action,
  onUpdate,
  methods,
  isLoadingBeamSizes,
  isLoading,
  selectedWoodNamingId,
  woodNamings,
  beamSizes,
  isLoadingWoodNamings,
  control,
  ...modalProps
}) => {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = methods

  const watchWoodNamingId = watch('woodNamingId')

  // TODO: переделать!
  const isCreate = action !== 'Изменить'

  const beamSizesOptions = useMemo(() => {
    if (!woodNamings || !watchWoodNamingId) {
      return []
    }

    const currentWoodNaming = woodNamings.find(woodNaming => woodNaming.id === watchWoodNamingId)

    if (!currentWoodNaming) {
      return []
    }

    if (!beamSizes) {
      return []
    }

    return beamSizes
      .filter(beamSize => {
        // Если крупный лес
        if (currentWoodNaming.maxDiameter === null) {
          const isBeamSizeInWoodNamingBoundaries =
            currentWoodNaming.minDiameter! <= beamSize.diameter

          return isBeamSizeInWoodNamingBoundaries
        }

        // Если пиловочник (такого в принципе быть не должно)
        if (currentWoodNaming.minDiameter === null) {
          const isBeamSizeInWoodNamingBoundaries =
            currentWoodNaming.maxDiameter! >= beamSize.diameter

          return isBeamSizeInWoodNamingBoundaries
        }

        const isBeamSizeInWoodNamingBoundaries =
          currentWoodNaming.maxDiameter! >= beamSize.diameter &&
          currentWoodNaming.minDiameter! <= beamSize.diameter

        return isBeamSizeInWoodNamingBoundaries
      })
      .map(beamSize => ({
        id: beamSize.id,
        label: `${beamSize.diameter}`,
      }))
  }, [beamSizes, watchWoodNamingId])

  const woodNamingsOptions = useMemo(() => {
    if (!woodNamings) {
      return []
    }

    return woodNamings.map(woodNaming => ({ id: woodNaming.id, label: woodNaming.name }))
  }, [woodNamings])

  useEffect(() => {
    if (selectedWoodNamingId) {
      setValue('woodNamingId', selectedWoodNamingId)
    }
  }, [selectedWoodNamingId])

  const woodNamingAutocomplete = (
    <>
      {isLoadingWoodNamings ? (
        <CircularProgress size={15} />
      ) : (
        <FormAutocomplete
          name={'woodNamingId'}
          control={control}
          options={woodNamingsOptions}
          placeholder={'Условное обозначение'}
          rules={{
            required: 'Условное обозначение обязательно',
          }}
        />
      )}
    </>
  )

  const diameterAutocomplete = (
    <>
      {isLoadingBeamSizes ? (
        <CircularProgress size={15} />
      ) : (
        <FormAutocomplete
          name={'beamSizeId'}
          control={control}
          options={beamSizesOptions}
          placeholder={'Диаметр, см'}
          rules={{
            required: 'Диаметр обязателен',
          }}
        />
      )}
    </>
  )

  return (
    <Modal {...modalProps}>
      <ModalContent
        component='form'
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        onSubmit={handleSubmit(onUpdate)}
      >
        <Typography variant='h5' component='h2' sx={{ textAlign: 'center', mb: 5 }}>
          {title}
        </Typography>

        {isCreate && woodNamingAutocomplete}
        {isCreate && diameterAutocomplete}

        <TextField
          label='Количество'
          inputProps={{ ...register('amount', { required: true }) }}
          variant='outlined'
        />
        {errors.amount?.type === 'required' && (
          <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
            Количество обязательно
          </Typography>
        )}

        <ButtonWithLoader
          isLoading={isLoading}
          type='submit'
          sx={{ mt: 5 }}
          variant='contained'
          color='primary'
        >
          {action}
        </ButtonWithLoader>
      </ModalContent>
    </Modal>
  )
}
