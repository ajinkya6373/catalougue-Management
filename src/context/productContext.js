import {createContext,useReducer,useContext}from 'react'
import ProductReducer from "./productReducer"
const INITIAL_STATE = {
    products:[],
  };

export const ProductContext = createContext();

export const ProductContextProvider =({children})=> {
    return (
        <ProductContext.Provider value={useReducer(ProductReducer,INITIAL_STATE)}>
            {children}
        </ProductContext.Provider>
    )
}
export const useStateValue = ()=> useContext(ProductContext)