import React from 'react';
import Card from './Card';
import Toolkit from './Toolkit';

function Builder(props) {
  return (
    <div className='builder'>
      <Card />
      <Toolkit />
    </div>
  );
}

export default Builder;
