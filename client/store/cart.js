import axios from 'axios'

//ACTION TYPE
const ADD_TO_CART = 'ADD_TO_CART'

//ACTION CREATOR
const addToCart = beastItem => ({ type: ADD_TO_CART, beastItem })

//THUNK CREATOR
export const updateCart = (beastId, quantity, storeCheck) => dispatch => {
    axios.get(`/api/beasts/${beastId}`)
        .then(res => {
            let beast = res.data
            let num = Number(quantity)
            if (num === 0) num = 1;
            let beastToAdd = { beast, quantity: num }

            if (storeCheck) {
                dispatch(addToCart(beastToAdd))
            } else {
                let addToStorage = beast.id + ' : ' + num
                let currentStorage = localStorage.getItem('beastsInCart')
                if (!currentStorage) localStorage.setItem('beastsInCart', addToStorage)
                else localStorage.setItem('beastsInCart', currentStorage + ' - ' + addToStorage)
                dispatch(addToCart(beastToAdd))
            }
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
