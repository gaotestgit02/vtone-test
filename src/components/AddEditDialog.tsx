import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'
import React from 'react'
import { ShoppingItem } from '../state/types'

interface AddEditDialogProps extends DialogProps {
  shoppingItem?: ShoppingItem
}

const DEFAULT_SHOPPINGITEM: Partial<ShoppingItem> = {
  name: '',
  description: '',
  quantity: 0,
  purchased: false,
}

export const AddEditDailog = (props: AddEditDialogProps) => {
  const { shoppingItem = DEFAULT_SHOPPINGITEM, ...rest } = props
  const editMode = shoppingItem.id !== undefined

  const baseProps: DialogProps = {
    maxWidth: 'sm',
    fullWidth: true,
    ...rest,
  }

  return (
    <Dialog {...baseProps}>
      <DialogTitle
        sx={{
          fontWeight: 400,
          fontSize: '1.1em',
          textTransform: 'uppercase',
          borderBottom: '1px solid #d5dfe9',
          background: '#fafafa',
        }}
      >
        Shopping List
      </DialogTitle>
      <DialogContent sx={{ mt: 3 }}>
        <Typography sx={{ fontSize: '1.1em' }}>Add an Item</Typography>
        <Typography sx={{ color: '#5c6269' }}>
          Add your new item below
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column' }}>
          <TextField id="item-name" label="Item Name" variant="outlined" />
          <TextField
            sx={{ mt: 2 }}
            id="description"
            label="Description"
            multiline
            rows={6}
            variant="outlined"
          />
          <TextField select label="How many?" sx={{ mt: 2 }}>
            <MenuItem>1</MenuItem>
            <MenuItem>2</MenuItem>
            <MenuItem>3</MenuItem>
            <MenuItem>4</MenuItem>
            <MenuItem>5</MenuItem>
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions sx={{ pt: 10, pb: 2, px: 3 }}>
        <Button>Cancel</Button>
        <Button variant="contained">Add Task</Button>
      </DialogActions>
    </Dialog>
  )
}
