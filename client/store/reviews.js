import axios from 'axios'

// ACTION TYPE
const POST_REVIEW = 'POST_REVIEW'

// ACTION CREATOR
const postReview = review => ({ type: POST_REVIEW, review })

// THUNK CREATORS
export const postReviewThunk = review => dispatch => {
  axios.post('/api/reviews', review)
    .then(res => dispatch(postReview(res.data)))
    .catch(err => console.error(err))
}

// REDUCER
export default function (state = [], action) {
  switch (action.type) {
    case POST_REVIEW:
      return action.review
    default:
      return state
  }
}