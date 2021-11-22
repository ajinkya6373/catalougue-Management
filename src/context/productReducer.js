
const ProductReducer = (state, action) => {
    switch (action.type) {
        case "SET_PRODUCTS":
            return {
                products: action.payload,
            }
        case "FILTER":
            return {
                products: action.payload,
            }

        default:
            return state;
    }
}

export default ProductReducer;