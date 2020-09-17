

const initialState = []
    


const cartItems = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
           
            const existinProduct = state.filter(cartItems=> cartItems.id === action.payload.id)
           if(existinProduct.length > 0) {
               const withoutEP = state.filter(cartItems => cartItems.id !== action.payload.id)
               const updateUnitProduct = {
                   ...existinProduct[0],
                   //qty: existinProduct[0].qty + action.payload.qty,
                   //price: existinProduct[0].price + action.payload.price
               }
                return [...withoutEP, updateUnitProduct]
           }
           return [...state, action.payload]
           
                
        case 'INCREASE':
            state.map((item, i) => {
                 {
                    if (item.id === action.payload.id && item.qty < 10) {
                        item.qty++
                        
                    }
                } 
            })
            return [...state]

            case 'DECREASE':
            state.map((item, i) => {
                 {
                    if (item.id === action.payload.id && item.qty > 1) {
                        
                        item.qty--
                    }
                } 
            })
            return [...state]
           
            

        case 'REMOVE_FROM_CART':
            return state.filter(cartItems=>cartItems.id !== action.payload.id)
        
        case 'CLEAR':
            state = initialState
                
               

            
        

    }
    

    return state
}

export default cartItems