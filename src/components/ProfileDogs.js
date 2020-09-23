import React from 'react';
import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
const itemSize = (Dimensions.get('window').width - 12) / 3;

const ProfileDogs = (props) => {
  const {items} = props;
  const extractItemKey = (index) => `${index}`;

  const renderItem = ({item, index}) => (
    <>
      <TouchableOpacity
        onPress={() =>
          Alert.alert(
            'This is the action that will lead to personal feed of users dog images',
          )
        }>
        <Image style={styles.image} source={item.photo} />
        <View style={styles.dogInfo}>
          <View style={styles.section}>
            <Text style={styles.space}>{Object.keys(item.likes).length}</Text>
            <Text style={styles.space2}>likes</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.space}>
              {Object.keys(item.comments).length}
            </Text>
            <Text
              style={styles.space2}
              onPress={() => Alert.alert('this is where comments live')}>
              comments
            </Text>
          </View>
        </View>
        {/**add dog detials like comments, likes and comment replies here */}
      </TouchableOpacity>
    </>
  );

  return (
    <View style={styles.images}>
      <FlatList
        data={items}
        numColumns={3}
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
  image: {
    width: itemSize,
    height: itemSize,
    margin: 1.5,
  },
});

export default ProfileDogs;
