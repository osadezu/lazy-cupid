import React from 'react';

function Toolkit({ handleTextChange, handleSelection }) {
  return (
    <div className='toolkit'>
      <label htmlFor='recipient' className='wide'>
        Who's the lucky one?
      </label>
      <input
        type='text'
        id='recipient'
        name='recipient'
        className='wide'
        placeholder="your sweetheart's name"
        onChange={(event) => handleTextChange(event)}
      />
      <button
        type='button'
        name='image'
        className='prev'
        onClick={() => handleSelection('image', 'prev')}
      />
      <button
        type='button'
        name='image'
        className='text-button'
        onClick={() => handleSelection('image', 'more')}>
        more cats
      </button>
      <button
        type='button'
        name='image'
        className='next'
        onClick={() => handleSelection('image', 'next')}
      />
      <button
        type='button'
        name='quote'
        className='prev'
        onClick={() => handleSelection('quote', 'prev')}
      />
      <button
        type='button'
        id='quote'
        className='text-button'
        onClick={() => handleSelection('quote', 'more')}>
        more quotes
      </button>
      <button
        type='button'
        name='quote'
        className='next'
        onClick={() => handleSelection('quote', 'next')}
      />
      <label htmlFor='message' className='wide'>
        Add a personal message?
      </label>
      <textarea
        id='message'
        name='message'
        rows='2'
        className='wide'
        placeholder='Go the extra yard!'
        onChange={(event) => handleTextChange(event)}></textarea>
      <label htmlFor='sender' className='wide'>
        And who should we say sent it?
      </label>
      <input
        type='text'
        id='sender'
        name='sender'
        className='wide'
        placeholder='you in your shining armor'
        onChange={(event) => handleTextChange(event)}
      />
      <button type='button' id='copy-link' className='wide'>
        Copy my link &amp; send love!
      </button>
    </div>
  );
}

export default Toolkit;
