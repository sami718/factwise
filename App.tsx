import React, {useEffect, useState} from 'react';
import {
  FlatList,
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from 'react-native';
import Collapsible from './src/components/Collapsible';
import DeleteBox from './src/components/DeleteBox';

import celebrities from './src/mockData/celebrities';
import {celebrityInterface} from './src/utils/interface';

import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/EvilIcons';

const App = () => {
  const [celebritiesData, setCelebritiesData] =
    useState<Array<celebrityInterface>>(celebrities);
  const [searchText, setSearchText] = useState<string>('');
  const [modalVisible, setModalVisible] = useState({
    isModalVisible: false,
    selectedCeleb: null,
  });

  useEffect(() => {
    celebritiesData.forEach((element: celebrityInterface) => {
      element.isExpanded = false;
      element.isEditing = false;
    });
    setCelebritiesData([...celebritiesData]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hideAndShowCelebrity = (celebrityToShow: celebrityInterface) => {
    celebritiesData.forEach((element: celebrityInterface) => {
      element.isExpanded = false;
    });
    let index = celebritiesData.findIndex(
      (celebrity: celebrityInterface) => celebrity.id === celebrityToShow.id,
    );
    celebritiesData[index] = celebrityToShow;
    setCelebritiesData([...celebritiesData]);
  };

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
      (celebrity: celebrityInterface) =>
        celebrity.id === modalVisible.selectedCeleb.id,
    );
    celebritiesData.splice(index, 1);
    setCelebritiesData([...celebritiesData]);
    setModalVisible({isModalVisible: false, selectedCeleb: null});
    showToast('Celebrity Details Deleted Successfully!');
  };

  const EditCelebrities = (updatedCelebrityValue: celebrityInterface) => {
    if (
      updatedCelebrityValue.age &&
      updatedCelebrityValue.country &&
      updatedCelebrityValue.description
    ) {
      let index = celebrities.findIndex(
        (celebrity: celebrityInterface) =>
          celebrity.id === updatedCelebrityValue.id,
      );
      celebritiesData[index] = updatedCelebrityValue;
      updatedCelebrityValue.isEditing = false;
      setCelebritiesData([...celebritiesData]);
      showToast('Celebrity Details Updated Successfully!');
    } else {
      showToast('Add all required details', 'info');
    }
  };

  const updateIsEditing = (element: celebrityInterface) => {
    let index = celebrities.findIndex(
      (celebrity: celebrityInterface) => celebrity.id === element.id,
    );
    celebritiesData[index] = element;
    setCelebritiesData([...celebritiesData]);
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
          celebritiesData={celebritiesData}
          updateIsEditing={(data: celebrityInterface) => updateIsEditing(data)}
          hideAndShowCelebrity={(data: celebrityInterface) =>
            hideAndShowCelebrity(data)
          }
          EditCelebrities={(updatedValue: celebrityInterface) =>
            EditCelebrities(updatedValue)
          }
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
        keyExtractor={item => String(item.id)}
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
