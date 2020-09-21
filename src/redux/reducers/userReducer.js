import {
  SET_USER,
  SET_HANDLE_CHECK,
  HANDLE_CHECKED,
  SET_PROFILE_PICTURE,
  SET_LOGGED_IN_CHECK,
  SET_CURRENT_PROFILE,
  RESET_CURRENT_PROFILE,
  LOGOUT, SET_USER_SEARCH_RESULT, SET_CREATED
} from '../actionTypes';

const initialState = {
  user: '',
  handleAvailable: '',
  handleChecked: '',
  profilePicForUpload: '',
  checkIfLoggedIn: false,
  currentProfile: null,
  user_id: '',
  userSearchResponse: '',
  created: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case SET_HANDLE_CHECK:
      return {
        ...state,
        handleAvailable: action.payload,
      };

    case HANDLE_CHECKED:
      return {
        ...state,
        handleChecked: action.payload,
      };
    case SET_PROFILE_PICTURE:
      return {
        ...state,
        profilePicForUpload: action.payload,
      };
    case SET_LOGGED_IN_CHECK:
      return {
        ...state,
        checkIfLoggedIn: action.payload,
      };
    case SET_CURRENT_PROFILE:
      return {
        ...state,
        currentProfile: action.payload,
      };
    case RESET_CURRENT_PROFILE:
      return {
        ...state,
        currentProfile: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: '',
        handleAvailable: '',
        handleChecked: '',
        profilePicForUpload: '',
        checkIfLoggedIn: false,
        currentProfile: '',
        user_id: '',
        userSearchResponse: '',
        created: false,
      };
    case SET_USER_SEARCH_RESULT:
      return {
        ...state,
        userSearchResponse: action.payload,
      };
    case SET_CREATED:
      return {
        ...state,
        created: action.payload,
      }

    default:
      return state;
  }
};

export default userReducer;
