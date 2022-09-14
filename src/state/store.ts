import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit'
import { ShoppingItem } from './types'

interface ShoppingState {
  items: ShoppingItem[]
}
const testItem = {
  id: 2,
  description: 'Get Tomatoes',
  name: 'Tomatoes',
  purchased: false,
  quantity: 2,
}
const initialShoppingSliceState: ShoppingState = {
  items: [testItem],
}

const shoppingSlice = createSlice({
  name: 'shopping',
  initialState: initialShoppingSliceState,
  reducers: {
    fetchItems: (state, action) => {
      return {
        items: action.payload,
      }
    },
    addShoppingItem: (state, action: PayloadAction<ShoppingItem>) => {
      state.items.push(action.payload)
    },
    deleteShoppingItem: (state, action: PayloadAction<ShoppingItem['id']>) => {
      state.items.splice(
        state.items.findIndex((item) => item.id === action.payload),
        1
      )
    },
    editShoppingItem: (state, action: PayloadAction<ShoppingItem>) => {
      state.items.splice(
        state.items.findIndex((item) => item.id === action.payload.id),
        1,
        action.payload
      )
    },
    togglePurchaseState: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload)
      if (item) {
        item.purchased = !item.purchased
      }
    },
  },
})

interface AppState {
  loading: 'IDLE' | 'ACTIVE'
}

const initialAppStateSlice: AppState = {
  loading: 'IDLE',
}

const appStateSlice = createSlice({
  name: 'app-state',
  initialState: initialAppStateSlice,
  reducers: {
    setLoadingActive: (state) => {
      state.loading = 'ACTIVE'
    },
    setLoadingIdle: (state) => {
      state.loading = 'IDLE'
    },
  },
})

export const store = configureStore({
  reducer: {
    shopping: shoppingSlice.reducer,
    appState: appStateSlice.reducer,
  },
})

export const {
  fetchItems,
  addShoppingItem,
  togglePurchaseState,
  deleteShoppingItem,
  editShoppingItem,
} = shoppingSlice.actions
export const { setLoadingActive, setLoadingIdle } = appStateSlice.actions
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
