/**
 * Selector to find all quotes of a given project id
 * @param {*} state
 * @param {*} id id of the project
 * @returns quotes array of a given project
 */
export const selectQuotesByProjectId = (state, id) => {
  return state.quoteReducer.quotes.filter(quote => quote.project.id === id);
};