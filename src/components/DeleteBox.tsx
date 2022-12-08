import React from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';

interface DeleteAlertInterface {
  modalVisible: boolean;
  setModalVisible: (val: boolean) => void;
  deleteCelebrities: () => void;
}

const DeleteBox = ({
  modalVisible,
  setModalVisible,
  deleteCelebrities,
}: DeleteAlertInterface) => {
  return (
    <View style={modalVisible ? styles.backScreen : {}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.header}>
              <Text style={styles.modalText}>
                Are you sure you want to delete?
              </Text>
              <Pressable
                style={styles.crossArea}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={[styles.textStyle, styles.blackColor]}>X</Text>
              </Pressable>
            </View>
            <View style={styles.updateEvents}>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={[styles.textStyle, styles.blackColor]}>
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => deleteCelebrities()}>
                <Text style={styles.textStyle}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  header: {flexDirection: 'row', justifyContent: 'space-between'},
  backScreen: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  modalView: {
    margin: 20,
    width: '95%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 25,
    borderWidth: StyleSheet.hairlineWidth,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 30,
    elevation: 2,
  },
  crossArea: {paddingHorizontal: 20},
  blackColor: {color: 'black'},
  updateEvents: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  buttonOpen: {
    borderWidth: StyleSheet.hairlineWidth,
  },
  buttonClose: {
    marginLeft: 10,
    backgroundColor: 'red',
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
  },
});

export default DeleteBox;
