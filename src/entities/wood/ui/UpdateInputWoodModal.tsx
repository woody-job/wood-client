import { FC, useEffect, useMemo } from 'react'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'

import { CircularProgress, MenuItem, Modal, ModalProps, TextField, Typography } from '@mui/material'

import { BeamInFormType, BeamSize } from '@/entities/beam-in/model'
import { WoodNaming } from '@/entities/wood-naming'
import { ModalContent, SelectPlaceholderWrapper } from '@/shared/ui'
import { ButtonWithLoader } from '@/shared/ui/button'

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
  ...modalProps
}) => {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = methods

  const watchDiameter = watch('diameter')
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

    return beamSizes
      ?.filter(beamSize => {
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
        name: beamSize.diameter,
      }))
  }, [beamSizes, watchWoodNamingId])

  useEffect(() => {
    if (selectedWoodNamingId) {
      setValue('woodNamingId', selectedWoodNamingId)
    }
  }, [selectedWoodNamingId])

  const woodNamingSelect = (
    <>
      {isLoadingWoodNamings ? (
        <CircularProgress size={15} />
      ) : (
        <SelectPlaceholderWrapper
          shouldShowPlaceholder={!watchWoodNamingId && !selectedWoodNamingId}
          placeholderText='Условное обозначение'
        >
          <TextField
            inputProps={{ ...register('woodNamingId', { required: isCreate }) }}
            select
            defaultValue={selectedWoodNamingId}
            sx={{ width: '100%' }}
            size='small'
            error={Boolean(errors.woodNamingId)}
          >
            {woodNamings?.map(woodNaming => {
              return <MenuItem value={woodNaming.id}>{woodNaming.name}</MenuItem>
            })}
          </TextField>
        </SelectPlaceholderWrapper>
      )}
      {errors.woodNamingId?.type === 'required' && (
        <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
          Условное обозначение обязательно
        </Typography>
      )}
    </>
  )

  const diameterSelect = (
    <>
      {isLoadingBeamSizes ? (
        <CircularProgress size={15} />
      ) : (
        <SelectPlaceholderWrapper
          shouldShowPlaceholder={!watchDiameter}
          placeholderText='Диаметр, см'
        >
          <TextField
            inputProps={{
              ...register('diameter', {
                required: isCreate,
              }),
            }}
            select
            defaultValue={watchDiameter}
            sx={{ width: '100%' }}
            size='small'
            error={Boolean(errors.diameter)}
          >
            {beamSizesOptions?.map(beamSizeOption => {
              return <MenuItem value={beamSizeOption.name}>{beamSizeOption.name}</MenuItem>
            })}
          </TextField>
        </SelectPlaceholderWrapper>
      )}
      {errors.diameter?.type === 'required' && (
        <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
          Диаметр обязателен
        </Typography>
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

        {isCreate && woodNamingSelect}
        {isCreate && diameterSelect}

        <TextField
          label='Количество'
          inputProps={{ ...register('amount', { required: true }) }}
          variant='outlined'
          error={Boolean(errors.amount)}
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
