import React from 'react';

function Card({ cardDetails }) {
  if (!cardDetails.imageID) return null;

  return (
    <>
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
            With Love, <span className='sender'>{cardDetails.sender}</span>
          </div>
        )}
      </div>
    </>
  );
}

export default Card;
