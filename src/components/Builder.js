import React from 'react';
import { useReducer, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import Card from './Card';
import Toolkit from './Toolkit';

import { getQuotes, getCats } from '../data/staticData';

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
  // recipient: '',
  // sender: '',
  // imageID: '',
  // // quoteID: '',// Tbd paperquotes response
  // quote: '',
  // quoteAuthor: '',
  // message: '',
};

function Builder(props) {
  const [images, imageDispatch] = useReducer(collectionReducer, getCats());
  const [quotes, quoteDispatch] = useReducer(collectionReducer, getQuotes());
  const [details, detailsDispatch] = useReducer(detailsReducer, initialDetails);

  const [searchParams, setSearchParams] = useSearchParams();

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

  // When user is done, preview card and generate URL
  function handleSubmit(event) {
    console.log(event);
    event.preventDefault();
    setSearchParams(details);
  }

  function preventEnterSubmit() {}

  // Store inputs in details object when typing
  function handleTextChange(event) {
    detailsDispatch({
      type: 'update-text',
      payload: { [event.target.name]: event.target.value },
    });
  }

  // Update user selection of image/quote in content collection
  // or request new data be loaded to collection
  function handleSelection(type, action) {
    if (action === 'new') {
      // TODO: Get more from API and send to reducer as payload: [{…}, {…}, {…}, …]
    } else {
      if (type === 'image') {
        imageDispatch({ type: action }); // Update image selection
      }
      if (type === 'quote') {
        quoteDispatch({ type: action }); // Update quote selection
      }
    }
  }

  return (
    <div className='builder'>
      <Card image={images[0]} quote={quotes[0]} />
      <Toolkit
        handleSubmit={handleSubmit}
        preventEnterSubmit={preventEnterSubmit}
        handleTextChange={handleTextChange}
        handleSelection={handleSelection}
      />
    </div>
  );
}

export default Builder;
