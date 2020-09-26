/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Button} from 'react-native-ui-kitten';
import ImagePicker from 'react-native-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import {Icon} from 'react-native-ui-kitten';
import database from '@react-native-firebase/database';
import {v4 as uuidv4} from 'uuid';

import {dogBreeds} from '../components/DogBreeds';
import {range} from '../utils/HandyTools';
import {useDispatch, useSelector} from 'react-redux';
import {createBackendDog} from '../redux/actions';

const AddDog = ({navigation}) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState(null);
  const [breed, setBreed] = useState('none chosen yet');
  const [age, setAge] = useState('no selection yet');
  const [temparament, setTemparament] = useState('no selection yet');
  const user_id = useSelector((state) => state.allUserInfo.user.user.id);
  const dispatch = useDispatch();
  const [userID, setUserID] = useState('');

  useEffect(() => {
    setUserID(user_id);
  }, [user_id]);

  const selectImage = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        Alert.alert(
          'Image Selection Cancel',
          'You cancelled picking an image',
          [{text: 'OK'}],
        );
      } else if (response.error) {
        Alert.alert('Error', response.error, [{text: 'OK'}]);
      } else if (response.customButton) {
        Alert.alert('Error', response.customButton, [{text: 'OK'}]);
      } else {
        const source = {uri: response.uri};
        setImage(source);
      }
    });
  };

  const resetStates = () => {
    setImage(null);
    setName(null);
    setBreed('none chosen yet');
    setAge('no selection yet');
    setTemparament('no selection yet');
  };

  const goToProfile = () => {
    resetStates();
    navigation.navigate('Profile');
  };

  const goToFeed = () => {
    resetStates();
    navigation.navigate('Feed');
  };

  const onSubmit = () => {
    if (image === null) {
      return Alert.alert('No dog image attached. Please attach an image');
    } else if (name === null) {
      return Alert.alert('No dog name. Please give it a name');
    } else if (breed === 'none chosen yet') {
      return Alert.alert('No breed selected. Please selecte a breed');
    } else if (age === 'no selection yet') {
      return Alert.alert("No dog age. Please select dog's age");
    } else if (temparament === 'no selection yet') {
      return Alert.alert(
        'No temparament selected. Please chose dog temparament',
      );
    }

    const id = uuidv4();
    const dogForUpload = {
      id: id,
      user_id: userID,
      name: name,
      breed: breed,
      age: age,
      temparament: temparament,
      photo: image,
      likes: '',
      comments: '',
    };

    database()
      .ref('dogs/' + dogForUpload.name)
      .set(dogForUpload, function (error) {
        if (error) {
          Alert.alert('Error', error, [
            {
              text: 'OK',
            },
          ]);
        }
      })
      .then(() =>
        Alert.alert('Upload Result', 'Successfully shared dog', [
          {
            text: 'Feed',
            onPress: () => goToFeed(),
          },
          {
            text: 'Share another dog',
            onPress: () => resetStates(),
          },
          {
            text: 'Go To Profile',
            onPress: () => goToProfile(),
          },
        ]),
      );

    let dogForBackend = {
      user_id: userID,
      name: name,
      breed: breed,
      age: age,
      temparament: temparament,
    };

    createBackendDog(dispatch, dogForBackend);
  };

  //Placeholders
  const breedPlaceholder = {
    label: 'Select dog breed...',
    value: breed,
    color: '#9EA0A4',
  };

  const agePlaceholder = {
    label: 'Select dog age...',
    value: age,
    color: '#9EA0A4',
  };

  const temparamentPlaceholder = {
    label: 'Select dog temparament...',
    value: temparament,
    color: '#9EA0A4',
  };

  //Icon stuff
  const dropDownIcon = () => {
    return (
      <Icon
        name="arrowhead-down-outline"
        width={32}
        height={32}
        fill="#939393"
      />
    );
  };

  //Data
  const dogs = dogBreeds.sort().map((dog) => {
    return {
      label: dog,
      value: dog,
      color: 'black',
    };
  });

  const dogAges = [...range(1, 30)].map((thisAge) => {
    return {
      label: `${thisAge}`,
      value: thisAge,
      color: 'black',
    };
  });

  const dogTemparaments = [
    {
      label: 'Assertive/Aggressive',
      value: 'Assertive/Aggressive',
      color: 'black',
    },
    {
      label: 'Neutral',
      value: 'Neutral',
      color: 'black',
    },
    {
      label: 'Passive',
      value: 'Passive',
      color: 'black',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Image Container */}
      <View style={styles.imageContainer}>
        {image ? (
          <>
            <Image source={image} style={styles.image} />
            <Button onPress={() => selectImage()} style={styles.buttons}>
              Change dog image
            </Button>
          </>
        ) : (
          <Button onPress={() => selectImage()} style={styles.buttons}>
            Add dog image
          </Button>
        )}
      </View>

      {/* header */}
      <Text style={{fontWeight: 'bold', fontSize: 40, color: 'white'}}>
        Dog Details
      </Text>

      {/* details container  */}
      <ScrollView>
        {/*Dog name input*/}
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text style={styles.selectedTitle}> Chosen name: </Text>
          <Text style={styles.selectedOption}> {name} </Text>
        </View>
        <View
          style={{
            marginTop: 5,
            marginLeft: 10,
            alignItems: 'center',
            width: 300,
          }}>
          <TextInput
            placeholder="Type in unique dog name"
            style={styles.textInput}
            value={name}
            maxLength={8}
            onChangeText={(nameText) => setName(nameText)}
          />
        </View>

        {/* Select dog breed */}
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.selectedTitle}>Selected breed:</Text>
          <Text style={styles.selectedOption}>{breed}</Text>
        </View>
        <View>
          <RNPickerSelect
            placeholder={breedPlaceholder}
            items={dogs}
            value={breed}
            onValueChange={(value) => setBreed(value)}
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 10,
                right: 12,
              },
            }}
            useNativeAndroidPickerStyle={false}
            Icon={dropDownIcon}
          />
        </View>

        {/* Select dog age */}
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.selectedTitle}> Selected age: </Text>
          <Text style={styles.selectedOption}> {age} </Text>
        </View>

        <View>
          <RNPickerSelect
            placeholder={agePlaceholder}
            items={dogAges}
            value={age}
            onValueChange={(value) => setAge(value)}
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 10,
                right: 12,
              },
            }}
            useNativeAndroidPickerStyle={false}
            Icon={dropDownIcon}
          />
        </View>

        {/* Select dog temparament */}
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.selectedTitle}> Temparament: </Text>
          <Text style={styles.selectedOption}> {temparament} </Text>
        </View>

        <View>
          <RNPickerSelect
            placeholder={temparamentPlaceholder}
            items={dogTemparaments}
            value={temparament}
            onValueChange={(value) => setTemparament(value)}
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 10,
                right: 12,
              },
            }}
            useNativeAndroidPickerStyle={false}
            Icon={dropDownIcon}
          />
        </View>

        <View style={{alignItems: 'center', marginTop: 10, marginBottom: 50}}>
          <Button
            size="large"
            appearance="filled"
            status="success"
            // accessoryLeft={StarIcon}
            onPress={() => onSubmit()}>
            Share
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  buttons: {
    alignItems: 'center',
    padding: 10,
    margin: 30,
    marginTop: 1,
  },
  textInput: {
    marginTop: 5,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: '#DCDCDC',
    textAlign: 'center',
  },
  header: {},
  pickerContainer: {
    flexDirection: 'row',
    textAlign: 'center',
    alignContent: 'center',
  },
  picker: {
    height: 30,
    width: 200,
    opacity: 3,
    backgroundColor: 'white',
    color: 'red',
  },
  selectedTitle: {
    width: 120,
    height: 30,
    fontWeight: 'bold',
    color: 'white',
    textAlignVertical: 'center',
    marginTop: 10,
  },
  selectedOption: {
    width: 210,
    height: 30,
    color: '#B2CC33',
    textAlignVertical: 'center',
    marginTop: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default AddDog;
