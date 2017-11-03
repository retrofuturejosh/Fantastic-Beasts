import React, {Component} from 'react';
import {connect} from 'react-redux'

import {fetchBeasts, updateCart} from '../store'
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
    this
      .props
      .getAllBeasts()
  }

  handleClick (e) {
    e.preventDefault()
    console.log('add to cart button clicked with value', e.target.value)
    console.log('props are', this.props)
    const cartPromise = this.props.addToCart(e.target.value)
  }

  render() {
    return (
      <div>
        <div>
          {this.props.beasts.length && this
            .props
            .beasts
            .map(beast => {
              return (
                <div key={beast.id}>
                  <li>{beast.species}</li>
                  <button onClick={ this.handleClick } value={beast.id}>Add to Cart</button>
                </div>
              )
            })
  }
        </div>
        <div>
          <h3>Cart</h3>
          {
            this.props.cart.length && this.props.cart.map(beast => {
              return (
              <div key={beast.id}>
                <li>{beast.species}</li>
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
    addToCart: function (beastId) {
      dispatch(updateCart(beastId))
    }
  }
}

const AllBeastsContainer = connect(mapState, mapDispatch)(AllBeasts)
export default AllBeastsContainer

/**
 * PROP TYPES
 */
// UserHome.propTypes = {   email: PropTypes.string }