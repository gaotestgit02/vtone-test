import { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { call, put, takeEvery } from 'redux-saga/effects'
import { sagaActions } from './sagaActions'
import {
  addShoppingItem,
  deleteShoppingItem,
  editShoppingItem,
  setLoadingActive,
  setLoadingIdle,
  setShoppingItems,
} from './store'
import { ShoppingItem } from './types'

axios.defaults.baseURL = '/api/shoppingitems'

function* fetchShoppingItemsSaga() {
  try {
    yield put(setLoadingActive())
    const { data }: { data: ShoppingItem[] } = yield call(axios.get, '/')
    yield put(setShoppingItems(data))
  } catch (e) {
    console.log('error while fetching shopping items')
  } finally {
    yield put(setLoadingIdle())
  }
}

function* addShoppingItemSaga(action: PayloadAction<ShoppingItem>) {
  try {
    yield put(setLoadingActive())
    const { data }: { data: ShoppingItem } = yield call(
      axios.post,
      '/',
      action.payload
    )
    yield put(addShoppingItem(data))
  } catch (e) {
    console.log('error while adding shopping item')
  } finally {
    yield put(setLoadingIdle())
  }
}

function* deleteShoppingItemSaga(action: PayloadAction<string>) {
  try {
    yield put(setLoadingActive())
    const data: { status: number } = yield call(
      axios.delete,
      `/${action.payload}`
    )
    if (data.status === 200) {
      yield put(deleteShoppingItem(action.payload))
    }
  } catch (e) {
    console.log('error while deleting item')
  } finally {
    yield put(setLoadingIdle())
  }
}

function* editShoppingItemSaga(action: PayloadAction<ShoppingItem>) {
  try {
    yield put(setLoadingActive())
    const data: { status: number } = yield call(
      axios.put,
      `/${action.payload.id}`,
      action.payload
    )
    if (data.status === 200) {
      yield put(editShoppingItem(action.payload))
    }
  } catch (e) {
    console.log('error while updating shopping item')
  } finally {
    yield put(setLoadingIdle())
  }
}

export function* rootSaga() {
  yield takeEvery(sagaActions.FETCH_SHOPPING_ITEMS, fetchShoppingItemsSaga)
  yield takeEvery(sagaActions.ADD_SHOPPING_ITEM, addShoppingItemSaga)
  yield takeEvery(sagaActions.DELETE_SHOPPING_ITEM, deleteShoppingItemSaga)
  yield takeEvery(sagaActions.EDIT_SHOPPING_ITEM, editShoppingItemSaga)
}
