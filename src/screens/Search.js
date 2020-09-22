/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {Button} from 'react-native-ui-kitten';

import {Icon} from 'react-native-ui-kitten';
import {createAppContainer} from 'react-navigation';
import {useDispatch} from 'react-redux';
import SearchTabNavigator from '../navigation/SearchTabs';
import {
  searchForDogsFromFirebase,
  searchForUsersFromRailsBackend,
} from '../redux/actions';

const SearchIndex = createAppContainer(SearchTabNavigator);

const Search = ({navigation}) => {
  const dispatch = useDispatch()
  const [value, setValue] = useState('');

  const handleSearch = () => {
    searchForUsersFromRailsBackend(dispatch, value);
    searchForDogsFromFirebase(dispatch, value);
  };

  return (
    <>
      <TextInput
        style={styles.searchBox}
        placeholder="Type search terms here"
        value={value}
        onChangeText={(searchTerm) => setValue(searchTerm)}
      />
      <Button style={styles.button} onPress={() => handleSearch()}>Search</Button>

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
  button: {
    alignItems: 'center',
    padding: 10,
    fontWeight: "bold",
  },
});

export default Search;
