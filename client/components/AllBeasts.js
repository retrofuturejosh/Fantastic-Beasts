import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchBeasts, setInput, updateCart } from '../store'
/**
 * COMPONENT
 */
export class AllBeasts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: ""
    }
    this.handleInputChange = this.handleInputChange.bind(this)
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

  handleInputChange(evt) {
    this.setState({ input: evt.target.value })
  }

  render() {
    const { beasts, handleCategoryChange, handleInputChange } = this.props
    let beastsInCart = this.props.cart.map(beastItem => {
      return beastItem.beast.id
    })

    let filterBeasts = beasts.beasts.map(beast => {
      if (beast.species.includes(this.state.input)) return beast
    })
    filterBeasts = filterBeasts.sort((a, b) => a.species - b.species)
    return (
      <div className="container">
        <div>
          <select onChange={handleCategoryChange} className="custom-select">
            <option>Choose a Category</option>
            <option>Land</option>
            <option>Air</option>
            <option>Sea</option>
            <option>Fire</option>
          </select>
        </div>

        <div className="input-group">
          <input
            className="form-control"
            placeholder="What are you looking for?"
            type="text"
            onChange={this.handleInputChange} />
          <span className="input-group-btn">
            <button type="submit" className="btn btn-outline-secondary">Submit</button>
          </span>
        </div>

        <div className="container">
          {
            filterBeasts.length && filterBeasts.map(beast => {
              return beastsInCart.includes(beast.id) ? (
                <div key={beast.id}>
                  <li>
                    <div>Name: {beast.species}</div>
                    <div>{beast.imageUrl}</div>
                    <div>{beast.price}</div>
                    <div>{beast.quantity}</div> 
                    (Edit Button Will Go Here) already in cart
                  </li>
                </div>) :
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
    input: state.input,
    cart: state.cart
  }
}

const mapDispatch = (dispatch) => {
  return {
    getAllBeasts: function () {
      dispatch(fetchBeasts())
    },
    handleCategoryChange(evt) {
      let category
      if (evt.target) category = evt.target.value
      dispatch(fetchBeasts(category))
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
AllBeasts.propTypes = {
  input: PropTypes.string
}
