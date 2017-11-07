import React, { Component } from 'react'
import { connect } from 'react-redux'

class OrderComplete extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <h1>Thank You For Your Order!</h1>
        )
    }
}

const mapState = () => {
    return {}
}

const mapDispatch = () => {
    return {}
}

const OrderCompleteContainer = connect(mapState, mapDispatch)(OrderComplete)
export default OrderCompleteContainer
