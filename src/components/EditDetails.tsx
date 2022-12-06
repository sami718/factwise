import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Pressable} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {getAge} from '../utils/GlobalFunctions';

const EditDetails = ({item, setEditValue, EditCelebrities}: any) => {
  const [celebToUpdate, setCelebritydata] = useState({
    ...item,
    dob: getAge(item.dob),
  });

  const data = [
    {key: '1', value: 'Male'},
    {key: '2', value: 'Female'},
    {key: '3', value: 'Transgender'},
  ];

  return (
    <>
      <View style={styles.screenArea}>
        <View>
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.country}
            onChangeText={val => setCelebritydata({...celebToUpdate, dob: val})}
            value={String(celebToUpdate.dob)}
          />
        </View>
        <View>
          <Text style={styles.label}>Gender</Text>
          <SelectList
            search={false}
            setSelected={(val: any) =>
              setCelebritydata({...celebToUpdate, gender: val})
            }
            data={data}
            save="value"
            defaultOption={
              celebToUpdate.gender === 'male'
                ? data[0]
                : celebToUpdate.gender === 'female'
                ? data[1]
                : data[3]
            }
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
          <View>
            <Text>X</Text>
          </View>
        </Pressable>
        <Pressable
          style={({pressed}) => [
            {opacity: pressed ? 0.5 : 1.0},
            styles.clickButton,
            {borderColor: 'green'},
          ]}
          onPress={() => {
            EditCelebrities(celebToUpdate);
            setEditValue(false);
          }}>
          <View>
            <Text>C</Text>
          </View>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
    marginTop: 7,
  },
  clickButton: {
    width: 20,
    height: 20,
    borderColor: 'red',
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 25,
  },
});

export default EditDetails;
