import React from 'react';
import { useReducer } from 'react';

import Card from './Card';
import Toolkit from './Toolkit';

import { getQuotes, getCats } from '../data';

// TODO: Is this efficient or should this be refactored to use
// an object like: { items[], chosenIndex } see Collection.js
function reducer(state, action) {
  switch (action.get) {
    case 'next':
      return [...state.slice(1), state[0]];
    case 'prev':
      return [...state.slice(-1), ...state.slice(0, -1)];
    case 'new':
      return [...action.payload];
    default:
      return state; // do nothing
  }
}

function Builder(props) {
  const [images, imageDispatch] = useReducer(reducer, getCats());
  const [quotes, quoteDispatch] = useReducer(reducer, getQuotes());

  // function moreCats() {}
  // function moreQuotes() {}

  return (
    <div className='builder'>
      <Card image={images[0]} quote={quotes[0]} />
      <Toolkit imageDispatch={imageDispatch} quoteDispatch={quoteDispatch} />
    </div>
  );
}

export default Builder;
