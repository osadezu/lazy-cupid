import React from 'react';

function Card({ cardDetails }) {
  if (!cardDetails.imageID) return null;

  return (
    <>
      <h2>Dear {cardDetails.recipient},</h2>
      <div className='card'>
        <img
          className='photo'
          src={cardDetails.imageSrc}
          alt={cardDetails.imageAlt}
        />
        <div className='quote'>
          <p className='quote-text'>{cardDetails.quote}</p>
          <p className='author'>{cardDetails.quoteAuthor}</p>
        </div>
        <div className='signature'>
          With Love, <span className='sender'>{cardDetails.sender}</span>
        </div>
      </div>
    </>
  );
}

export default Card;
