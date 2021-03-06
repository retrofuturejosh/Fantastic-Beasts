import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import beast from './singleBeast'
import beasts from './beasts'
import cart from './cart'
import reviews from './reviews'

const reducer = combineReducers({
  user,
  beasts,
  beast,
  cart,
  reviews
})

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './singleBeast'
export * from './beasts'
export * from './cart'
