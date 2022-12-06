import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  StyleSheet,
  Animated,
} from 'react-native';
// import Icon from 'react-native-vector-icons/EvilIcons';
import CelebDetails from './CelebDetails';
import EditDetails from './EditDetails';

interface Props {
  item: any;
  setModalVisible: (value: boolean) => void;
  EditCelebrities: (data: any) => void;
}

const Collapsible = ({item, setModalVisible, EditCelebrities}: Props) => {
  const [isExpanded, setExpandValue] = useState<boolean>(false);
  const [isEditing, setEditValue] = useState<boolean>(false);

  const [animation, setAnimation] = useState<any>(new Animated.Value(65));
  const boxStyle = {
    height: animation,
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
            if (!isExpanded) {
              setAnimation(new Animated.Value(300));
              setExpandValue(!isExpanded);
            } else {
              setAnimation(new Animated.Value(65));
              setExpandValue(!isExpanded);
            }
          }}>
          <Text>{isExpanded ? '>' : '<'}</Text>
        </TouchableOpacity>
      </View>
      {isExpanded && (
        <View style={styles.details}>
          {!isEditing ? (
            <CelebDetails item={item} />
          ) : (
            <EditDetails
              EditCelebrities={(data: any) => EditCelebrities(data)}
              setEditValue={(value: boolean) => setEditValue(value)}
              item={item}
            />
          )}
          {!isEditing && (
            <View style={styles.operations}>
              <TouchableOpacity
                style={styles.eventClick}
                onPress={() => setModalVisible(true)}>
                <Text>D</Text>
                {/* <Icon name="arrow-down" color="#4F8EF7" /> */}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.eventClick}
                onPress={() => setEditValue(true)}>
                <Text>E</Text>
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
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tinyLogo: {
    width: 40,
    height: 40,
  },
  label: {
    flex: 1,
    fontWeight: 'bold',
    marginLeft: 25,
  },
  operations: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  details: {marginHorizontal: 20},
  eventClick: {padding: 10},
});

export default Collapsible;
