import React, {useState} from 'react';
import {
  FlatList,
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from 'react-native';
import Collapsible from './src/components/Collapsible';

import celebrities from './src/mockData/celebrities';
import DeleteBox from './src/components/DeleteBox';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/EvilIcons';

const App = () => {
  const [celebritiesData, setCelebritiesData] = useState<any>(celebrities);
  const [searchText, setSearchText] = useState<string>('');
  const [modalVisible, setModalVisible] = useState({
    isModalVisible: false,
    selectedCeleb: null,
  });

  const showToast = (message: string, type?: string) => {
    Toast.show({
      type: type || 'success',
      text1: message,
      position: 'bottom',
      visibilityTime: 1500,
    });
  };

  const deleteCelebrities = () => {
    let index = celebritiesData.findIndex(
      (celebrity: any) => celebrity.id === modalVisible.selectedCeleb.id,
    );
    celebritiesData.splice(index, 1);
    setCelebritiesData([...celebritiesData]);
    setModalVisible({isModalVisible: false, selectedCeleb: null});
    showToast('Celebrity Details Deleted Successfully!');
  };

  const EditCelebrities = (updatedCelebrityValue: any) => {
    if (
      updatedCelebrityValue.age &&
      updatedCelebrityValue.country &&
      updatedCelebrityValue.description
    ) {
      let index = celebrities.findIndex(
        (celebrity: any) => celebrity.id === updatedCelebrityValue.id,
      );
      celebritiesData[index] = updatedCelebrityValue;
      setCelebritiesData([...celebritiesData]);
      showToast('Celebrity Details Updated Successfully!');
    } else {
      showToast('Add all required details', 'info');
    }
  };

  const renderItem = ({item}: any) => {
    if (
      item.first.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
      item.last.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
    ) {
      return (
        <Collapsible
          item={item}
          setModalVisible={(value: boolean) =>
            setModalVisible({isModalVisible: value, selectedCeleb: item})
          }
          EditCelebrities={(updatedValue: any) => EditCelebrities(updatedValue)}
        />
      );
    }
    return <></>;
  };

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <View style={styles.searchContainer}>
        <Icon
          name="search"
          style={styles.searchIcon}
          size={20}
          color={'black'}
        />
        <TextInput
          placeholder="Search user by first name or last name"
          style={styles.textarea}
          onChangeText={setSearchText}
          value={searchText}
        />
      </View>
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
  searchContainer: {
    flexDirection: 'row',
    width: '90%',
    height: 30,
    margin: 20,
    marginBottom: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
  textarea: {
    width: '90%',
    paddingHorizontal: 20,
    paddingLeft: 5,
  },
  searchIcon: {alignSelf: 'center', marginLeft: 10},
});

export default App;
