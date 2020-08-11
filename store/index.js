import {createStore} from 'redux'
import cartItems from '../reducer/cartItems'

const store = createStore(cartItems)


export default store