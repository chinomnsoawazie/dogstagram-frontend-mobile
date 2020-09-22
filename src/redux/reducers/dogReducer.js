import {SET_DOGS, SET_DOGS_SEARCH_RESULT} from '../actionTypes';

const initialState = {
  allDogs: [],
  searchResultDogs: '',
};

const dogReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DOGS:
      return {
        ...state,
        allDogs: action.payload,
      };
    case SET_DOGS_SEARCH_RESULT:
      return {
        ...state,
        searchResultDogs: action.payload,
      };

    default:
      return state;
  }
};

export default dogReducer;
