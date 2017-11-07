import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchBeasts, updateCart, editCartThunk } from '../store'

class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            quantityHandler: {},
            badQuantity: {}
        }
        this.parseLocalCart = this
            .parseLocalCart
            .bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
    }

    componentDidMount() {
        console.log('this.props are ', this.props)
        let parsedCart
        let storedCart = localStorage.getItem('beastsInCart')
        if (storedCart) {
            console.log('storedCart is ', storedCart)
            parsedCart = this.parseLocalCart(storedCart)
            console.log('parsed cart is ', parsedCart)
            let beastIdArray = Object.keys(parsedCart)
            beastIdArray.forEach(beastId => {
                if (beastId !== 'undefined'){
                    let quantity = parsedCart[beastId]
                    this
                        .props
                        .addToCart(beastId, quantity, true)
                }
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
        console.log('parsing happened, parsed cart is ', result)
        return result
    }

    handleDelete(e, beastId) {
        e.preventDefault()
        let storedCart = localStorage.getItem('beastsInCart')
        let parsedCart
        if (storedCart) {
            parsedCart = this.parseLocalCart(storedCart)
            console.log('our parsed cart is ', parsedCart)
            delete parsedCart[beastId]
            this.props.editCart(parsedCart)
        }
    }

    handleEdit(e, beastId) {
        e.preventDefault()
        let storedCart = localStorage.getItem('beastsInCart')
        let parsedCart
        if (storedCart && this.state.quantityHandler[beastId]) {
            parsedCart = this.parseLocalCart(storedCart)
            parsedCart[beastId] = this.state.quantityHandler[beastId][0]
            console.log('before we handle the edit ', parsedCart)
            this.props.editCart(parsedCart)
        }
    }

    handleChange(e, beastId, maxQuantity) {
        let newEditState = this.state.quantityHandler
        let newBadState = this.state.badQuantity
        if (+e.target.value > +maxQuantity) {
           newBadState[beastId] = true
           this.setState({ badQuantity: newBadState })
        } else {
            delete newBadState[beastId]
            newEditState[beastId] = [e.target.value, maxQuantity]
            this.setState({ quantityHandler: newEditState, badQuantity: newBadState })
        }
    }

    render() {
        let orderedItems = this.props.cart.sort((a, b) => a.beast.species > b.beast.species)
        return (
            <div>
                <ul>
                    {orderedItems.map(item => {
                            return (
                                <div key={item.beast.id}>
                                    <li>
                                        {item.beast.species} quantity: <input
                                            placeholder={item.quantity}
                                            type="number"
                                            name="quantity"
                                            min="1"
                                            max={item.beast.quantity}
                                            onChange={(e) => this.handleChange(e, item.beast.id, item.beast.quantity)}/>
                                        <button disabled={this.state.badQuantity[item.beast.id]} onClick={(e) => this.handleEdit(e, item.beast.id)}>edit item quantity</button>
                                        <button onClick={(e) => this.handleDelete(e, item.beast.id)}>remove from cart</button>
                                        {
                                            this.state.badQuantity[item.beast.id] &&
                                            <div style={{ color: 'red'}}>The quantity can not exceed {item.beast.quantity}</div>
                                        }
                                    </li>
                                </div>
                        )
                    })
                }
                </ul>
                <Link to="/checkout">
                    <button type="button">CHECKOUT</button>
                </Link>
            </div>
        )
    }
}

const mapState = (state) => {
    return {beastsInCart: state.beasts, cart: state.cart}
}

const mapDispatch = (dispatch) => {
    return {
        getAllBeasts: function () {
            dispatch(fetchBeasts())
        },
        addToCart: function (beastId, quantity, storeCheck) {
            dispatch(updateCart(beastId, quantity, storeCheck))
        },
        editCart: function (newCartObj) {
            dispatch(editCartThunk(newCartObj))
        }
    }
}

const CartContainer = connect(mapState, mapDispatch)(Cart)
export default CartContainer
