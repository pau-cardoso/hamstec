import Constants from 'expo-constants';
import { showErrorMessage } from '../../components/config/utils';

const {PROD_API} = Constants.expoConfig.extra;

export const fetchProjects = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(PROD_API + "project");
      const data = await response.json();
      dispatch({ type: 'FETCH_PROJECTS', payload: data });
    } catch (error) {
      console.error(error);
      showErrorMessage();
    }
  };
};

export const addProject = (project) => {
  return {
    type: 'ADD_PROJECT',
    payload: project,
  };
};