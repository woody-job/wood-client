import { ReactNode, useState } from 'react'

import { SunburstSvgProps } from '@nivo/sunburst'

import { Box, BoxProps, Modal } from '@mui/material'

import { ModalContent } from '@/shared/ui'
import { ModalCloseButton } from '@/shared/ui/modal'
import { CustomSunburstFullscreen } from '@/shared/ui/sunburst/CustomSunburstFullscreen.tsx'
import { CustomSunburstItem } from '@/shared/ui/sunburst/CustomSunburstItem.tsx'

export type CustomSunburstProps<T> = Partial<SunburstSvgProps<T>> & {
  data: T
  containerProps?: BoxProps
  children?: ReactNode
}

export const CustomSunburst = <T,>({
  data,
  containerProps,
  children,
  ...restProps
}: CustomSunburstProps<T>) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => {
    setIsOpen(false)
  }
  const handleOpen = () => {
    setIsOpen(true)
  }

  return (
    <>
      <Box
        position='relative'
        width='450px'
        height='450px'
        display='flex'
        justifyContent='center'
        alignItems='center'
        sx={{
          '&:hover .sunburst-fullscreen': {
            pointerEvents: 'all',
            opacity: 1,
          },
          '& .sunburst-fullscreen': {
            pointerEvents: 'none',
            opacity: 0,
          },
        }}
        {...containerProps}
      >
        <CustomSunburstFullscreen onClick={handleOpen} />
        <Box>{children}</Box>

        <CustomSunburstItem data={data} {...restProps} />
      </Box>

      <Modal open={isOpen} onClose={handleClose}>
        <ModalContent fullscreen display='flex' justifyContent='center' alignItems='center'>
          <ModalCloseButton onClick={handleClose} />

          <Box
            position='relative'
            display='flex'
            justifyContent='center'
            alignItems='center'
            {...containerProps}
            width='100%'
            height='100%'
          >
            <Box>{children}</Box>

            <CustomSunburstItem data={data} {...restProps} />
          </Box>
        </ModalContent>
      </Modal>
    </>
  )
}
