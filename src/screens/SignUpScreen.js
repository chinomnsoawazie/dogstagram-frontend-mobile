/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  Button,
  Alert,
  Platform,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {signup, checkHandle} from '../redux/actions';
import ImagePicker from 'react-native-image-picker';
function SignUpScreen({navigation}) {
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('confirm');
  const [imageFile, setImageFile] = useState('');

  const ngrok = 'bb7fcf668b43.ngrok.io';

  const dispatch = useDispatch();
  const handleCheck = useSelector((state) => state.allUserInfo.handleAvailable);
  const isHandleChecked = useSelector(
    (state) => state.allUserInfo.handleChecked,
  );
  const checkIfCreated = useSelector((state) => state.allUserInfo.created);

  const handleHandleCheck = () => {
    if (handle) {
      checkHandle(handle, dispatch);
    } else {
      Alert.alert('Please chose a handle');
    }
  };

  const handleSubmit = async () => {
    const photoData = createFormData(imageFile);
    let user = {
      name: name,
      handle: handle,
      city: city,
      state: state,
      country: country,
      photo: imageFile.data,
      file_name: photoData._parts[[0]][1].name,
      password: password,
    };

    if (!handleCheck) {
      return Alert.alert(
        'Username Check',
        'Please check if username is available',
        [
          {
            text: 'OK',
          },
        ],
      );
    } else if (password !== confirm) {
      return Alert.alert('Username Check', "Passwords don't match", [
        {
          text: 'OK',
        },
      ]);
    }

    signup(user, dispatch);
  };

  if (checkIfCreated) {
    navigation.navigate('LoginSignupScreen');
  }

  const showHandleChecked = () => {
    if (isHandleChecked) {
      return handleCheck ? 'Available' : 'Not available';
    }
  };

  const selectImage = () => {
    const options = {
      noData: false,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        Alert.alert(
          'Image Selection Cancel',
          'You cancelled picking an image',
          [
            {
              text: 'OK',
            },
          ],
        );
      } else if (response.error) {
        Alert.alert('Error', response.error, [
          {
            text: 'OK',
          },
        ]);
      } else if (response.customButton) {
        Alert.alert('Error', response.customButton, [
          {
            text: 'OK',
          },
        ]);
      } else {
        setImageFile(response);
      }
    });
  };

  const createFormData = (photo) => {
    const data = new FormData();
    const photoSplit = photo.uri.split('.');
    const file_name = name + 'ProfilePic.' + photoSplit[photoSplit.length - 1];

    data.append('photo', {
      name: file_name,
      type: photo.type,
      uri:
        Platform.OS === 'android' ? photo.uri : photo.uri.replace('file:', ''),

      // : photo.uri.replace('file://', ''),
    });

    return data;
  };

  return (
    <View
      style={
        imageFile && confirm !== password ? styles.container2 : styles.container
      }>
      <Text style={styles.headertext}>Signup</Text>
      <View style={styles.scrollview}>
        <ScrollView
          // scrollsToTop="true"
          pinchGestureEnabled="true"
          overScrollMode="true">
          <View style={styles.formContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="name"
              onChangeText={(chosenName) => setName(chosenName)}
            />

            {imageFile ? 
              <Button
                color="white"
                title="Change profile pic"
                onPress={() => selectImage()}
              />
            :
              <Button
                color="white"
                title="Select profile pic"
                onPress={() => selectImage()}
              />
          }


            <Image
              source={{uri: imageFile.uri}}
              style={{
                width: 100,
                height: 100,
                alignSelf: 'center',
                justifyContent: 'center',
              }}
            />

            <TextInput
              style={styles.textInput}
              placeholder="@handle"
              onChangeText={(chosenHandle) => setHandle(chosenHandle)}
            />

            <Button
              color="white"
              title="Check handle availability"
              onPress={() => handleHandleCheck()}
            />

            <Text style={{textAlign: 'center', color: 'white'}}>{showHandleChecked()}</Text>

            <TextInput
              style={styles.textInput}
              placeholder="city"
              onChangeText={(city) => setCity(city)}
            />
            <TextInput
              style={styles.textInput}
              placeholder="state"
              onChangeText={(state) => setState(state)}
            />
            <TextInput
              style={styles.textInput}
              placeholder="country"
              onChangeText={(country) => setCountry(country)}
            />

            <TextInput
              style={styles.textInput}
              placeholder="password"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
            <TextInput
              style={styles.textInput}
              placeholder="confirm password"
              secureTextEntry={true}
              onChangeText={(confirm) => setConfirm(confirm)}
            />
            <Text style={{color: 'white', alignSelf: 'center'}}>
              {password === confirm
                ? 'Passwords match'
                : "Passwords don't match"}
            </Text>
          </View>

          <View style={styles.submitContainer}>
            <Button
              color="white"
              title="Create account"
              onPress={() => handleSubmit()}
            />

            <Button
              color="white"
              title="Back to login"
              onPress={() => navigation.navigate('LoginSignupScreen')}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '25%',
  },
  container2: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '25%',
    marginBottom: '100%',
  },
  submitContainer: {
    alignSelf: 'center',
    marginBottom: 30,
    flexDirection: 'row',
  },
  textInput: {
    marginTop: 20,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: '#DCDCDC',
    textAlign: 'center',
  },
  headertext: {
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
    marginTop: '12%',
  },
  scrollView: {
    backgroundColor: 'blue',
    marginHorizontal: 20,
    marginBottom: '60',
  },
});

export default SignUpScreen;
