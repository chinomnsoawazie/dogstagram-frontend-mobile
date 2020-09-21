/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';

import {Icon} from 'react-native-ui-kitten';
import {createAppContainer} from 'react-navigation';
import SearchTabNavigator from '../navigation/SearchTabs';

const SearchIndex = createAppContainer(SearchTabNavigator);

const Search = ({navigation}) => {
  const [value, setValue] = useState('');

  return (
    <>
      <TextInput
        style={styles.searchBox}
        placeholder="Search"
        value={value}
        onChangeText={() => setValue()}
      />
      <View style={styles.searchTabs}>
        <Icon name="plus-square-outline" />
        <SearchIndex />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  searchBox: {
    width: '100%',
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#DCDCDC',
    textAlign: 'center',
  },
  searchTabs: {
    backgroundColor: '#DCDCDC',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Search;
