import React, {useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import Collapsible from './src/components/Collapsible';

import celebrities from './src/mockData/celebrities';
import DeleteBox from './src/components/DeleteBox';
import Toast from 'react-native-toast-message';

const App = () => {
  const [celebritiesData, setCelebritiesData] = useState<any>(celebrities);
  const [modalVisible, setModalVisible] = useState({
    isModalVisible: false,
    selectedCeleb: null,
  });

  const deleteCelebrities = () => {
    let index = celebrities.findIndex(
      (celebrity: any) => celebrity.id === modalVisible.selectedCeleb.id,
    );
    celebritiesData.splice(index, 1);
    setCelebritiesData([...celebritiesData]);
    setModalVisible({isModalVisible: false, selectedCeleb: null});
    Toast.show({
      type: 'success',
      text1: 'Celebrity Details Deleted Successfully!',
      position: 'bottom',
    });
  };

  const EditCelebrities = (updatedCelebrityValue: any) => {
    let index = celebrities.findIndex(
      (celebrity: any) => celebrity.id === updatedCelebrityValue.id,
    );
    celebritiesData[index] = updatedCelebrityValue;
    setCelebritiesData([...celebritiesData]);
    Toast.show({
      type: 'success',
      text1: 'Celebrity Details Updated Successfully!',
      position: 'bottom',
    });
  };

  const renderItem = ({item}: any) => (
    <Collapsible
      item={item}
      setModalVisible={(value: boolean) =>
        setModalVisible({isModalVisible: value, selectedCeleb: item})
      }
      EditCelebrities={(updatedValue: any) => EditCelebrities(updatedValue)}
    />
  );

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <FlatList
        data={celebritiesData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listView}
      />
      <DeleteBox
        modalVisible={modalVisible.isModalVisible}
        deleteCelebrities={() => deleteCelebrities()}
        setModalVisible={() =>
          setModalVisible({
            isModalVisible: false,
            selectedCeleb: null,
          })
        }
      />
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginVertical: 32,
  },
  listView: {paddingHorizontal: 20},
});

export default App;
