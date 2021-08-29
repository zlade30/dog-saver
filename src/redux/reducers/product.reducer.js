import { handleActions } from 'redux-actions'
import {
  addProductActionSuccess,
  removeProductActionSuccess,
  updateProductActionSuccess
} from '../actions/product.action'

const defaultState = {
  products: [
    {
      id: 'fjdkd49879475f',
      name:
        'Logitech G102 Gaming Mouse 8000DPI Adjustable RGB Macro Programmable Mechanical Button Wired Mouse Game Mice For Windows10/8/7',
      price: '163',
      image:
        'https://my-test-11.slatic.net/p/492d2bf07c67107cd809d4f293d2f135.jpg_200x200q90.jpg_.webp'
    }
  ]
}

const reducer = handleActions(
  {
    [addProductActionSuccess]: (state, { payload }) => {
      return {
        ...state,
        products: [...state.products, payload]
      }
    },

    [updateProductActionSuccess]: (state, { payload }) => {
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === payload.id ? { ...product, ...payload } : product
        )
      }
    },

    [removeProductActionSuccess]: (state, { payload }) => {
      return {
        ...state,
        products: state.products.filter((product) => product.id !== payload.id)
      }
    }
  },
  defaultState
)

export default reducer
