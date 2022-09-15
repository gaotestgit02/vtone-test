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
import { useAppDispatch } from '../state/reduxhooks'
import { sagaActions } from '../state/sagaActions'
import { ShoppingItem } from '../state/types'

interface DeletePromptDialogProps extends DialogProps {
  deleteId: ShoppingItem['id']
  cancelClickHandler: () => void
}

export const DeletePromptDialog = (props: DeletePromptDialogProps) => {
  const { deleteId, cancelClickHandler, ...rest } = props
  const dispatch = useAppDispatch()

  const baseProps: DialogProps = {
    maxWidth: 'xs',
    fullWidth: true,
    ...rest,
  }

  const confirmDeleteHandler = () => {
    dispatch({ type: sagaActions.DELETE_SHOPPING_ITEM, payload: deleteId })
    cancelClickHandler()
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
        <Button onClick={cancelClickHandler}>Cancel</Button>
        <Button variant="contained" onClick={confirmDeleteHandler}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}
