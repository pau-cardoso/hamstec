import Constants from 'expo-constants';
import { showErrorMessage } from '../../components/config/utils';

const {PROD_API} = Constants.expoConfig.extra;

export const fetchQuotes = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(PROD_API + "quote");
      const data = await response.json();
      dispatch({ type: 'FETCH_QUOTES', payload: data });
    } catch (error) {
      console.error(error);
      showErrorMessage();
    }
  };
};

export const addQuote = (quote) => {
  return {
    type: 'ADD_QUOTE',
    payload: quote,
  };
};