import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const GET_USER_INFO = 'GET_USER_INFO'
const GET_USER_ORDERS = 'GET_USER_ORDERS'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user })
const getUserInfo = userInfo => ({ type: GET_USER_INFO, userInfo })
const getUserOrders = (userOrders) => ({ type: GET_USER_ORDERS, userOrders })
const removeUser = () => ({ type: REMOVE_USER })

/**
 * THUNK CREATORS
 */ 
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getUser(res.data || defaultUser)))
      .catch(err => console.log(err))

export const auth = (email, password, method) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password })
      .then(res => {
        dispatch(getUser(res.data))
        history.push('/home')
      })
      .catch(error =>
        dispatch(getUser({ error })))

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser())
        history.push('/login')
      })
      .catch(err => console.log(err))

export const fetchUserInfo = (userId) =>
  dispatch =>
    axios.get(`/api/users/${userId}`)
      .then(user =>
        dispatch(getUserInfo(user.data))
      )
      .catch(err => console.log(err))

export const fetchUserOrders = (userId) =>
  dispatch =>
    axios.get(`/api/order/${userId}/users`)
      .then(usersOrders =>
        dispatch(getUserOrders(usersOrders.data))
      )
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {

  switch (action.type) {
    case GET_USER:
      return action.user
    case GET_USER_INFO:
      return action.userInfo
    case REMOVE_USER:
      return defaultUser
    case GET_USER_ORDERS:
      return action.userOrders
    default:
      return state
  }
  // switch (action.type) {
  //   case GET_USER:
  //     return Object.assign({}, state, {
  //       user: action.user
  //     })
  //   case GET_USER_INFO:
  //     return Object.assign({}, state, {
  //       userInfo: action.userInfo
  //     })
  //   case REMOVE_USER:
  //     return defaultUser
  //   case GET_USER_ORDERS:
  //     return Object.assign({}, state, {
  //       userOrders: action.userOrders
  //     })
  //   default:
  //     return state
  // }
}
