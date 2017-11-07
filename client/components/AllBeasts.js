import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchBeasts, setInput, updateCart } from '../store'
import { Link } from 'react-router-dom';
import history from '../history'

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
    this.handleEditClick = this.handleEditClick.bind(this)
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
        let beastIdx, quantity
        if (item[1] !== ' '){
            beastIdx = item.slice(0, 2)
            if (typeof item[6] !== undefined) {
                quantity = item.slice(5, 7)
            } else quantity = item[5]
        } else {
            beastIdx = item[0]
            if (item[5] !== undefined) {
                quantity = item.slice(4, 6)
            } else quantity = item[4]
        }
        result[beastIdx] = quantity
    })
    return result
  }

  handleEditClick(){
    history.push('/cart')
  }

  handleClick(e) {
    e.preventDefault()
    console.log('beast id is ', e.target.beastId.value, 'quantity is ', e.target.quantity.value)
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

    let filterBeasts = beasts.beasts.filter(beast => {
      if (beast.species.toLowerCase().includes(this.state.input.toLowerCase())) return beast
    })
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

        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            placeholder="Watchya lookin for?"
            type="text"
            onChange={this.handleInputChange} />
          <span className="input-group-btn">
            <button type="submit" className="btn btn-outline-secondary">Submit</button>
          </span>
        </form>

        <div className="container">
          <div className="row">
          {
            filterBeasts.length && filterBeasts.sort((a, b) => a.species - b.species).map(beast => {
              return beastsInCart.includes(beast.id) ? (
                <div key={beast.id} className="col-md-4">
                    <Link key={ beast.id } to={`/singleBeast/${beast.id}`}><h4>{beast.species}</h4></Link>
                    <img className="img-fluid" src={beast.imageUrl} />
                    <div>Price: {beast.price}</div>
                    <div>Quantity Available: {beast.quantity}</div>
                     Item in cart
                  </div>) :
                  (
                    <div key={beast.id} className="col-md-4">
                      <Link key={ beast.id } to={`/singleBeast/${beast.id}`}><h4>{beast.species}</h4></Link>
                      <img className="img-fluid" src={beast.imageUrl} />
                      <div>Price: {beast.price}</div>
                      <div>Quantity Available: {beast.quantity}</div>
                      <form onSubmit={this.handleClick}>
                        <button
                          className="btn btn-outline-secondary"
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
               || <p>UNAVAILABLE</p> })
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


//  form: className="input-group
// input: "form-control"