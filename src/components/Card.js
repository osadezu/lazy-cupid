import React from 'react';

function Card(props) {
  return (
    <div className='card'>
      <img
        className='cat'
        src='https://cataas.com/cat/615ea3c40b0d93001872e15f'
        alt='cute cat'
      />
      <p className='quote'>
        <span className='curly'>“</span>You've gotta dance like there's nobody
        watching, Love like you'll never be hurt, Sing like there's nobody
        listening and Live like its heaven on earth.
        <span className='curly'>”</span>
      </p>
    </div>
  );
}

export default Card;
