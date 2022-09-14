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
    setActive: (state) => {
      state.loading = 'ACTIVE'
    },
    setIdle: (state) => {
      state.loading = 'IDLE'
    },
  },
})

export const store = configureStore({
  reducer: {
    items: shoppingItemsSlice.reducer,
    appState: appStateSlice.reducer,
  },
})

export const { fetchItems } = shoppingItemsSlice.actions
export const { setActive, setIdle } = appStateSlice.actions
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
