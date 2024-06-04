import { useState } from 'react'

import { ResponsiveBar, ResponsiveBarSvgProps } from '@nivo/bar'
import { BarDatum } from '@nivo/bar/dist/types/types'

import { Box, IconButton, Modal } from '@mui/material'

import { chartColors } from '@/shared/constants'
import { useNivoTheme } from '@/shared/libs/hooks'
import { FullscreenIcon, ModalContent } from '@/shared/ui'
import { ModalCloseButton } from '@/shared/ui/modal'

export type CustomBarProps<RawDatum extends BarDatum> = Omit<
  ResponsiveBarSvgProps<RawDatum>,
  'data'
> & {
  data: readonly RawDatum[]
}

export const CustomBar = <T extends BarDatum>(props: CustomBarProps<T>) => {
  const nivoTheme = useNivoTheme()

  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  return (
    <Box
      width='100%'
      height='100%'
      display='flex'
      justifyContent='center'
      alignItems='center'
      position='relative'
      sx={{
        '&:hover .bar-fullscreen': {
          pointerEvents: 'all',
          opacity: '1',
        },
        '& .bar-fullscreen': {
          pointerEvents: 'none',
          opacity: '0',
        },
      }}
    >
      <ResponsiveBar
        margin={{ top: 10, right: 10, bottom: 50, left: 50 }}
        padding={0.3}
        colors={chartColors}
        axisTop={null}
        axisRight={null}
        theme={nivoTheme}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: 'color',
          modifiers: [['darker', 1.6]],
        }}
        role='application'
        {...props}
      />

      <IconButton
        sx={{ position: 'absolute', top: -10, right: -10, transition: 'all 300ms' }}
        className='bar-fullscreen'
        onClick={handleOpen}
      >
        <FullscreenIcon />
      </IconButton>

      <Modal open={isOpen} onClose={handleClose}>
        <ModalContent fullscreen>
          <ModalCloseButton onClick={handleClose} />

          <Box
            width='100%'
            height='100%'
            display='flex'
            justifyContent='center'
            alignItems='center'
          >
            <ResponsiveBar
              margin={{ top: 10, right: 10, bottom: 50, left: 50 }}
              padding={0.3}
              colors={chartColors}
              axisTop={null}
              axisRight={null}
              theme={nivoTheme}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{
                from: 'color',
                modifiers: [['darker', 1.6]],
              }}
              role='application'
              {...props}
            />
          </Box>
        </ModalContent>
      </Modal>
    </Box>
  )
}
