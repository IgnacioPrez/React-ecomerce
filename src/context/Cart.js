import { createContext, useReducer } from "react";
import cartReducer, { initialState } from "../reducers/cartReducer";

export const CartContext = createContext()

export const Cart =  ({children}) => {
    const [state,dispatch] = useReducer(cartReducer,initialState)

    return(
        
        <CartContext.Provider value={{
            items: state.items,
            setItems:dispatch,
        }}>
            {children}
        </CartContext.Provider>
    )
}