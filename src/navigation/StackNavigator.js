import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Feed from '../screens/Feed';
import Profile from '../screens/Profile';
import Search from '../screens/Search';

export const FeedNavigator = createAppContainer(
  createStackNavigator({
    Feed: {
      screen: Feed,
      navigationOptions: {
        headerTitle: 'Feed',
        headerTitleAlign: 'center',
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        headerTitle: 'Dog Owner',
        headerTitleAlign: 'center',
      },
    },
  }),
);

export const ProfileNavigator = createAppContainer(
  createStackNavigator({
    Profile: {
      screen: Profile,
      navigationOptions: {
        headerTitle: 'My Profile',
        headerTitleAlign: 'center',
      },
    },
  }),
);

export const SearchNavigator = createAppContainer(
  createStackNavigator({
    Search: {
      screen: Search,
      navigationOptions: {
        headerTitle: 'Dogs & Owners Search',
        headerTitleAlign: 'center',
      },
    },
  }),
);
