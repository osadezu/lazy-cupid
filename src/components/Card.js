import React from 'react';

function Card({ image, quote }) {
  return (
    <div className='card'>
      <img
        className='photo'
        src={`https://cataas.com/cat/${image.id}`}
        alt={image.tags.length ? image.tags.join(' ') + 'cat' : 'Cute cat.'}
      />
      <div className='quote'>
        <p className='quote-text'>{quote.quote}</p>
        <p className='author'>{quote.author}</p>
      </div>
    </div>
  );
}

export default Card;
