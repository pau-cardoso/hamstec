const initialState = {
  quotes: [],
};

export const quoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_QUOTES':
      return {
        ...state,
        quotes: action.payload,
      };
    case 'ADD_QUOTE':
      return {
        ...state,
        quotes: [...state.quotes, action.payload],
      };
    default:
      return state;
  }
};