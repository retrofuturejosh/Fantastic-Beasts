import axios from 'axios'
import history from '../history'


/**
 * ACTION TYPES
 */
const GET_BEAST = 'GET_BEAST'

/**
 * INITIAL STATE
 */
const defaultBeast = {}


/**
 * ACTION CREATORS
 */
const getBeast = beast => ({ type: GET_BEAST, beast })

/**
 * THUNK CREATORS
 */
export const beast = (id) =>
dispatch =>
  axios.get(`/api/beasts/${id}`)
    .then(res =>
      dispatch(getBeast(res.data)))
    .catch(err => console.log(err))


/**
 * REDUCER
 */
export default function (state = defaultBeast, action) {
    switch (action.type) {
      case GET_BEAST:
        return action.beast
      default:
        return state
    }
  }

