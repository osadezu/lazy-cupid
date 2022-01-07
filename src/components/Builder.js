import React from 'react';
import { useReducer, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';

import Card from './Card';
import Toolkit from './Toolkit';

import { getQuotes, getCats } from '../data';

// import Collection from './Collection'

// TODO: Is this efficient or should this be refactored to use
// an object like: { items[], chosenIndex } see Collection.js import
function collectionReducer(state, action) {
  switch (action.type) {
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

function detailsReducer(state, action) {
  switch (action.type) {
    case 'update-text':
      return { ...state, ...action.payload };
    case 'update-content':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

const testDetails = {
  recipient: 'Valen',
  sender: 'Tine',
  imageID: '595f280e557291a9750ebf9f',
  // quoteID: // Tbd paperquotes response
  quote: "Don't cry because it's over, smile because it happened.",
  quoteAuthor: 'Dr. Seuss',
  message: "I don't wanna wait!",
};

const initialDetails = {
  recipient: '',
  sender: '',
  imageID: '',
  // quoteID: '',// Tbd paperquotes response
  quote: '',
  quoteAuthor: '',
  message: '',
};

function Builder(props) {
  const [images, imageDispatch] = useReducer(collectionReducer, getCats());
  const [quotes, quoteDispatch] = useReducer(collectionReducer, getQuotes());
  const [details, detailsDispatch] = useReducer(detailsReducer, initialDetails);

  let [searchParams, setSearchParams] = useSearchParams();

  let location = useLocation();

  useEffect(() => {
    setSearchParams(details);
    console.log(location);
  }, [details]);

  // Perhaps use generatePath() instead??
  // Perhaps use generatePath() instead??
  // Perhaps use generatePath() instead??
  // Perhaps use generatePath() instead??

  useEffect(() => {
    detailsDispatch({
      type: 'update-content',
      payload: {
        imageID: images[0].id,
        quote: quotes[0].quote,
        quoteAuthor: quotes[0].author,
      },
    });
  }, [images, quotes]);

  function handleTextChange(event) {
    detailsDispatch({
      type: 'update-text',
      payload: { [event.target.name]: event.target.value },
    });
  }

  function handleSelection(type, action) {
    if (action === 'new') {
      // TODO: Get more from API and send to reducer as payload: [{…}, {…}, {…}, …]
    } else {
      if (type === 'image') {
        imageDispatch({ type: action });
      }
      if (type === 'quote') {
        quoteDispatch({ type: action });
      }
    }
  }

  return (
    <div className='builder'>
      <Card image={images[0]} quote={quotes[0]} />
      <Toolkit
        handleTextChange={handleTextChange}
        handleSelection={handleSelection}
      />
    </div>
  );
}

export default Builder;
