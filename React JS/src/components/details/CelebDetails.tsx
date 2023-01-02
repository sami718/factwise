import React from 'react';
import {getAge} from '../../utils/GlobalFunctions';
import './CelebDetails.css'

const CelebDetails = ({item}: any) => {
  return (
    <div className='celebrityBlock'>
      <div className='screenArea'>
        <div className='block'>
          <p className='label details'>Age</p>
          <p className='value'>
            {item.age || getAge(item.dob)}
            {' years'}
          </p>
        </div>
        <div className='block'>
          <p className='label details'>Gender</p>
          <p className='value'>{item.gender}</p>
        </div>
        <div className='block'>
          <p className='label details'>Country</p>
          <p className='value'>{item.country}</p>
        </div>
      </div>
      <p className='desc details'>Description</p>
      <p>
        {item.description}
      </p>
    </div>
  );
};

export default CelebDetails;
