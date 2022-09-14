import styled from '@emotion/styled'
import { Button, Checkbox, IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { DeleteOutlined, EditOutlined } from '@mui/icons-material'
import React, { useState } from 'react'
import { ShoppingItem } from '../state/types'

interface ShoppingListItemsProps {
  items: ShoppingItem[]
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2em;
`

const ItemsUl = styled.ul`
  padding: 0;
  margin: 0;
`
const ItemLi = styled.li`
  list-style-type: none;
`
const ContainerItem = styled.div<{ done?: boolean }>`
  display: flex;
  border: 1px solid #d5dfe9;
  border-radius: 4px;
  padding: 1em;
  margin-top: 1em;
  background-color: ${(props) =>
    props.done ? 'rgba(213, 223, 233, 0.17)' : ''};
`

export const ShoppingListItems = (props: ShoppingListItemsProps) => {
  const [activeShoppingItem, setActiveShoppingItem] = useState<ShoppingItem>()

  return (
    <Wrapper>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <Typography sx={{ fontWeight: 500 }}>Your Items</Typography>
        <Button variant="contained" sx={{ textTransform: 'capitalize' }}>
          Add Item
        </Button>
      </Box>
      <ItemsUl>
        <ItemLi>
          <ContainerItem>
            <Checkbox sx={{ mr: 1 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <Typography fontWeight={500}>Tomatoes</Typography>
              <Typography fontWeight={400} fontSize=".9em">
                Green cherry tomatoes
              </Typography>
            </Box>
            <IconButton>
              <EditOutlined />
            </IconButton>
            <IconButton>
              <DeleteOutlined />
            </IconButton>
          </ContainerItem>
        </ItemLi>
      </ItemsUl>
    </Wrapper>
  )
}
