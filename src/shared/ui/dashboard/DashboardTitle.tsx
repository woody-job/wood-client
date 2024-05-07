import { FC } from 'react'

import { Typography, TypographyProps } from '@mui/material'

export interface DashboardTitleProps extends TypographyProps {}

export const DashboardTitle: FC<DashboardTitleProps> = props => {
  return <Typography component={'h2'} fontWeight='bold' variant='subtitle1' mb={2} {...props} />
}
