import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {firstName, lastName, orders, reviews} = props
  return (
    <div>
      <h3>Welcome, {`${firstName} ${lastName}!`}</h3>
      <div>
        <h4>Your Order History : </h4>
        {
          orders.length&&orders.map(order => {
            return({
              <p>Order Status: {order.status}</p>
              <p>Order Date: {order.date}</p>
              <p>Beasts:
                {
                  order.beasts.map(beast =>{
                      return (
                        <Link key={beast.id} to={`/singleBeast/${beast.id}`}>
                          <p>Beast price: {beast.species}</p>
                        </Link>
                        <p>Beast PRICE: {beast.order_beast.fixedPrice}</p>
                        <p>Beast QTY: {beast.order_beast.quantity}</p>
                        <p>Beast SUBTOTAL: {beast.order_beast.quantity * beast.order_beast.fixedPrice}</p>
                      )
                    }
                  )
                }
              </p>
              <p>Order Status: {order.status}</p>
            })
          })
        }
      </div>

      <div>
        <div>
          <h5>LEAVE A REVIEW: </h5>
        </div>

        <h5>ALL REVIEWS: </h5>
          {
           reviews.length&&reviews.map(review => {
            return({
              <h5>TITLE: {review.title}</h5>
              <p>STARS: {review.stars}</p>
              <p>CONTENT: {review.content}</p>
              <img{review.imageUrl? review.imageUrl : "favicon.ico"}></img>
              <Link to={`/singleBeast/${review.beastId}`}>
                <p>beast: {review.beastId}</p>
              </Link>
            })
           })
          }
      </div>

    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    firstName: state.user.firstName,
    lastName: state.user.lastName
    this.beast = null;
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  firstName: PropTypes.string
  lastName: PropTypes.string
}
