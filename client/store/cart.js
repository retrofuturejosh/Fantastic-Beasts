import axios from 'axios'

//ACTION TYPE
const ADD_TO_CART = 'ADD_TO_CART'
const EDIT_CART = 'EDIT_CART'
const CLEAR_CART = 'CLEAR_CART'

//ACTION CREATOR
const addToCart = beastItem => ({ type: ADD_TO_CART, beastItem })
const editCart = updatedCart => ({type: EDIT_CART, updatedCart})
const clearCart = () => ({ type: CLEAR_CART })

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



export const editCartThunk = (newCartObj) => dispatch => {
    dispatch(clearCart())
    let newStorageString = ''
    for (let beastId in newCartObj){
        newStorageString += beastId + ' : ' + newCartObj[beastId] + ' - '
    }
    newStorageString = newStorageString.slice(0, newStorageString.length - 3)
    localStorage.setItem('beastsInCart', newStorageString)
    let beastsToFetch = Object.keys(newCartObj).map(key => {
        key = parseInt(key)
        if (!isNaN(key)) return key
    })
    let newCart = []
    let promisesArr = beastsToFetch.map(beast => {
        return axios.get(`/api/beasts/${beast}`)
            .then(res => {
                let beastData = res.data
                let beastQuantity = newCartObj[beastData.id][0]
                let item = { beast: beastData, quantity: beastQuantity }
                dispatch(addToCart(item))
            })
    })
}



//REDUCER
export default function (cart = [], action) {
    switch (action.type) {
        case ADD_TO_CART:
            return [...cart, action.beastItem]
        case EDIT_CART:
            return action.updatedCart
        case CLEAR_CART:
            return []
        default:
            return cart
    }
}
