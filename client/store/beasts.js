import axios from 'axios';

// ACTION TYPE
const GET_BEASTS = 'GET_BEASTS'

// ACTION CREATOR
const getBeasts = beasts => ({ type: GET_BEASTS, beasts })

// THUNK CREATORS
export const fetchBeasts = () => dispatch => {
  axios.get('/api/beasts')
    .then(res => dispatch(getBeasts(res.data)))
    .catch(err => console.log(err))
}

// REDUCER
export default function (beasts = [], action) {
  switch (action.type) {
    case GET_BEASTS:
      return action.beasts
    default:
      return beasts
  }
}
