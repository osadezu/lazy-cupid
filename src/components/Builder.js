import React from 'react';
import { useReducer, useEffect } from 'react';
import {
  useOutletContext,
  useSearchParams,
  createSearchParams,
  useNavigate,
} from 'react-router-dom';

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
  message: "I don't wanna wait!",
  imageID: '595f280e557291a9750ebf9f',
  imageAlt: 'cute cat',
  quote: "Don't cry because it's over, smile because it happened.",
  quoteAuthor: 'Dr. Seuss',
};

const initialDetails = {
  // recipient: '',
  // sender: '',
  // message: '',
  // imageID: '',
  // imageAlt: '',
  // quote: '',
  // quoteAuthor: '',
};

function Builder(props) {
  // Get general app settings
  const appContext = useOutletContext();

  // Content sources (For future addition of different choice APIs)
  const imageBaseUrl = appContext.imagesAPIs[0].baseURL;

  // Manage URL parameters
  const [searchParams, setSearchParams] = useSearchParams();

  // Hook to navigate to card preview when user is done building
  const navigate = useNavigate();

  // States and reduers for content collections
  const [images, imageDispatch] = useReducer(collectionReducer, getCats());
  const [quotes, quoteDispatch] = useReducer(collectionReducer, getQuotes());

  // State and reducer for user's customization details
  const [details, detailsDispatch] = useReducer(detailsReducer, initialDetails);

  // Changes to content collections trigger updating selections details
  useEffect(() => {
    detailsDispatch({
      type: 'update-content',
      payload: {
        imageID: images[0].id,
        imageAlt: images[0].tags.length
          ? images[0].tags.join(' ') + 'cat'
          : 'cute cat',
        quote: quotes[0].quote,
        quoteAuthor: quotes[0].author,
      },
    });
  }, [images, quotes]);

  // When user is done, preview card and generate URL
  function handleSubmit(event) {
    event.preventDefault();
    // setSearchParams(details, { state: details });
    navigate({
      pathname: '/show',
      search: createSearchParams(details).toString(),
    });
  }

  // Prevent form from being submitted on Enter
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
      <Card
        cardDetails={{
          ...details,
          imageSrc: `${imageBaseUrl}${details.imageID}`,
        }}
      />
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
