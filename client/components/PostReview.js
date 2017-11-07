import React, { Component } from 'React'
import { connect } from 'react-redux'

import { fetchUserInfo } from '../store/user'

class PostReview extends Component {
  constructor(props) {
    super(props)
    this.submitReview = this.submitReview.bind(this)
  }

  componentDidMount() {
    this.props.getUserInfo(this.props.user.id)
  }

  submitReview(event) {
    event.preventDefault()
    const reviewToSubmit = {
      // stars: ,
      // title: ,
      // content: ,
      // imageUrl: 
    }
    console.log('HIT SUBMIT BUTTON')
  }

  render() {
    const rating = [1, 2, 3, 4, 5]
    const name = this.props.user.firstName
    const orders = this.props.user.orders
    console.log('THIS.PROPS.USER.ORDERS => ', this.props.user.orders)
    return (
      <div>
        <h1>{`${name}, please leave a review!`}</h1>
        <form onSubmit={this.submitReview}>
          <div>
            <label>
              Ordered Beasts:
            <select>
                {
                  orders && orders.map(order => {
                    return order.beasts && order.beasts.map(beast => {
                      return (
                        <option key={beast.id}>{beast.species}</option>
                      )
                    })
                  })
                }
              </select>
            </label>
            <label>
              Rating:
          <select>
                {
                  rating.map((star, index) => (
                    <option key={star}>{star}</option>
                  ))
                }
              </select>
            </label>
          </div>
          <label>
            Title:
            <input
              name="reviewTitle"
              type="text"
            />
          </label>
          <label>
            Write a review:
            <input
              name="reviewContent"
              type="content"
            />
          </label>
          <input type="submit" />
        </form>
      </div>
    )
  }

}

const mapState = (state) => {
  return {
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    getUserInfo: function (userId) {
      dispatch(fetchUserInfo(userId))
    }
  }
}

const PostReviewContainer = connect(mapState, mapDispatch)(PostReview)
export default PostReviewContainer
