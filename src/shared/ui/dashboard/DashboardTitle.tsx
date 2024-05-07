import { Typography, TypographyProps } from '@mui/material'
import { FC } from 'react'

export interface DashboardTitleProps extends TypographyProps {}

export const DashboardTitle: FC<DashboardTitleProps> = props => {
  return <Typography component={'h2'} fontWeight='bold' variant='subtitle1' mb={2} {...props} />
}
