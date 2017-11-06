import React, { Component } from 'react'
import { connect } from 'react-redux'
import {fetchBeasts, updateCart, editCartThunk } from '../store'
import axios from 'axios'

class CheckoutForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            subtotal: '',
            tax: '',
            total: ''
        }
        this.handleCheckout = this.handleCheckout.bind(this)
        this.parseLocalCart = this.parseLocalCart.bind(this)        
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

    handleCheckout = (e) => {     
        e.preventDefault()
        let userId
        if (this.props.user) userId = this.props.user.id
        else userId = null
        let orderToPost = {
            orderStatus: 'Created',
            orderDate: new Date(),
            shippingAddress: e.target.shippingAddress.value,
            creditCardInfo: e.target.creditCard.value,
            email: e.target.email.value,
            userId: userId
        }
        console.log(orderToPost)
        axios.post('/api/order', orderToPost)
            .then(() => alert('Your order has been placed (FIX LATER)'))

    }

    render() {
        console.log('this.props => ', this.props)
        let orderedItems = this.props.cart.sort((a, b) => a.species - b.species)
        let subtotal = orderedItems.length ? this.props.cart.reduce((item, nextItem) => {
            return item.beast.price + nextItem.beast.price
        }) : null
        let fixedSubtotal = (subtotal / 100).toFixed(2)
        let tax = (fixedSubtotal * 8.875)
        let fixedTax = (tax  / 100).toFixed(2)
        let total = (+subtotal + +tax)
        let fixedTotal = (total / 100).toFixed(2)
        return (
            <div>
                <h3>Items in Cart:</h3>
                {
                    orderedItems.map(item => {
                        return (
                            <li key={item.beast.id}>
                                {
                                    `${item.beast.species} Quantity: ${item.beast.quantity} Price: $${(item.beast.price / 100).toFixed(2)} `
                                }
                            </li>
                        )
                    })
                }
                <h4>Subtotal: </h4>
                {
                    `$${fixedSubtotal}`
                }
                <h4>Tax: </h4>
                {
                    `$${fixedTax}`
                }
                <h4>Total: </h4>
                {
                    `$${fixedTotal}`
                }
                <form onSubmit={(e) => this.handleCheckout(e)}>
                    Email:
                    <input 
                        type="text"
                        name="email"
                    />
                    Shipping Address:
                    <input 
                        type="text"
                        name="shippingAddress"
                    />
                    Credit Card:
                    <input 
                        type="text"
                        name="creditCard"
                    />
                    <button type="submit">Checkout</button>
                </form>
            </div>
        )
    }
}

const mapState = (state) => {
    return { 
        cart: state.cart,
        user: state.user 
    }
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

const CheckoutFormContainer = connect(mapState, mapDispatch)(CheckoutForm)
export default CheckoutFormContainer