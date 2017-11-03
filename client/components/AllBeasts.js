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
    this.parseLocalCart = this.parseLocalCart.bind(this)
  }

  componentDidMount() {
    let parsedCart
    this.props.getAllBeasts()
    let storedCart = localStorage.getItem('beastsInCart')
    if (storedCart) {
      parsedCart = this.parseLocalCart(storedCart)
      let beastIdArray = Object.keys(parsedCart)
      beastIdArray.forEach(beastId => {
        let quantity = parsedCart[beastId]
        this.props.addToCart(beastId, quantity, true)
      })
    }
  }

  parseLocalCart = str => {
    let result = {};
    const items = str.split(' - ')
    items.forEach(item => {
      let beastIdx = item[0]
      let quantity = item[4]
      result[beastIdx] = quantity
    })
    return result
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
    addToCart: function (beastId, quantity, storeCheck) {
      dispatch(updateCart(beastId, quantity, storeCheck))
    }
  }
}

const AllBeastsContainer = connect(mapState, mapDispatch)(AllBeasts)
export default AllBeastsContainer

/**
 * PROP TYPES
 */
// UserHome.propTypes = {   email: PropTypes.string }