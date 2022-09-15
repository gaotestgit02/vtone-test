import styled from '@emotion/styled'
import { AppBar, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../state/reduxhooks'
import { sagaActions } from '../state/sagaActions'
import { ShoppingItem } from '../state/types'
import { AddEditDailog } from './AddEditDialog'
import './App.scss'
import { DeletePromptDialog } from './DeletePromptDialog'
import { Loading } from './Loading'
import { ShoppingListItems } from './ShoppingListItems'

const WrapperTop = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;
`

const ContainerNoItems = styled.div`
  height: 100%;
  display: grid;
  place-items: center;
`

const ContainerNoItemsPrompt = styled.div`
  width: 614px;
  height: 220px;
  border: 1px solid #c6c6c6;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ContainerMain = styled.main`
  width: 1025px;
  margin: 0 auto;
`

export default function App() {
  const [activeShoppingItem, setActiveShoppingItem] = useState<ShoppingItem>()
  const [showAddEditDialog, setShowAddEditDialog] = useState(false)
  const [showDeletePromptDialog, setShowDeletePromptDialog] = useState(false)
  const shoppingItems = useAppSelector((state) => state.shopping.items)
  const loading = useAppSelector((state) => state.appState.loading)
  const dispatch = useAppDispatch()

  const addItemPromptShowHandler = () => {
    setActiveShoppingItem(undefined)
    setShowAddEditDialog(true)
  }

  const editClickHandler = (item: ShoppingItem) => {
    setActiveShoppingItem(item)
    setShowAddEditDialog(true)
  }

  const deleteItemClickHandler = (item: ShoppingItem) => {
    setActiveShoppingItem(item)
    setShowDeletePromptDialog(true)
  }

  useEffect(() => {
    dispatch({ type: sagaActions.FETCH_SHOPPING_ITEMS })
  }, [dispatch])

  return (
    <WrapperTop>
      <AppBar position="static" sx={{ px: 3, py: 2 }}>
        <Typography
          variant="h1"
          sx={{
            fontWeight: 300,
            fontSize: '1.2em',
          }}
        >
          SHOPPING LIST
        </Typography>
      </AppBar>
      <ContainerMain>
        {shoppingItems.length === 0 && loading === 'IDLE' && (
          <ContainerNoItems>
            <ContainerNoItemsPrompt>
              <Typography sx={{ mb: 2 }}>
                Your shopping list is empty :(
              </Typography>
              <Button variant="contained" onClick={addItemPromptShowHandler}>
                Add your first item
              </Button>
            </ContainerNoItemsPrompt>
          </ContainerNoItems>
        )}
        {shoppingItems.length > 0 && (
          <ShoppingListItems
            items={shoppingItems}
            addItemHandler={addItemPromptShowHandler}
            editClickHandler={editClickHandler}
            deleteItemClickHandler={deleteItemClickHandler}
          />
        )}
      </ContainerMain>
      {showAddEditDialog && (
        <AddEditDailog
          shoppingItem={activeShoppingItem}
          open={showAddEditDialog}
          closeDialogHandler={() => setShowAddEditDialog(false)}
        />
      )}
      {activeShoppingItem && (
        <DeletePromptDialog
          open={showDeletePromptDialog}
          deleteId={activeShoppingItem!.id}
          cancelClickHandler={() => setShowDeletePromptDialog(false)}
        />
      )}
      {loading === 'ACTIVE' && <Loading />}
    </WrapperTop>
  )
}
