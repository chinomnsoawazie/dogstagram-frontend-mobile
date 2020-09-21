import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Icon} from 'react-native-ui-kitten';

import Activity from '../screens/Activity';
import AddDog from '../screens/AddDog';

import {
  FeedNavigator,
  ProfileNavigator,
  SearchNavigator,
} from './StackNavigator';

const TabNavigator = createBottomTabNavigator(
  {
    Feed: {
      screen: FeedNavigator,
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <Icon
            name="home-outline"
            width={32}
            height={32}
            fill={focused ? '#111' : '#939393'}
          />
        ),
      },
    },
    Search: {
      screen: SearchNavigator,
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <Icon
            name="search-outline"
            width={32}
            height={32}
            fill={focused ? '#111' : '#939393'}
          />
        ),
      },
    },
    AddDog: {
      screen: AddDog,
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <Icon
            name="plus-square-outline"
            width={32}
            height={32}
            fill={focused ? '#111' : '#939393'}
          />
        ),
      },
    },
    Activity: {
      screen: Activity,
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <Icon
            name="heart-outline"
            width={32}
            height={32}
            fill={focused ? '#111' : '#939393'}
          />
        ),
      },
    },
    Profile: {
      screen: ProfileNavigator,
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <Icon
            name="person-outline"
            width={32}
            height={32}
            fill={focused ? '#111' : '#939393'}
          />
        ),
      },
    },
  },

  {
    tabBarOptions: {
      showLabel: true,
    },
  },
);

export default createAppContainer(TabNavigator);
