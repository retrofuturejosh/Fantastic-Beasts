import React, { Component } from 'react';
import { connect } from 'react-redux'

import { fetchBeasts, updateCart } from '../store'
/**
 * COMPONENT
 */
// export const AllBeasts = (props) => {   return (     <div>       <h3>Welcome,
// to the Landing Page</h3>     </div>   ) }
export class AllBeasts extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.getAllBeasts()
  }

  handleClick(e) {
    e.preventDefault()
    this.props.addToCart(e.target.beastId.value, e.target.quantity.value)
  }

  render() {
    let beastsInCart = this.props.cart.map(beastItem => {
      return beastItem.beast.id
    })
    return (
      <div>
        <div>
          {this.props.beasts.length && this.props.beasts.map(beast => {
            return beastsInCart.includes(beast.id) ? (
              <div key={beast.id}>
                <li>{beast.species} (Edit Button Will Go Here)already in cart</li>
              </div>
            ) :
            (
              <div key={beast.id}>
                <li>{beast.species}</li>
                <form onSubmit={this.handleClick}>
                  <button
                    name="beastId"
                    value={beast.id}
                    type="submit">
                    Add to Cart
                  </button>
                  <input
                    placeholder="1"
                    type="number"
                    name="quantity"
                    min="1"
                    max={beast.quantity} />
                </form>
              </div>
            )
          })
          }
        </div>
        <div>
          <h3>Cart</h3>
          {
            this.props.cart.length && this.props.cart.map(beastItem => {
              return (
                <div key={beastItem.beast.id}>
                  <li>{beastItem.beast.species} quantity: {beastItem.quantity}</li>
                </div>
              )
            })
          }
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
    beasts: state.beasts,
    cart: state.cart
  }
}

const mapDispatch = (dispatch) => {
  return {
    getAllBeasts: function () {
      dispatch(fetchBeasts())
    },
    addToCart: function (beastId, quantity) {
      dispatch(updateCart(beastId, quantity))
    }
  }
}

const AllBeastsContainer = connect(mapState, mapDispatch)(AllBeasts)
export default AllBeastsContainer

/**
 * PROP TYPES
 */
// UserHome.propTypes = {   email: PropTypes.string }