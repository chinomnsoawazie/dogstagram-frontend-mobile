import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Avatar} from 'react-native-ui-kitten';

const DogOwnersResultsScreen = () => {
  const usersFetched = useSelector(
    (state) => state.allUserInfo.userSearchResponse,
  );
  const extractItemKey = (index) => `${index}`;
  const ngrok = 'bb7fcf668b43.ngrok.io';

  const renderItem = ({item, index}) => (
    <>
      <TouchableOpacity
        onPress={() =>
         Alert.alert(
            'This is the action that will lead to personal feed of users dog images',
          )
        }>
        <Avatar
          source={{
            uri: `https://${ngrok}/${item.photo_url
              .split('/')
              .slice(3)
              .join('/')}`,
          }}
          size="giant"
          style={{width: '100%', height: 100, borderRadius: 5}}
        />

        <View style={styles.dogInfo}>
          <View style={styles.section}>
            <Text style={styles.space2}>Handle: </Text>
            <Text style={styles.space}>{item.handle}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.space2}>City: </Text>
            <Text style={styles.space}>{item.city}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );

  return (
    <View style={styles.images}>
      <FlatList
        data={usersFetched}
        numColumns={2}
        keyExtractor={extractItemKey}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  images: {
    flexDirection: 'row',
    paddingHorizontal: 0.5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  section: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: '5%',
  },
  space: {
    color: '#151a30',
    fontWeight: 'bold',
  },
  space2: {
    color: '#aab9b7',
    fontWeight: 'bold',
  },
  dogInfo: {
    flex: 1,
    paddingVertical: 10,
  },
});

export default DogOwnersResultsScreen;
