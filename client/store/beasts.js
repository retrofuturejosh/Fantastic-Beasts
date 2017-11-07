import axios from 'axios';

// INITIAL STATE
const initialState = {
  beasts:[],
  input: ""
}

// ACTION TYPE
const GET_BEASTS = 'GET_BEASTS'
const SET_INPUT = 'SET_INPUT'

// ACTION CREATOR
const getBeasts = beasts => ({ type: GET_BEASTS, beasts })
export const setInput = input => ({ type: SET_INPUT, input })

// THUNK CREATORS
export const fetchBeasts = (category) => dispatch => {
    if(!category || category.includes("Choose")){
        axios.get('/api/beasts')
        .then(res => dispatch(getBeasts(res.data)))
        .catch(err => console.log(err))
    } else {
      axios.get('/api/beasts')
        .then(res => {
          const arr = res.data.filter(beast => beast.category === category)
          dispatch(getBeasts(arr))
        })
        .catch(err => console.log(err))
  }
}

// REDUCER
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_BEASTS:
      return {
          ...state,
          beasts:action.beasts
        }
    case SET_INPUT:
      return {
          ...state,
          input:action.input
      }
    default:
      return state
  }
}
