import {
  SET_CURRENT_USER_DOGS,
  SET_DOGS,
  SET_DOGS_FROM_FEED,
  SET_DOGS_SEARCH_RESULT,
  SET_IS_FROM_FEED,
} from '../actionTypes';

const initialState = {
  allDogs: [],
  searchResultDogs: '',
  dogsFromFeed: [],
  currentUserDogs: [],
  isFromFeed: false,
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

    case SET_DOGS_FROM_FEED:
      return {
        ...state,
        dogsFromFeed: action.payload,
      };

    case SET_CURRENT_USER_DOGS:
      return {
        ...state,
        currentUserDogs: action.payload,
      };

    case SET_IS_FROM_FEED:
      return {
        ...state,
        isFromFeed: action.payload,
      };

    default:
      return state;
  }
};

export default dogReducer;
