import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit'
import createSagaMiddleware from '@redux-saga/core'
import { ShoppingItem } from './types'
import { rootSaga } from './saga'

interface ShoppingState {
  items: ShoppingItem[]
}

const initialShoppingSliceState: ShoppingState = {
  items: [],
}

const shoppingSlice = createSlice({
  name: 'shopping',
  initialState: initialShoppingSliceState,
  reducers: {
    setShoppingItems: (state, action: PayloadAction<ShoppingItem[]>) => {
      state.items = action.payload
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
    togglePurchaseState: (state, action: PayloadAction<string>) => {
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

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    shopping: shoppingSlice.reducer,
    appState: appStateSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).prepend(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export const {
  setShoppingItems,
  addShoppingItem,
  togglePurchaseState,
  deleteShoppingItem,
  editShoppingItem,
} = shoppingSlice.actions
export const { setLoadingActive, setLoadingIdle } = appStateSlice.actions
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
