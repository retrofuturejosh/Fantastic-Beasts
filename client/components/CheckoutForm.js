import React, { Component } from 'react'
import { connect } from 'react-redux'
import {fetchBeasts, updateCart, editCartThunk } from '../store'
import axios from 'axios'
import history from '../history'

class CheckoutForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            subtotal: '',
            tax: '',
            total: '',
            promoCode: false
        }
        this.hashPromoCode = this.hashPromoCode.bind(this)
        this.handlePromoCode = this.handlePromoCode.bind(this)
        this.handleCheckout = this.handleCheckout.bind(this)
        this.parseLocalCart = this.parseLocalCart.bind(this)
        this.coreyBirthdayCode = this.hashPromoCode("HBDCorey")
    }

    componentDidMount() {
        let parsedCart
        let storedCart = localStorage.getItem('beastsInCart')
        if (storedCart) {
            parsedCart = this.parseLocalCart(storedCart)
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
            if (typeof item[1] !== ' '){
                beastIdx = item.slice(0, 2)
            } else beastIdx = item[0]
            if (typeof item[5] !== undefined) {
                quantity = item.slice(4, 6)
            } else quantity = item[4]
            result[beastIdx] = quantity
        })
        return result
    }

    /*
        I didn't write the hashPromoCode !!
        CHECK IT OUT : https://github.com/darkskyapp/string-hash/blob/master/index.js
        - Hyunjoo
    */
    hashPromoCode = str => {
      var hash = 1108,
          i    = str.length;
      while(i) {
        hash = (hash * 33) ^ str.charCodeAt(--i);
      }
      return hash >>> 0;
    }

    handlePromoCode =(e) => {
        e.preventDefault()
        let promoCode = e.target.promoCode.value
        if(this.hashPromoCode(promoCode) === this.coreyBirthdayCode) {
            this.setState({promoCode: true})
            e.target.promoCode.value = ""
        }
    }
    handleCheckout = (e) => {
        e.preventDefault()
        let userId
        let beastsArr = this.props.cart.map(item => {
            return item.beast
        })
        if (this.props.user.id)
          userId = this.props.user.id
        else
          userId = null
        let orderToPost = {
            orderStatus: 'Processing',
            orderDate: (new Date()).toString(),
            shippingAddress: e.target.shippingAddress.value,
            creditCardInfo: e.target.creditCard.value,
            email: e.target.email.value,
            userId: userId,
            cart: this.props.cart,
        }
        axios.post('/api/order', orderToPost)
            .then(res => {
                localStorage.setItem('beastsInCart', '')
                history.push('/ordercomplete')
            })
            .catch(err => console.error(err))
    }

    render() {
        let orderedItems = this.props.cart.sort((a, b) => a.beast.species > b.beast.species)
        let subtotal = 0
        let fixedSubtotal, tax, fixedTax, total, fixedTotal;
        for (let i = 0; i < this.props.cart.length; i++){
            subtotal += parseInt(this.props.cart[i].beast.price * this.props.cart[i].quantity)
        }
        if (subtotal > 0) {
            fixedSubtotal = (subtotal / 100).toFixed(2)
            tax = (fixedSubtotal * 8.875)
            fixedTax = (tax  / 100).toFixed(2)
            total = (+subtotal + +tax)
            fixedTotal = (total / 100).toFixed(2)
        }

        return (
            <div>
                <h3>Items in Cart:</h3>
                {
                    orderedItems.map(item => {
                        return (
                            <li key={item.beast.id}>

                                {
                                    `${item.beast.species} Quantity: ${item.quantity} Price: $${((item.beast.price)/ 100).toFixed(2)} Subtotal: $${((item.beast.price * item.quantity)/ 100).toFixed(2)}`
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
                <h4>PromoCode: </h4>
                {
                    !this.state.promoCode ? `${0}` : `${(-1108 / 100).toFixed(2)}`
                }
                <h4>Total: </h4>
                {
                    !this.state.promoCode ? `$${fixedTotal}` : `${fixedTotal - 11.08}`
                }
                <form onSubmit={(e) => {
                    this.handleCheckout(e)
                }}>
                    Email:
                    <input
                        type="text"
                        name="email"
                        required="required"
                    />
                    Shipping Address:
                    <input
                        type="text"
                        name="shippingAddress"
                        required="required"
                    />
                    Credit Card:
                    <input
                        type="text"
                        name="creditCard"
                        required="required"
                    />
                    <button type="submit">Checkout</button>
                </form>
                <form onSubmit={(e) => {
                    this.handlePromoCode(e)
                }}>
                    Promo Code:
                    <input
                        type="text"
                        name="promoCode"
                    />
                    <button type="submit">Apply</button>
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
