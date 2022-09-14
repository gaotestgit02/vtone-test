import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'

export const Loading = () => {
  return (
    <Backdrop
      open
      sx={{
        background: 'rgba(0,0,0,.1)',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <CircularProgress />
    </Backdrop>
  )
}
