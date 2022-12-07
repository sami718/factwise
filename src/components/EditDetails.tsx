import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Pressable} from 'react-native';

import {getAge} from '../utils/GlobalFunctions';
import {nameRegex} from '../utils/constant';

import Icon from 'react-native-vector-icons/Octicons';
import {Dropdown} from 'react-native-element-dropdown';
import Toast from 'react-native-toast-message';

const EditDetails = ({item, setEditValue, EditCelebrities}: any) => {
  const [celebToUpdate, setCelebritydata] = useState({
    ...item,
    age: item.age || getAge(item.dob),
  });

  const data = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
    {label: 'Transgender', value: 'Transgender'},
    {label: 'Rather not say', value: 'Rather not say'},
  ];

  return (
    <>
      <View style={styles.screenArea}>
        <View>
          <Text style={styles.label}>Age</Text>
          <TextInput
            keyboardType={'numeric'}
            style={styles.country}
            maxLength={3}
            onChangeText={val => setCelebritydata({...celebToUpdate, age: val})}
            value={String(celebToUpdate.age)}
          />
        </View>
        <View>
          <Text style={styles.label}>Gender</Text>
          <Dropdown
            style={styles.dropdown}
            containerStyle={styles.dropdownContainer}
            itemTextStyle={styles.dropdownText}
            data={data}
            search={false}
            labelField="label"
            valueField="value"
            value={celebToUpdate.gender}
            onChange={val => {
              setCelebritydata({...celebToUpdate, gender: val.value});
            }}
          />
        </View>
        <View>
          <Text style={styles.label}>Country</Text>
          <TextInput
            style={styles.country}
            onChangeText={val =>
              setCelebritydata({...celebToUpdate, country: val})
            }
            value={celebToUpdate.country}
          />
        </View>
      </View>
      <Text style={styles.desc}>Description</Text>
      <TextInput
        multiline={true}
        numberOfLines={10}
        style={styles.descriptionArea}
        onChangeText={val =>
          setCelebritydata({...celebToUpdate, description: val})
        }
        value={celebToUpdate.description}
      />
      <View style={styles.operations}>
        <Pressable
          style={({pressed}) => [
            {opacity: pressed ? 0.5 : 1.0},
            styles.clickButton,
            {marginRight: 15},
          ]}
          onPress={() => setEditValue(false)}>
          <Icon name="x" size={16} color="red" />
        </Pressable>
        <Pressable
          style={({pressed}) => [
            {opacity: pressed ? 0.5 : 1.0},
            styles.clickButton,
            {borderColor: 'green'},
          ]}
          onPress={() => {
            if (!nameRegex.test(celebToUpdate.country)) {
              Toast.show({
                type: 'info',
                text1: 'Country name is not valid',
                position: 'bottom',
              });
              return true;
            }
            EditCelebrities(celebToUpdate);
            if (
              celebToUpdate.age &&
              celebToUpdate.country &&
              celebToUpdate.description
            ) {
              setEditValue(false);
            }
          }}>
          <Icon name="check" size={16} color="green" />
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    marginTop: 6,
    height: 30,
    width: 100,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  dropdownContainer: {width: 130, marginLeft: -10},
  dropdownText: {fontSize: 14},
  screenArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {fontSize: 14, color: '#36454F'},
  value: {fontSize: 16},
  desc: {fontSize: 16, color: '#36454F', marginBottom: 5},
  country: {
    height: 30,
    borderRadius: 10,
    width: 90,
    paddingHorizontal: 2,
    paddingLeft: 5,
    borderWidth: StyleSheet.hairlineWidth,
    marginTop: 5,
  },
  descriptionArea: {
    width: '100%',
    padding: 10,
    borderWidth: StyleSheet.hairlineWidth,
    height: 90,
    borderRadius: 10,
  },
  operations: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 17,
  },
  clickButton: {
    width: 20,
    height: 20,
    borderColor: 'red',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
});

export default EditDetails;
