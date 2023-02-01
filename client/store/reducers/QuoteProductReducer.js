const initialState = {
  quote_products: [],
};

export const quoteProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_QUOTE_PRODUCT':
      return {
        ...state,
        quote_products: action.payload,
      };
    case 'ADD_QUOTE_PRODUCT':
      return {
        ...state,
        quote_products: [...state.quote_products, action.payload],
      };
    default:
      return state;
  }
};