import {
  Alert,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { useAppDispatch } from '../state/reduxhooks'
import { sagaActions } from '../state/sagaActions'
import { ShoppingItem } from '../state/types'

interface AddEditDialogProps extends DialogProps {
  shoppingItem?: ShoppingItem
  closeDialogHandler: () => void
}

const DEFAULT_SHOPPINGITEM: Partial<ShoppingItem> = {
  name: '',
  description: '',
  quantity: '',
  purchased: false,
}

export const AddEditDailog = (props: AddEditDialogProps) => {
  const {
    shoppingItem = DEFAULT_SHOPPINGITEM,
    closeDialogHandler,
    ...rest
  } = props

  const dispatch = useAppDispatch()

  const editMode = shoppingItem.id !== undefined
  const [hasError, setHasError] = useState(false)
  const [itemName, setItemName] = useState(shoppingItem.name ?? '')
  const [description, setDescription] = useState(shoppingItem.description ?? '')
  const [quantity, setQuantity] = useState(shoppingItem.quantity ?? '')
  const [purchased, setPurchased] = useState(shoppingItem.purchased ?? false)

  const saveHandler = () => {
    setHasError(false)
    const newShoppingItem = {
      id: shoppingItem?.id,
      name: itemName,
      description,
      quantity,
      purchased,
    }

    if (
      newShoppingItem.name === '' ||
      newShoppingItem.description === '' ||
      newShoppingItem.quantity === ''
    ) {
      setHasError(true)
      return
    }

    // dispatch(
    //   !shoppingItem.id
    //     ? addShoppingItem(newShoppingItem)
    //     : editShoppingItem(newShoppingItem)
    // )
    dispatch(
      !shoppingItem.id
        ? { type: sagaActions.ADD_SHOPPING_ITEM, payload: newShoppingItem }
        : {
            type: sagaActions.EDIT_SHOPPING_ITEM,
            payload: newShoppingItem,
          }
    )
    closeDialogHandler()
  }

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
        <Typography sx={{ fontSize: '1.1em' }}>
          {!editMode ? 'Add an Item' : 'Edit an Item'}
        </Typography>
        <Typography sx={{ color: '#5c6269' }}>
          {!editMode ? 'Add your new item below' : 'Edit your item below'}
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column' }}>
          <TextField
            id="item-name"
            label="Item Name"
            variant="outlined"
            value={itemName}
            onChange={(evt) => setItemName(evt.target.value)}
          />
          <TextField
            sx={{ mt: 2 }}
            id="description"
            label="Description"
            multiline
            rows={6}
            variant="outlined"
            value={description}
            onChange={(evt) => setDescription(evt.target.value)}
          />
          <TextField
            id="quantity"
            select
            label="How many?"
            sx={{ mt: 2 }}
            value={quantity}
            onChange={(evt) => {
              setQuantity(parseInt(evt.target.value))
            }}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </TextField>
          {editMode && (
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    // sx={{ justifyContent: 'flex-start', mt: 2 }}
                    checked={purchased}
                    onChange={(evt) => {
                      setPurchased(evt.target.checked)
                    }}
                  />
                }
                label="Purchased"
              />
            </FormGroup>
          )}
        </Box>
        {hasError && (
          <Alert sx={{ mt: 2 }} severity="error">
            Required fields are missing
          </Alert>
        )}
      </DialogContent>
      <DialogActions sx={{ pt: 10, pb: 2, px: 3 }}>
        <Button onClick={closeDialogHandler}>Cancel</Button>
        <Button variant="contained" onClick={saveHandler}>
          {!editMode ? 'Add Task' : 'Save Item'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
