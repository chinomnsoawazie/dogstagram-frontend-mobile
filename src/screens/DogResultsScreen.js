/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {List} from 'react-native-ui-kitten';
import Loader from '../animations/Loader';

const DogResultsScreen = ({navigation}) => {
  const fecthedDogs = useSelector((state) => state.allDogInfo.searchResultDogs)
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(fecthedDogs);
  }, [fecthedDogs]);

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
        <View style={{flexDirection: 'row', width: '95%'}}>
          <View style={{flexDirection: 'column', width: '15%'}}>
            <Text style={styles.dogDetailTitle}> Name </Text>
            <Text style={styles.dogDetailText}> {item.item.name} </Text>
          </View>

          <View style={{flexDirection: 'column', width: '40%'}}>
            <Text style={styles.dogDetailTitle}> Breed </Text>
            <Text style={styles.dogDetailText}> {item.item.breed} </Text>
          </View>

          <View style={{flexDirection: 'column', width: '8%'}}>
            <Text style={styles.dogDetailTitle}> Age </Text>
            <Text style={styles.dogDetailText}> {item.item.age} </Text>
          </View>

          <View style={{flexDirection: 'column', width: '26%'}}>
            <Text style={styles.dogDetailTitle}> Temparament </Text>
            <Text style={styles.dogDetailText}> {item.item.temparament} </Text>
          </View>

          <View style={{flexDirection: 'column', width: '11%'}}>
            <Text style={styles.dogDetailTitle}> Likes </Text>
            <Text style={styles.dogDetailText}>
              {Object.keys(item.item.likes).length}
            </Text>
          </View>

          {/*add dog comments components here */}
          {/*add dog replies here components here */}
        </View>
      </View>
    </View>
  );

  if (data !== null) {
    return <List data={data} renderItem={renderItem} keyExtractor={data.id} />;
  } else {
    return <Loader />;
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
    fontSize: 12,
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
    fontSize: 11,
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

export default DogResultsScreen;
