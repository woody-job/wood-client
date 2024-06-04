import { FC, useState } from 'react'

import { LineProps, ResponsiveLine } from '@nivo/line'

import { Box, IconButton, Modal, Typography } from '@mui/material'

import { chartColors } from '@/shared/constants'
import { useNivoTheme } from '@/shared/libs/hooks'
import { ColorItem, CustomTooltip, FullscreenIcon, ModalContent } from '@/shared/ui'
import { ModalCloseButton } from '@/shared/ui/modal'

export type CustomLineProps = LineProps

export const CustomLine: FC<CustomLineProps> = props => {
  const nivoTheme = useNivoTheme()

  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => setIsOpen(false)
  const handleOpen = () => setIsOpen(true)

  return (
    <>
      <Box
        width='100%'
        height='100%'
        display='flex'
        alignItems='center'
        justifyContent='center'
        position='relative'
        sx={{
          '&:hover .line-fullscreen': {
            pointerEvents: 'all',
            opacity: '1',
          },
          '& .line-fullscreen': {
            pointerEvents: 'none',
            opacity: '0',
          },
        }}
      >
        <ResponsiveLine
          theme={nivoTheme}
          colors={chartColors}
          margin={{ top: 10, right: 20, bottom: 50, left: 60 }}
          axisTop={null}
          axisRight={null}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointLabelYOffset={-12}
          enableTouchCrosshair={true}
          useMesh={true}
          enablePoints={false}
          tooltip={({ point: { serieColor, data } }) => (
            <CustomTooltip>
              <ColorItem bgcolor={serieColor} />

              <Typography>x: {data.xFormatted}</Typography>
              <Typography>y: {data.yFormatted}</Typography>
            </CustomTooltip>
          )}
          {...props}
        />

        <IconButton
          onClick={handleOpen}
          sx={{ position: 'absolute', top: -20, right: -20, transition: 'all 300ms' }}
          className='line-fullscreen'
        >
          <FullscreenIcon />
        </IconButton>
      </Box>

      <Modal open={isOpen} onClose={handleClose}>
        <ModalContent fullscreen>
          <ModalCloseButton onClick={handleClose} />

          <ResponsiveLine
            theme={nivoTheme}
            colors={chartColors}
            margin={{ top: 10, right: 20, bottom: 50, left: 60 }}
            axisTop={null}
            axisRight={null}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointLabelYOffset={-12}
            enableTouchCrosshair={true}
            useMesh={true}
            enablePoints={false}
            tooltip={({ point: { serieColor, data } }) => (
              <CustomTooltip>
                <ColorItem bgcolor={serieColor} />

                <Typography>x: {data.xFormatted}</Typography>
                <Typography>y: {data.yFormatted}</Typography>
              </CustomTooltip>
            )}
            {...props}
          />
        </ModalContent>
      </Modal>
    </>
  )
}
