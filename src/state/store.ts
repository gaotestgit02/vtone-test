import { createSlice, configureStore } from '@reduxjs/toolkit'
import { ShoppingItem } from './types'

interface ShoppingItemsState {
  items: ShoppingItem[]
}

const initialShoppingItemsSliceState: ShoppingItemsState = {
  items: [],
}

const shoppingItemsSlice = createSlice({
  name: 'shopping-items',
  initialState: initialShoppingItemsSliceState,
  reducers: {
    fetchItems: (state, action) => {
      return {
        items: action.payload,
      }
    },
  },
})

export const store = configureStore({
  reducer: {
    items: shoppingItemsSlice.reducer,
  },
})

export const { fetchItems } = shoppingItemsSlice.actions
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
