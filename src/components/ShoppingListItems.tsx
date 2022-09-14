import styled from '@emotion/styled'
import { Button, Checkbox, IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { DeleteOutlined, EditOutlined } from '@mui/icons-material'
import React from 'react'
import { ShoppingItem } from '../state/types'
import { useAppDispatch } from '../state/reduxhooks'
import { togglePurchaseState } from '../state/store'
import { lightBlue } from '@mui/material/colors'

interface ShoppingListItemsProps {
  items: ShoppingItem[]
  addItemHandler: () => void
  editClickHandler: (item: ShoppingItem) => void
  deleteItemClickHandler: (item: ShoppingItem) => void
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
  const dispatch = useAppDispatch()

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
        <Button variant="contained" onClick={props.addItemHandler}>
          Add Item
        </Button>
      </Box>
      <ItemsUl>
        {props.items.length > 0 &&
          props.items.map((item) => (
            <ItemLi key={item.id}>
              <ContainerItem done={item.purchased}>
                <Checkbox
                  sx={{ mr: 1 }}
                  checked={item.purchased}
                  onClick={() => {
                    dispatch(togglePurchaseState(item.id))
                  }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <Typography
                    fontWeight={500}
                    color={lightBlue[800]}
                    sx={{
                      textDecoration: item.purchased
                        ? 'line-through'
                        : 'initial',
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    fontWeight={400}
                    fontSize=".9em"
                    color="GrayText"
                    sx={{
                      textDecoration: item.purchased
                        ? 'line-through'
                        : 'initial',
                    }}
                  >
                    {item.description}
                  </Typography>
                </Box>
                <IconButton
                  onClick={() => {
                    props.editClickHandler(item)
                  }}
                >
                  <EditOutlined />
                </IconButton>
                <IconButton
                  onClick={() => {
                    props.deleteItemClickHandler(item)
                  }}
                >
                  <DeleteOutlined />
                </IconButton>
              </ContainerItem>
            </ItemLi>
          ))}
      </ItemsUl>
    </Wrapper>
  )
}
