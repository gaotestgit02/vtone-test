import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Typography,
} from '@mui/material'
import React from 'react'
import { ShoppingItem } from '../state/types'

interface DeletePromptDialogProps extends DialogProps {
  deleteId: ShoppingItem['id']
}

export const DeletePromptDialog = (props: DeletePromptDialogProps) => {
  const { deleteId, ...rest } = props
  const baseProps: DialogProps = {
    maxWidth: 'xs',
    fullWidth: true,
    ...rest,
  }

  return (
    <Dialog {...baseProps}>
      <DialogTitle
        sx={{
          fontWeight: 400,
          fontSize: '1.1em',
        }}
      >
        Delete Item?
      </DialogTitle>
      <DialogContent>
        <Typography color="GrayText">
          Are you sure you want to delete this item? This can not be undone.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ pt: 5, pb: 2, px: 3 }}>
        <Button>Cancel</Button>
        <Button variant="contained">Delete</Button>
      </DialogActions>
    </Dialog>
  )
}
