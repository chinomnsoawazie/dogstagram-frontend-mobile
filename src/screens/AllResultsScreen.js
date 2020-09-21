import React from 'react';
import {Text, View} from 'react-native';
import {Icon} from 'react-native-ui-kitten';

const AllResultsScreen = () => {
  return (
    <View>
      <Text>All results Screen</Text>
    </View>
  );
};

AllResultsScreen.navigationOptions = {
  tabBarIcon: ({tintColor, focused}) => (
    <Icon name="book-open" width={32} height={32} />
  ),
};
export default AllResultsScreen;
