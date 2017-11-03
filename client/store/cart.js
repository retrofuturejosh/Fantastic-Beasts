import axios from 'axios'

//ACTION TYPE
const ADD_TO_CART = 'ADD_TO_CART'

//ACTION CREATOR
const addToCart = beastItem => ({ type: ADD_TO_CART, beastItem })

//THUNK CREATOR
export const updateCart = (beastId, quantity) => dispatch => {
    axios.get(`/api/beasts/${beastId}`)
        .then(res => {
            let beast = res.data
            let num = Number(quantity)
            if (num === 0) num = 1;
            let beastToAdd = { beast, quantity: num }
            dispatch(addToCart(beastToAdd))
        })
        .catch(err => console.log(err))
}

//REDUCER
export default function (cart = [], action) {
    switch (action.type) {
        case ADD_TO_CART:
            return [...cart, action.beastItem]
        default:
            return cart
    }
}
