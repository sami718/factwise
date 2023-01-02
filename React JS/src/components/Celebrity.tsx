import React from 'react';

import {getAge} from '../utils/GlobalFunctions';
import {celebrityInterface} from '../utils/interface';

// import Toast from 'react-native-toast-message';
import IconName from "react-icons/bs";
import { FaBeer } from 'react-icons/fa';

interface Props {
  item: celebrityInterface;
  setModalVisible: (value: boolean) => void;
  EditCelebrities: (data: celebrityInterface) => void;
  hideAndShowCelebrity: (data: celebrityInterface) => void;
  updateIsEditing: (ele: celebrityInterface) => void;
  celebritiesData: Array<celebrityInterface>;
}

const Celebrity = ({
  item,
  setModalVisible,
  EditCelebrities,
  hideAndShowCelebrity,
  celebritiesData,
  updateIsEditing,
}: Props) => {
  return (
    <div style={styles.container}>
      {/* <div style={styles.content}>
        <div style={styles.tinyLogo}>
          <img
            alt=''
            style={styles.image}
            src={item.picture}
          />
        </div>
        <h1 style={styles.label}>{item.first + ' ' + item.last}</h1>
        <button
          style={styles.iconClick}
          onClick={() => {
            if (celebritiesData.every(ele => ele.isEditing === false)) {
              hideAndShowCelebrity({...item, isExpanded: !item.isExpanded});
            }
          }}>
          <IconName
            name={item.isExpanded ? 'chevron-up' : 'chevron-down'}
            size={35}
            color={'black'}
          />
          <FaBeer />
        </button>
      </div> */}
    </div>
  );
};

const styles = {
  container: {
    height: 100,
    backgroundColor: 'red',
    width: 100,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  content: {
    // display: 'flex',
    // flexDirection: 'row',
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
  // label: {
  //   flex: 1,
  //   fontWeight: 'bold',
  //   marginLeft: 25,
  // },
  operations: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 200,
    right: 0,
  },
  details: {marginHorizontal: 20},
  eventClick: {padding: 5},
}

export default Celebrity;
