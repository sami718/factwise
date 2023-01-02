import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  StyleSheet,
  Animated,
} from 'react-native';

import CelebDetails from './CelebDetails';
import EditDetails from './EditDetails';

import {getAge} from '../utils/GlobalFunctions';
import {celebrityInterface} from '../utils/interface';

import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/EvilIcons';

interface Props {
  item: celebrityInterface;
  setModalVisible: (value: boolean) => void;
  EditCelebrities: (data: celebrityInterface) => void;
  hideAndShowCelebrity: (data: celebrityInterface) => void;
  updateIsEditing: (ele: celebrityInterface) => void;
  celebritiesData: Array<celebrityInterface>;
}

const Collapsible = ({
  item,
  setModalVisible,
  EditCelebrities,
  hideAndShowCelebrity,
  celebritiesData,
  updateIsEditing,
}: Props) => {
  const boxStyle = {
    height: new Animated.Value(item.isExpanded ? 310 : 65),
  };
  return (
    <Animated.View style={[styles.container, boxStyle]}>
      <View style={styles.content}>
        <View style={styles.tinyLogo}>
          <Image
            style={styles.image}
            source={{
              uri: item.picture,
            }}
          />
        </View>
        <Text style={styles.label}>{item.first + ' ' + item.last}</Text>
        <TouchableOpacity
          style={styles.iconClick}
          onPress={() => {
            if (celebritiesData.every(ele => ele.isEditing === false)) {
              hideAndShowCelebrity({...item, isExpanded: !item.isExpanded});
            }
          }}>
          <Icon
            name={item.isExpanded ? 'chevron-up' : 'chevron-down'}
            size={35}
            color={'black'}
          />
        </TouchableOpacity>
      </View>
      {item.isExpanded && (
        <View style={styles.details}>
          {!item.isEditing ? (
            <CelebDetails item={item} />
          ) : (
            <EditDetails
              EditCelebrities={(data: celebrityInterface) =>
                EditCelebrities(data)
              }
              updateIsEditing={(celElement: celebrityInterface) =>
                updateIsEditing(celElement)
              }
              item={item}
            />
          )}
          {!item.isEditing && (
            <View style={styles.operations}>
              <TouchableOpacity
                style={[styles.eventClick, styles.delete]}
                onPress={() => setModalVisible(true)}>
                <Icon name="trash" size={30} color="red" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.eventClick}
                onPress={() => {
                  if (
                    item.age ? Number(item.age) >= 18 : getAge(item.dob) >= 18
                  ) {
                    item.isEditing = true;
                    updateIsEditing(item);
                  } else {
                    Toast.show({
                      type: 'info',
                      text1: 'Celebrities under 18 cannot be updated',
                      position: 'bottom',
                    });
                  }
                }}>
                <Icon name="pencil" size={30} color="#4F8EF7" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
  },
  content: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {width: '100%', height: '100%', borderRadius: 25},
  iconClick: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tinyLogo: {
    width: 40,
    height: 40,
  },
  delete: {paddingRight: 0},
  label: {
    flex: 1,
    fontWeight: 'bold',
    marginLeft: 25,
  },
  operations: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 200,
    right: 0,
  },
  details: {marginHorizontal: 20},
  eventClick: {padding: 5},
});

export default Collapsible;
