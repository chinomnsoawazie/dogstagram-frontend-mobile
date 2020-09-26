/* eslint-disable react-native/no-inline-styles */
/* eslint-disable jsx-quotes */
import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Avatar, Button} from 'react-native-ui-kitten';
import {resetIsFromFeed} from '../redux/actions';

import ProfileDogs from '../components/ProfileDogs';
const Profile = ({navigation}) => {
  //TODO
  const dogsFromFeed = useSelector((state) => state.allDogInfo.dogsFromFeed);
  const currentUserDogs = useSelector(
    (state) => state.allDogInfo.currentUserDogs,
  );
  const isFromFeed = useSelector((state) => state.allDogInfo.isFromFeed);
  const profile = useSelector((state) => state.allUserInfo.currentProfile);
  const dispatch = useDispatch();
  const ngrok = 'bb7fcf668b43.ngrok.io';
  const checkIfLoggedIn = useSelector(
    (state) => state.allUserInfo.checkIfLoggedIn,
  );
  const [dogsAreFromFeed, setDogsAreFromFeed] = useState('');

  useEffect(() => {
    if (isFromFeed) {
      setDogsAreFromFeed(dogsFromFeed);
      console.log('entering profile');
    }
    return () => {
      resetIsFromFeed(dispatch);
      console.log('leaving profile');
    };
  }, []);

  const handleLogout = () => {
    navigation.navigate('LoginSignupScreen');
  };

  if (checkIfLoggedIn === false) {
    navigation.navigate('LoginSignupScreen');
  }

  return (
    <SafeAreaView>
      <View style={styles.root}>
        <View style={(styles.header, styles.bordered)}>
          <Avatar
            source={{
              uri: `https://${ngrok}/${profile.photo_url
                .split('/')
                .slice(3)
                .join('/')}`,
            }}
            size="giant"
            style={{width: 100, height: 100}}
          />
          <Text style={styles.text}>{profile.handle}</Text>
        </View>

        <View style={styles.bordered}>
          <View Views style={styles.userInfo}>
            <View style={styles.section}>
              <Text style={styles.space}>{profile.dogs.length}</Text>
              <Text style={styles.space2}>Dogs</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.space}>{profile.followers.length}</Text>
              <Text style={styles.space2}>Followers</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.space}>0</Text>
              <Text style={styles.space2}>Following</Text>
            </View>
          </View>
        </View>
        {isFromFeed ? null : (
          <View style={styles.buttons}>
            <Button
              style={styles.button}
              appearance="ghost"
              status="danger"
              onPress={() => handleLogout()}>
              LOGOUT
            </Button>

            <View style={styles.separator} />

            <Button style={styles.button} appearance="ghost" status="danger">
              MESSAGE
            </Button>
          </View>
        )}
      </View>
      <View style={styles.dogsContainer}>
        <ProfileDogs items={isFromFeed ? dogsAreFromFeed : currentUserDogs} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#ffffff',
    // marginTop: 10,
  },
  header: {
    alignItems: 'center',
    paddingTop: 25,
    paddingBottom: 17,
  },
  userInfo: {
    flexDirection: 'row',
    paddingVertical: 18,
  },
  bordered: {
    borderBottomWidth: 1,
    borderColor: '#e4e9f2',
    alignItems: 'center',
  },
  section: {
    alignItems: 'center',
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
  separator: {
    backgroundColor: '#e4e9f2',
    alignSelf: 'center',
    flexDirection: 'row',
    flex: 0,
    width: 1,
    height: 42,
  },
  buttons: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  button: {
    flex: 1,
    alignSelf: 'center',
  },
  text: {
    color: '#151a30',
    fontWeight: 'bold',
  },
});

export default Profile;
