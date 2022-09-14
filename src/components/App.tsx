import styled from '@emotion/styled'
import { AppBar, Button, Typography } from '@mui/material'
import React from 'react'
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
        <ContainerNoItems>
          <ContainerNoItemsPrompt>
            <Typography sx={{ mb: 2 }}>
              Your shopping list is empty :(
            </Typography>
            <Button variant="contained">Add your first item</Button>
          </ContainerNoItemsPrompt>
        </ContainerNoItems>
      </ContainerMain>
    </WrapperTop>
  )
}
