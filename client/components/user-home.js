import React , {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchUserInfo, fetchUserOrders } from '../store/user'

/**
 * COMPONENT
 */
class UserHome extends Component {
  constructor(props) {
    super(props)
    this.total = 0;
    this.calculator = this.calculator.bind(this)
  }

  componentDidMount(){
    this.props.getUserInfo(this.props.userInfo.id)
  }

  calculator(num){
    this.total += num
  }

  render(){
    const { firstName, lastName } = this.props.userInfo
    const { orders } = this.props.userInfo

    return !(orders)?(<h3>Welcome, {`${firstName} ${lastName}!`}</h3>):(

        <div>
          <h3>Welcome, {`${firstName} ${lastName}!`}</h3>
          <div>
             <h4>Your Order History : </h4>
            {
              orders && orders.map(order => {
                return (
                  <ul key={order.id}>
                    <li>Order Status: {order.orderStatus}</li>
                    <li>Order Date: {order.orderDate}</li>
                    <li>Beasts:
                     {
                         order.beasts.length&&order.beasts.map(beast =>{
                            return (
                              <ul key={beast.id}>
                                <Link to={`/singleBeast/${+beast.id}`}>
                                  <li>Beast TYPE: {beast.species}</li>
                                </Link>
                                <li>Beast PRICE: {beast.order_beast.fixedPrice}</li>
                                <li>Beast QTY: {beast.order_beast.quantity}</li>
                                {this.calculator(beast.order_beast.quantity * beast.order_beast.fixedPrice)}
                              </ul>
                            )
                          }
                        )
                      }
                    <li>TOTAL: {this.total}</li>
                    </li>
                  </ul>
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
    userInfo: state.user,
    // userOrders: state.userOrders
  }
}

const mapDispatch = (dispatch) => {
  return {
    getUserInfo: function (userId) {
      dispatch(fetchUserInfo(userId))
      // dispatch(fetchUserOrders(userId))
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




// this is for the afternoon, please DO NOT DELETE THIS!!!!

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
