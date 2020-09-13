import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginSignupScreen from '../screens/LoginSignupScreen';
import SignedInUserScreen from '../screens/SignedInUserScreen';
import Profile from '../screens/Profile';
import AddDog from '../screens/AddDog';
import Feed from '../screens/Feed';
import Activity from '../screens/Activity';
import Search from '../screens/Search';
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        mode="modal"
        headerMode="none"
        screenOptions={{
          cardStyle: {
            backgroundColor: 'blue',
          },
          cardOverlayEnabled: true,
          cardStyleInterpolator: ({current: {progress}}) => ({
            cardStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 0.5, 0.9, 1],
                outputRange: [0, 0.25, 0.7, 1],
              }),
            },
            overlayStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
                extrapolate: 'clamp',
              }),
            },
          }),
        }}>
        <Stack.Screen name="LoginSignupScreen" component={LoginSignupScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="SignedInUser" component={SignedInUserScreen} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="AddDog" component={AddDog} />
        <Stack.Screen name="Feed" component={Feed} />
        <Stack.Screen name="Activity" component={Activity} />
        <Stack.Screen name="Search" component={Search} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
