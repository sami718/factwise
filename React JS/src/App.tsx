import React, { useEffect, useState } from 'react';
import './App.css';
import celebrities from './mockData/celebrities.json';
import { celebrityInterface } from './utils/interface';
import Collapsible from './components/collapsible/Collapsible';
// import Celebrity from './components/Celebrity';
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import CelebDetails from './components/details/CelebDetails';
import { FaRegTrashAlt, FaPencilAlt } from "react-icons/fa";
import TextField from '@mui/material/TextField';

const App = () => {
  const [celebritiesData, setCelebritiesData] =
    useState<Array<celebrityInterface>>(celebrities);
  const [searchText, setSearchText] = useState<string>('');
  // const [modalVisible, setModalVisible] = useState({
  //   isModalVisible: false,
  //   selectedCeleb: null,
  // });

  useEffect(() => {
    celebritiesData.forEach((element: celebrityInterface) => {
      element.isExpanded = false;
      element.isEditing = false;
    });
    setCelebritiesData([...celebritiesData]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const inputHandler = (e: { target: { value: string; }; }) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setSearchText(lowerCase);
  };


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

  const listItems = celebritiesData.map((celebrity:celebrityInterface) => {
    if (celebrity.first.toLocaleLowerCase().includes(searchText) ||
      celebrity.last.toLocaleLowerCase().includes(searchText)) {
      return (
        <div className='card'>
          <Collapsible trigger={
            <div className='cardHeader'>
              <div style={styles.imgContainer}>
                <img
                  alt=''
                  style={styles.image}
                  src={celebrity.picture}
                />
              </div>
              <p className='name'>{celebrity.first + ' ' + celebrity.last}</p>
              <button
                className='iconClick'
                onClick={() => {
                  if (celebritiesData.every(ele => ele.isEditing === false)) {
                    hideAndShowCelebrity({...celebrity, isExpanded: !celebrity.isExpanded});
                  }
                }}>
                {celebrity.isExpanded ? <FiChevronUp/> : <FiChevronDown/>}
              </button>
            </div>
          }>
            <CelebDetails item={celebrity} />
            <div className='actions'>
              <button><FaRegTrashAlt /></button>
              <button><FaPencilAlt/></button>
            </div>
          </Collapsible>
        </div>
      )
    }
    return <></>
  }
  );

  return (
    <div className="App">
      <div className="search">
        <TextField
          onChange={inputHandler}
          id="outlined-basic"
          variant="outlined"
          fullWidth
          label="Search"
        />
      </div>
      <>{listItems}</>
    </div>
  );
}

const styles = {
  image: {width: '100%', height: '100%', borderRadius: 25},
  imgContainer: {
    width: 55,
    height: 55
  },
}

export default App;
