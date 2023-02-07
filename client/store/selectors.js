/**
 * Selector to find all quotes of a given project id
 * @param {*} state
 * @param {*} id id of the project
 * @returns quotes array of a given project
 */
export const selectQuotesByProjectId = (state, id) => {
  const quotes = (state.quoteReducer.quotes.filter(quote => quote.project.id === id)).sort((a, b) => b.version - a.version);
  return quotes.sort((a, b) => b.authorized - a.authorized);
};

/**
 * Selector to retrieve a quote by a given id
 * @param {*} state
 * @param {*} id id of the quote searched
 * @returns quotes array of a given project
 */
export const selectQuoteById = (state, id) => {
  return state.quoteReducer.quotes.find(quote => quote.id === id);
};

/**
 * Selector to retrieve a project by a given id
 * @param {*} state
 * @param {*} id id of the project searched
 * @returns project with given id
 */
export const selectProjectById = (state, id) => {
  return state.projectReducer.projects.find(project => project.id === id);
};