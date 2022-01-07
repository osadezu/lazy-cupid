import React from 'react';

function Card({ image, quote }) {
  return (
    <div className='card'>
      {/* TODO: Take out api address and 'cat' strings for generic image types */}
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
