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
  }

  componentDidMount(){
    this.props.getUserInfo(this.props.userInfo.id)
  }

  render(){
    const { firstName, lastName } = this.props.userInfo
    const { orders } = this.props.userInfo
    // if(orders){
    //   const { beasts } = this.props.userInfo.orders
    //   return ()
    // } else {
    //   return (<h3>Welcome, {`${firstName} ${lastName}!`}</h3>)
    // }

    console.log('THIS.PROPS => ', this.props)

    return (

        <div>
          <h3>Welcome, {`${firstName} ${lastName}!`}</h3>
          <div>
             <h4>Your Order History : </h4>
            {
              orders && orders.map(order => {
                return (
                  <div key={order.id}>
                    <p>Order Status: {order.orderStatus}</p>
                    <p>Order Date: {order.orderDate}</p>
                    <p>Beasts:
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
  console.log('STATE.USERINFO', state)
  return {
    userInfo: state.user,
    userOrders: state.userOrders
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

export default connect(mapState, mapDispatch)(UserHome)

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
