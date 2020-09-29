import axios from 'axios';
import {Alert} from 'react-native';
import database from '@react-native-firebase/database';
import {
  SET_USER,
  SET_HANDLE_CHECK,
  HANDLE_CHECKED,
  SET_LOGGED_IN_CHECK,
  SET_CURRENT_PROFILE,
  SET_ANIMATION_STOP,
  RESET_CURRENT_PROFILE,
  SET_USER_SEARCH_RESULT,
  SET_CREATED,
  SET_DOGS_SEARCH_RESULT,
  SET_DOGS_FROM_FEED,
  SET_CURRENT_USER_DOGS,
  SET_IS_FROM_FEED,
  SET_USER_PROFILE
} from './actionTypes';

const ngrok = 'bb7fcf668b43.ngrok.io';

//USER STUFF
export const login = async (user, dispatch) => {
  await fetch(`https://${ngrok}/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      handle: user.handle,
      password: user.password,
    }),
  })
    .then((response) => response.json())
    .then((userObj) => {
      if (!userObj.errors) {
        dispatch({type: SET_USER, payload: userObj});
        dispatch({type: SET_LOGGED_IN_CHECK, payload: true});
        dispatch({type: SET_USER_PROFILE, payload: userObj.user});
        dispatch({type: SET_ANIMATION_STOP, payload: false});

        let userDogs = [];
        database()
          .ref('dogs')
          .orderByChild('user_id')
          .equalTo(userObj.user.id)
          .on('child_added', function (snapshot) {
            let returnedDog = [snapshot.val()];
            userDogs.push(returnedDog);
            let finalResult = [].concat.apply([], userDogs);
            dispatch({type: SET_CURRENT_USER_DOGS, payload: finalResult});
          });
      } else {
        Alert.alert(
          'Login Error',
          'Wrong username and/or password. Pls try again or signup if you are a new user',
          [
            {
              text: 'OK',
              onPress: () =>
                dispatch({type: SET_ANIMATION_STOP, payload: false}),
            },
          ],
        );
      }
    })
    .catch((error) => {
      Alert.alert(
        'Connection Error',
        "Sorry, it's not you, it's us. We're experiencing technical difficulty right now. Try again later",
        [
          {
            text: 'OK',
            onPress: () => dispatch({type: SET_ANIMATION_STOP, payload: false}),
          },
        ],
      );
    });
};

export const checkHandle = (handle, dispatch) => {
  axios.get(`http://${ngrok}/users/checkhandle/${handle}`).then((r) => {
    dispatch({type: HANDLE_CHECKED, payload: true});
    dispatch({type: SET_HANDLE_CHECK, payload: r.data});
  });
};

export const signup = (user, dispatch) => {
  fetch(`http://${ngrok}/users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: user.name,
      handle: user.handle,
      city: user.city,
      state: user.state,
      country: user.country,
      password: user.password,
      photo: user.photo,
      file_name: user.file_name,
    }),
  })
    .then((response) => response.json())
    .then((userObj) => {
      Alert.alert('Account successfully created 🎉');
      dispatch({type: SET_CREATED, payload: true});
    })
    .catch((error) => {
      Alert.alert('Unable to create account');
    });
};

export const fetchUser = async (dogUserID, dispatch) => {
  await axios.get(`http://${ngrok}/users/${dogUserID}`).then((fetchedUser) => {
    dispatch({type: SET_CURRENT_PROFILE, payload: fetchedUser.data.user});
  });
};

export const resetCurrentProfile = (dispatch) => {
  dispatch({type: RESET_CURRENT_PROFILE, payload: null});
};

export const searchForUsersFromRailsBackend = async (dispatch, searchTerm) => {
  await axios
    .get(`http://${ngrok}/users/findUsers/${searchTerm}`)
    .then((searchResponse) => {
      dispatch({
        type: SET_USER_SEARCH_RESULT,
        payload: searchResponse.data.searchResponse,
      });
    });
};

export const searchForDogsFromFirebase = (dispatch, searchTerm) => {
  //clear store for a new search
  dispatch({type: SET_DOGS_SEARCH_RESULT, payload: ''});
  let currentDogs = [];
  database()
    .ref('dogs')
    .orderByKey()
    .startAt(`${searchTerm}\uf8ff`)
    .endAt(`${searchTerm}\uf8ff`)
    .on('child_added', function (snapshot) {
      let returnedDog = [snapshot.val()];
      currentDogs.push(returnedDog);
      //this is to flatten the resulting array. Will need to use whatever this is set to in dogReducer
      //as a dependency for the useState in DogsResultsScreen
      let finalResult = [].concat.apply([], currentDogs);
      dispatch({type: SET_DOGS_SEARCH_RESULT, payload: finalResult});
    });
};

export const fetchUserDogs = (dispatch, navigation, user_id) => {
  let userDogs = [];
  database()
    .ref('dogs')
    .orderByChild('user_id')
    .equalTo(user_id)
    .on('child_added', function (snapshot) {
      let returnedDog = [snapshot.val()];
      userDogs.push(returnedDog);
      let finalResult = [].concat.apply([], userDogs);
      dispatch({type: SET_DOGS_FROM_FEED, payload: finalResult});
    });
  //set isFromFeed to be true here by dispatching to it
  navigation.navigate('Profile');
};

export const createBackendDog = (dispatch, dog) => {
  axios
    .post(`http://${ngrok}/dogs`, dog)
    .then((userAfterDogCreation) => {
      dispatch({type: SET_USER, payload: userAfterDogCreation.data});
      dispatch({
        type: SET_CURRENT_PROFILE,
        payload: userAfterDogCreation.data.user,
      });
    })
    .catch((error) => {
      console.log('Error: ', error);
    });
};

export const setIsFromFeed = (dispatch) => {
  dispatch({type: SET_IS_FROM_FEED, payload: true});
};

export const resetIsFromFeed = (dispatch) => {
  dispatch({type: SET_IS_FROM_FEED, payload: false});
};
