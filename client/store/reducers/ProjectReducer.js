const initialState = {
  projects: [],
};

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PROJECTS':
      return {
        ...state,
        projects: action.payload,
      };
    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    default:
      return state;
  }
};