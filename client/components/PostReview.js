import React, { Component } from 'React'
import { connect } from 'react-redux'
import history from '../history'

import { fetchUserInfo } from '../store/user'
import { postReviewThunk } from '../store/reviews'

class PostReview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stars: 1,
      beastId: 1
    }
    this.submitReview = this.submitReview.bind(this)
    this.handleReviewChange = this.handleReviewChange.bind(this)
    this.handleSelectBeast = this.handleSelectBeast.bind(this)
  }

  componentDidMount() {
    this.props.getUserInfo(this.props.user.id)
  }

  handleReviewChange(event) {
    this.setState({ stars: Number(event.target.value) })
  }

  handleSelectBeast(event) {
    this.setState({ beastId: Number(event.target.value) })
  }

  submitReview(event) {
    event.preventDefault()
    const reviewToSubmit = {
      title: event.target.reviewTitle.value,
      content: event.target.reviewContent.value,
      stars: this.state.stars,
      beastId: this.state.beastId,
      userId: this.props.user.id,
      authorId: this.props.user.id,
      revieweeId: this.props.user.id,
      imageUrl: 'TEST URL'
    }
    console.log('HIT SUBMIT BUTTON', reviewToSubmit)
    this.props.postAReview(reviewToSubmit)
    history.push('/postedreview')
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
            <select value={this.state.beastId} onChange={this.handleSelectBeast}>
                {
                  orders && orders.map(order => {
                    return order.beasts && order.beasts.map(beast => {
                      return (
                        <option key={beast.id} value={beast.id}>{beast.species}</option>
                      )
                    })
                  })
                }
              </select>
            </label>
            <label>
              Rating:
              <select value={this.state.stars} onChange={this.handleReviewChange}>
                {
                  rating.map(star => (
                    <option key={star} value={star}>{star}</option>
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
    },
    postAReview: function (review) {
      dispatch(postReviewThunk(review))
    }
  }
}

const PostReviewContainer = connect(mapState, mapDispatch)(PostReview)
export default PostReviewContainer
