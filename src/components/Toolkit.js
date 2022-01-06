import React from 'react';

function Toolkit(props) {
  return (
    <div className='toolkit'>
      <label htmlFor='recipient' className='wide'>
        Who's the lucky one?
      </label>
      <input
        type='text'
        id='recipient'
        className='wide'
        placeholder="your sweetheart's name"
      />
      <button type='button' className='prev' id='cat-prev' />
      <button type='button' className='text-button' id='cat-change'>
        change cat
      </button>
      <button type='button' className='next' id='cat-next'></button>
      <button type='button' className='prev' id='quote-prev'></button>
      <button type='button' className='text-button' id='quote-change'>
        change quote
      </button>
      <button type='button' className='next' id='quote-next'></button>
      <label htmlFor='message' className='wide'>
        Add a personal message?
      </label>
      <textarea
        id='message'
        rows='2'
        className='wide'
        placeholder='Go the extra yard!'></textarea>
      <button type='button' id='copy-link' className='wide'>
        Copy my link &amp; send love!
      </button>
    </div>
  );
}

export default Toolkit;
