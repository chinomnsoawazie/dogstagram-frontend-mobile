import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
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
  const [name, setName] = useState('name');
  const [handle, setHandle] = useState('handle');
  const [city, setCity] = useState('city');
  const [state, setState] = useState('state');
  const [country, setCountry] = useState('country');
  const [password, setPassword] = useState('password');
  const [confirm, setConfirm] = useState('confirm');
  const [imageFile, setImageFile] = useState('');

  const ngrok = 'bb7fcf668b43.ngrok.io';

  const dispatch = useDispatch();
  const handleCheck = useSelector((state) => state.allUserInfo.handleAvailable);
  const isHandleChecked = useSelector(
    (state) => state.allUserInfo.handleChecked,
  );
  const checkIfCreated = useSelector((state) => state.allUserInfo.created);

  const handleChange = () => {
    checkHandle(handle, dispatch);
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
    <SafeAreaView SafeAreaView style={styles.container}>
      <Text style={styles.headertext}>Signup</Text>
      <ScrollView
        style={styles.scrollview}
        scrollsToTop="true"
        pinchGestureEnabled="true"
        overScrollMode="true">
        <View style={styles.formContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="name"
            onChangeText={(chosenName) => setName(chosenName)}
          />

          <Button
            color="blue"
            title="Upload profile pic"
            onPress={() => selectImage()}
          />

          <Image
            source={{uri: imageFile.uri}}
            style={{width: 100, height: 100, justifyContent: 'center'}}
          />

          <TextInput
            style={styles.textInput}
            placeholder="@handle"
            onChangeText={(handle) => setHandle(handle)}
          />

          <Button
            color="blue"
            title="Check handle availability"
            onPress={() => handleChange()}
          />

          <Text style={{textAlign: 'center'}}>{showHandleChecked()}</Text>

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

          <Text>
            {password === confirm ? 'Passwords match' : 'Password dont match'}
          </Text>
        </View>

        <View style={styles.submitContainer}>
          <Button
            color="blue"
            title="Create account"
            onPress={() => handleSubmit()}
          />

          <Button
            color="brown"
            title="Back to login"
            onPress={() => navigation.navigate('LoginSignupScreen')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffc4b0',
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: Constants.statusBarHeight,
  },
  submitContainer: {
    top: 10,
    paddingHorizontal: 10,
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
    color: 'blue',
    fontSize: 48,
    fontWeight: 'bold',
    marginTop: 30,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
});

export default SignUpScreen;
