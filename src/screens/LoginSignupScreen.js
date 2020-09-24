import React, {useState} from 'react';
import {View, StyleSheet, TextInput, SafeAreaView, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {login} from '../redux/actions';
import Header from '../components/Header';
import Loader from '../animations/Loader';
import {SET_ANIMATION_START} from '../redux/actionTypes';

const LoginSignupScreen = ({navigation}) => {
  const [handle, setHandle] = useState('@handle');
  const [password, setPassword] = useState('password');
  const dispatch = useDispatch();
  const checkIfLoggedIn = useSelector(
    (state) => state.allUserInfo.checkIfLoggedIn,
  );
  const isLoading = useSelector((state) => state.allAnimationInfo.isLoading);

  const handleSubmit = async () => {
    dispatch({type: SET_ANIMATION_START, payload: true});
    let user = {
      handle: handle,
      password: password,
    };
    await login(user, dispatch);
  };

  if (checkIfLoggedIn) {
    navigation.navigate('SignedInUser');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title={'DogStagram'} />
      <Loader loading={isLoading} />
      <View style={styles.formContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="@handle"
          onChangeText={(handleText) => setHandle(handleText)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(passwordText) => setPassword(passwordText)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Log in" onPress={() => handleSubmit()} />
        <Button
          title="Signup"
          onPress={() => navigation.navigate('SignUpScreen')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20%',
  },
  formContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    bottom: 20,
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
  buttonContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default LoginSignupScreen;
