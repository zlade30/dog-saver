import { createAction } from 'redux-actions'

export const getProductListAction = createAction(
  'product/GET_PRODUCT_LIST_ACTION'
)
export const getProductListActionSuccess = createAction(
  'product/GET_PRODUCT_LIST_ACTION_SUCCESS'
)
export const getProductListActionFailed = createAction(
  'product/GET_PRODUCT_LIST_ACTION_FAILED'
)

export const addProductAction = createAction('product/ADD_PRODUCT_ACTION')
export const addProductActionSuccess = createAction(
  'product/ADD_PRODUCT_ACTION_SUCCESS'
)
export const addProductActionFailed = createAction(
  'product/ADD_PRODUCT_ACTION_FAILED'
)

export const updateProductAction = createAction('product/UPDATE_PRODUCT_ACTION')
export const updateProductActionSuccess = createAction(
  'product/UPDATE_PRODUCT_ACTION_SUCCESS'
)
export const updateProductActionFailed = createAction(
  'product/UPDATE_PRODUCT_ACTION_FAILED'
)

export const removeProductAction = createAction('product/REMOVE_PRODUCT_ACTION')
export const removeProductActionSuccess = createAction(
  'product/REMOVE_PRODUCT_ACTION_SUCCESS'
)
export const removeProductActionFailed = createAction(
  'product/REMOVE_PRODUCT_ACTION_FAILED'
)

export const searchProductAction = createAction('product/SEARCH_PRODUCT_ACTION')
export const searchProductActionSuccess = createAction(
  'product/SEARCH_PRODUCT_ACTION_SUCCESS'
)
export const searchProductActionFailed = createAction(
  'product/SEARCH_PRODUCT_ACTION_FAILED'
)
