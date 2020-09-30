/* eslint-disable react-native/no-inline-styles */
/* eslint-disable jsx-quotes */
import React, {useEffect} from 'react';
import {StyleSheet, SafeAreaView, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Avatar, Button} from 'react-native-ui-kitten';
import {resetIsFromFeed} from '../redux/actions';

import ProfileDogs from '../components/ProfileDogs';
const Profile = () => {
  const dispatch = useDispatch();
  const ngrok = 'bb7fcf668b43.ngrok.io';

  //!Dogs
  const dogsFromFeed = useSelector((state) => state.allDogInfo.dogsFromFeed);
  const currentUserDogs = useSelector(
    (state) => state.allDogInfo.currentUserDogs,
  );

  //!Profiles
  const profileFromFeed = useSelector(
    (state) => state.allUserInfo.currentProfile,
  );
  const loggedInUserProfile = useSelector(
    (state) => state.allUserInfo.user.user,
  );

  const isFromFeed = useSelector((state) => state.allDogInfo.isFromFeed);

  useEffect(() => {
    //All useEffect is doing is to use the cleanup stage (equivalent to componentWillUnmout) to reset the isFromFeed property
    return () => {
      resetIsFromFeed(dispatch);
      console.log('leaving profile');
    };
  }, []);

  if (isFromFeed) {
    return (
      <SafeAreaView>
        <View style={styles.root}>
          <View style={(styles.header, styles.bordered)}>
            <Avatar
              source={{
                uri: `https://${ngrok}/${profileFromFeed.photo_url
                  .split('/')
                  .slice(3)
                  .join('/')}`,
              }}
              size="giant"
              style={{width: 100, height: 100}}
            />
            <Text style={styles.text}>{profileFromFeed.handle}</Text>
          </View>

          <View style={styles.bordered}>
            <View Views style={styles.userInfo}>
              <View style={styles.section}>
                <Text style={styles.space}>{profileFromFeed.dogs.length}</Text>
                <Text style={styles.space2}>Dogs</Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.space}>
                  {profileFromFeed.followers.length}
                </Text>
                <Text style={styles.space2}>Followers</Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.space}>0</Text>
                <Text style={styles.space2}>Following</Text>
              </View>
            </View>
          </View>
          {profileFromFeed.id === loggedInUserProfile.id ? (
            <View style={styles.buttons}>
              <Button style={styles.button} appearance="ghost" status="danger">
                CHECK MESSAGE
              </Button>
            </View>
          ) : (
            <View style={styles.buttons}>
              <Button style={styles.button} appearance="ghost" status="danger">
                SEND MESSAGE
              </Button>
            </View>
          )}
        </View>
        <View style={styles.dogsContainer}>
          <ProfileDogs items={dogsFromFeed} />
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView>
        <View style={styles.root}>
          <View style={(styles.header, styles.bordered)}>
            <Avatar
              source={{
                uri: `https://${ngrok}/${loggedInUserProfile.photo_url
                  .split('/')
                  .slice(3)
                  .join('/')}`,
              }}
              size="giant"
              style={{width: 100, height: 100}}
            />
            <Text style={styles.text}>{loggedInUserProfile.handle}</Text>
          </View>

          <View style={styles.bordered}>
            <View Views style={styles.userInfo}>
              <View style={styles.section}>
                <Text style={styles.space}>
                  {loggedInUserProfile.dogs.length}
                </Text>
                <Text style={styles.space2}>Dogs</Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.space}>
                  {loggedInUserProfile.followers.length}
                </Text>
                <Text style={styles.space2}>Followers</Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.space}>0</Text>
                <Text style={styles.space2}>Following</Text>
              </View>
            </View>
          </View>
          <View style={styles.buttons}>
            <Button style={styles.button} appearance="ghost" status="danger">
              CHECK MESSAGE
            </Button>
          </View>
        </View>
        <View style={styles.dogsContainer}>
          <ProfileDogs items={currentUserDogs} />
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#ffffff',
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
