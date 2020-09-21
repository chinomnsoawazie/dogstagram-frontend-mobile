/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View, StyleSheet, TabBarIOS, TextInput} from 'react-native';

import {Icon} from 'react-native-ui-kitten';
import {createAppContainer} from 'react-navigation';
import SearchTabNavigator from '../navigation/SearchTabs';

const SearchIndex = createAppContainer(SearchTabNavigator);

const Search = ({navigation}) => {
  const [value, setValue] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBox}
        placeholder="Search"
        value={value}
        onChangeText={() => setValue()}
      />
      <View style={styles.searchTabs}>
        <Icon name="plus-square-outline" size={28} />
        <SearchIndex />
      </View>
      <View style={styles.searchResults}>
        <Text>Search results</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBox: {
    marginTop: '15%',
    width: '90%',
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#DCDCDC',
    textAlign: 'center',
  },
  searchTabs: {
    justifyContent: 'space-between',
    backgroundColor: '#DCDCDC',
    paddingHorizontal: 18,
    paddingTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },

  searchResults: {
    backgroundColor: '#DCDCDC',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default Search;
