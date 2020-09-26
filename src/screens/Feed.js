/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  Alert,
} from 'react-native';
import {Avatar, List} from 'react-native-ui-kitten';
import {useDispatch} from 'react-redux';
import database from '@react-native-firebase/database';
import Loader from '../animations/Loader';
import {fetchUser, fetchUserDogs, setIsFromFeed} from '../redux/actions';
import dogOwnerIcon from '../utils/dogOwnerIcon.png';

const Feed = ({navigation}) => {
  const [data, setData] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      await database()
        .ref('dogs')
        .limitToFirst(10)
        .once('value')
        .then((snapshot) => {
          let allDogs = [];
          let returnedDogs = snapshot.val();
          if (snapshot.val() != null) {
            Object.keys(returnedDogs).forEach(function (thisDog) {
              allDogs.push(returnedDogs[thisDog]);
            });
            setData(allDogs);
            setIsRefreshing(false);
          } else {
            setData(allDogs);
            setIsRefreshing(false);
          }
        });
    }
    fetchData();
  }, [isRefreshing]);

  const handleAvatarTouch = async (dogUserID) => {
    //needed to await the fetchUser process because we were hitting profile before the fectch was complete!
    await fetchUser(dogUserID, dispatch);
    setIsFromFeed(dispatch);
    fetchUserDogs(dispatch, navigation, dogUserID);
  };

  const onRefresh = () => {
    setIsRefreshing(true);
  };

  //ToDo
  //add dog display first three likers.name and an onPress
  //eventListener that will load all likers handles with an
  //eventListener to go to their profile. This should apply to comments
  //and replies too

  const renderItem = (item) => (
    <View style={styles.card}>
      <Image
        source={{
          uri: item.item.photo.uri,
        }}
        style={styles.cardImage}
      />
      <View style={styles.cardHeader}>
        <View style={{flexDirection: 'row', width: '94%'}}>
          <View style={{flexDirection: 'column', width: '10%'}}>
            <Text style={styles.dogDetailTitle}> Name </Text>
            <Text style={styles.dogDetailText}> {item.item.name} </Text>
          </View>

          <View style={{flexDirection: 'column', width: '30%'}}>
            <Text style={styles.dogDetailTitle}> Breed </Text>
            <Text style={styles.dogDetailText}> {item.item.breed} </Text>
          </View>

          <View style={{flexDirection: 'column', width: '8%'}}>
            <Text style={styles.dogDetailTitle}> Age </Text>
            <Text style={styles.dogDetailText}> {item.item.age} </Text>
          </View>

          <View style={{flexDirection: 'column', width: '24%'}}>
            <Text style={styles.dogDetailTitle}> Temparament </Text>
            <Text style={styles.dogDetailText}> {item.item.temparament} </Text>
          </View>

          <View style={{flexDirection: 'column', width: '10%'}}>
            <Text style={styles.dogDetailTitle}> Likes </Text>
            <Text style={styles.dogDetailText}>
              {Object.keys(item.item.likes).length}
            </Text>
          </View>

          <View style={{flexDirection: 'column', width: '18%'}}>
            <Text
              style={styles.dogDetailTitle}
              onPress={() =>
                Alert.alert('This will open the coments and their replies')
              }>
              Comments
            </Text>
            <Text style={styles.dogDetailText}>
              {Object.keys(item.item.comments).length}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => handleAvatarTouch(item.item.user_id)}>
          <Avatar
            source={dogOwnerIcon}
            size="small"
            style={styles.cardAvatar}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (data !== null) {
    return (
      <List
        data={data}
        renderItem={renderItem}
        keyExtractor={data.id}
        refreshing={isRefreshing}
        onRefresh={() => onRefresh()}
      />
    );
  } else {
    return (
      <View>
        <Loader />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff2f2',
    marginBottom: 25,
  },
  cardImage: {
    height: 300,
  },
  cardHeader: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dogDetailTitle: {
    fontWeight: 'bold',
    fontSize: 10,
    color: 'black',
    textAlignVertical: 'center',
    textAlign: 'center',
    textShadowColor: '#585858',
    textShadowOffset: {width: 5, height: 5},
    textShadowRadius: 10,
  },
  dogDetailText: {
    flex: 0.5,
    color: 'brown',
    textAlign: 'center',
    fontSize: 9,
    textAlignVertical: 'center',
    flexWrap: 'wrap',
  },
  cardAvatar: {
    marginRight: 16,
  },
  cardContent: {
    padding: 10,
    borderWidth: 0.25,
    borderColor: '#8F9BB3',
  },
});

export default Feed;
