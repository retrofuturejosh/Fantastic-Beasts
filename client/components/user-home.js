import React , {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchUserInfo } from '../store/user'

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
    const { firstName, lastName } = this.props.userInfo
    const { orders, reviews } = this.props.userInfo

    return !(orders)?(<h3>Welcome, {`${firstName} ${lastName}!`}</h3>):(
        <div>
          <h3>Welcome, {`${firstName} ${lastName}!`}</h3>
          <div>
             <h4>Your Order History : </h4>
            {
              orders && orders.map(order => {
                this.total = 0
                return (
                  <div key={order.id}>
                    <p>Order Status: {order.orderStatus}</p>
                    <p>Order Date: {order.orderDate}</p>
                    <div>Beasts:
                      {
                         order.beasts.length&&order.beasts.map(beast =>{
                            let price = +beast.order_beast.fixedPrice
                            let qty = +beast.order_beast.quantity
                            this.total += price * qty
                            return (
                              <ul key={beast.id}>
                                <Link to={`/singleBeast/${+beast.id}`}>
                                  <li>Beast TYPE: {beast.species}</li>
                                </Link>
                                <li>Beast PRICE: {new Intl.NumberFormat().format(price)+".00"}</li>
                                <li>Beast QTY: {qty}</li>
                                <li>Beast SUBTOTAL: {new Intl.NumberFormat().format(price*qty)+".00"}</li>
                              </ul>
                            )
                          }
                        )
                      }
                    </div>
                  <h5>ORDER TOTAL: {new Intl.NumberFormat().format(this.total)+".00"}</h5>
                  </div>
                )
              })
            }
          </div>
          <div>
            <div>
                {
                  <Link to="/postreview"><h5>LEAVE A REVIEW </h5></Link>
                }
            </div>
            <div>
              <h5>ALL REVIEWS: </h5>
                {
                 reviews.length&&reviews.map(review => {
                  return(
                    <div key={review.id}>
                      <h6>TITLE: {review.title}</h6>
                      <p>STARS: {review.stars}</p>
                      <p>CONTENT: {review.content}</p>
                      <img src={review.imageUrl || "favicon.ico"}/>
                      <Link to={`/singleBeast/${review.beastId}`}>
                        <p>{review.reviewee.species}</p>
                      </Link>
                    </div>
                  )
                 })
                }
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
    userInfo: state.user,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getUserInfo: function (userId) {
      dispatch(fetchUserInfo(userId))
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  userInfo: PropTypes.object.isRequired,
  getUserInfo: PropTypes.func.isRequired,
}

