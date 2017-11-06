import React, {Component} from 'react';
import {connect} from 'react-redux'

import {fetchBeasts, updateCart, editCartThunk } from '../store'

class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            quantityHandler: {}
        }
        this.parseLocalCart = this
            .parseLocalCart
            .bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
    }

    componentDidMount() {
        let parsedCart
        let storedCart = localStorage.getItem('beastsInCart')
        if (storedCart) {
            parsedCart = this.parseLocalCart(storedCart)
            console.log(parsedCart)
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
            let beastIdx = item[0]
            let quantity = item[4]
            result[beastIdx] = quantity
        })
        return result
    }

    handleDelete(e, beastId) {
        e.preventDefault()
        let storedCart = localStorage.getItem('beastsInCart')
        let parsedCart
        if (storedCart) {
            parsedCart = this.parseLocalCart(storedCart)
            delete parsedCart[beastId]
            this.props.editCart(parsedCart)
        }
    }

    handleEdit(e, beastId) {
        e.preventDefault()
        let storedCart = localStorage.getItem('beastsInCart')
        let parsedCart
        if (storedCart && this.state.quantityHandler[1] > this.state.quantityHandler[0]) {
            parsedCart = this.parseLocalCart(storedCart)
            parsedCart[beastId] = this.state.quantityHandler[beastId]
            this.props.editCart(parsedCart)
        } else {
            
        }
    }

    handleChange(e, beastId, maxQuantity) {
        let newEditState = this.state.quantityHandler
        newEditState[beastId] = [e.target.value, maxQuantity]
        this.setState(newEditState, () => console.log(this.state))
    }

    render() {
        return (
            <div>
                <ul>
                    {this.props.cart.map(item => {
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
                                        <button onClick={(e) => this.handleEdit(e, item.beast.id)}>edit item quantity</button>
                                        <button onClick={(e) => this.handleDelete(e, item.beast.id)}>remove from cart</button>
                                    </li>
                                </div>
                        )
                    })
                }
                </ul>
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