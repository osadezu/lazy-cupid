import React from 'react';

import './Card.css';

function Card({ cardDetails }) {
  if (!cardDetails.imageID) return null;

  return (
    <>
      <div className='card cardstock'>
        <img
          className='photo'
          src={cardDetails.imageSrc}
          alt={cardDetails.imageAlt}
        />
        <div className='quote'>
          <p className='quote-text'>{cardDetails.quote}</p>
          <p className='author'>{cardDetails.quoteAuthor}</p>
        </div>
        <div className='note'>
          {cardDetails.recipient && (
            <p className='recipient'>{`My dear ${cardDetails.recipient},`}</p>
          )}
          {cardDetails.message && (
            <p className='message'>{cardDetails.message}</p>
          )}
        </div>
        {cardDetails.sender && (
          <div className='signature'>
            <p>
              With Love, <span className='sender'>{cardDetails.sender}</span>
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default Card;
