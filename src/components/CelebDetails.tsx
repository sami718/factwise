import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const CelebDetails = ({item}: any) => {
  return (
    <>
      <View style={styles.screenArea}>
        <View>
          <Text style={styles.label}>Age</Text>
          <Text style={styles.value}>{item.dob}</Text>
        </View>
        <View>
          <Text style={styles.label}>Gender</Text>
          <Text style={styles.value}>{item.gender}</Text>
        </View>
        <View>
          <Text style={styles.label}>Country</Text>
          <Text style={styles.value}>{item.country}</Text>
        </View>
      </View>
      <Text style={styles.desc}>Description</Text>
      <Text>{item.description}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  screenArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  label: {fontSize: 14, color: '#36454F'},
  value: {fontSize: 16},
  desc: {fontSize: 16, color: '#36454F', marginTop: 5},
});

export default CelebDetails;
