import axios from 'axios'

//ACTION TYPE
const ADD_TO_CART = 'ADD_TO_CART'

//ACTION CREATOR
const addToCart = beast => ({type: ADD_TO_CART, beast})

//THUNK CREATOR
export const updateCart = (beastId) => dispatch => {
    axios.get(`/api/beasts/${beastId}`)
        .then(res => dispatch(addToCart(res.data)))
        .catch(err => console.log(err))
}

//REDUCER
export default function (cart = [], action){
    switch (action.type) {
        case ADD_TO_CART:
            return [...cart, action.beast]
        default:
            return cart
    }
}