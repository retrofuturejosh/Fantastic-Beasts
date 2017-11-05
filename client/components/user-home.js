import React , {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchUserInfo} from '../store/user'

/**
 * COMPONENT
 */
class UserHome extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    this.props.getUserInfo(this.props.userInfo.id)
  }

  render(){
    const {userInfo} = this.props
    const {
            firstName,
            lastName
          } = this.props.userInfo
          console.log('LINE 27', this.props)
          // console.log('LINE 28', orders)
    return (
        <div>
          <h3>Welcome, {`${firstName} ${lastName}!`}</h3>
          <div>
             <h4>Your Order History : </h4>
            {
              userInfo.orders&&userInfo.orders.map(order => {
                return (
                  <div key={order.id}>
                    <p>Order Status: {order.orderStatus}</p>
                    <p>Order Date: {order.orderDate}</p>
                    <p>Beasts:
                      {
                         order.beasts.length&&order.beasts.map(beast =>{
                            return (
                              <div key={beast.id}>
                                <Link to={`/singleBeast/${+beast.id}`}>
                                  <p>Beast price: {beast.species}</p>
                                </Link>
                                <p>Beast PRICE: {beast.order_beast.fixedPrice}</p>
                                <p>Beast QTY: {beast.order_beast.quantity}</p>
                                <p>Beast SUBTOTAL: {beast.order_beast.quantity * beast.order_beast.fixedPrice}</p>
                              </div>
                            )
                          }
                        )
                      }
                    </p>
                  </div>
                )
              })
            }
          </div>

          <div>
            <div>
              <h5>LEAVE A REVIEW: </h5>
            </div>
            <div>
              <h5>ALL REVIEWS: </h5>

            </div>
          </div>
        </div>
      )
  }
}
/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    userInfo: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    getUserInfo: function (userId) {
      dispatch(fetchUserInfo(userId))
    }
  }
}

export default connect(mapState,mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  userInfo: PropTypes.object.isRequired,
  getUserInfo: PropTypes.func.isRequired,
}






// {
//                  reviews.length&&reviews.map(review => {
//                   return({
//                     <h5>TITLE: {review.title}</h5>
//                     <p>STARS: {review.stars}</p>
//                     <p>CONTENT: {review.content}</p>
//                     <img{review.imageUrl? review.imageUrl : "favicon.ico"}></img>
//                     <Link to={`/singleBeast/${review.beastId}`}>
//                       <p>{review.reviewee.species}</p>
//                     </Link>
//                   })
//                  })
//                 }
