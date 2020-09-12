/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {StatusBar} from 'react-native';
import {mapping, light} from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from 'react-native-ui-kitten';
import {EvaIconsPack} from '@ui-kitten/eva-icons';


import AppNavigator from './src/navigation/AppNavigator';

//Reducers
import userReducer from './src/redux/reducers/userReducer';
import dogReducer from './src/redux/reducers/dogReducer';
import animationsReducer from './src/redux/reducers/animationsReducer';

//create CombineReducer
const rootReducer = combineReducers({
  allUserInfo: userReducer,
  allDogInfo: dogReducer,
  allAnimationInfo: animationsReducer,
});

//crete store
const storeObj = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={light}>
        <Provider store={storeObj}>
          <AppNavigator />
        </Provider>
      </ApplicationProvider>
    </>
  );
}
