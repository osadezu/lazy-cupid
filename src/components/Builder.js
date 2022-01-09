import { useEffect, useReducer } from 'react';
import {
  useOutletContext,
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

function Builder(props) {
  // Get general app settings
  const { appContext, details, detailsDispatch } = useOutletContext();

  // Content sources (For future addition of different choice APIs)
  const imageBaseUrl = appContext.imagesAPIs[0].baseURL;

  // Hook to navigate to card preview when user is done building
  const navigate = useNavigate();

  // States and reduers for content collections
  const [images, imageDispatch] = useReducer(collectionReducer, getCats());
  const [quotes, quoteDispatch] = useReducer(collectionReducer, getQuotes());

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
  }, [detailsDispatch, images, quotes]);

  // When user is done, preview card and generate URL
  function handleSubmit(event) {
    event.preventDefault();
    navigate(
      {
        pathname: '/show',
        search: createSearchParams(details).toString(),
      },
      { state: { senderView: true } }
    );
    // setCardLink(
    //   resolvePath({
    //     pathname: '/show',
    //     search: createSearchParams(details).toString(),
    //   })
    // );
  }

  // const url = useHref({
  //   pathname: '/show',
  //   search: createSearchParams(details).toString(),
  // });
  // console.log(url);

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
        details={details}
        // cardLink={cardLink}
      />
    </div>
  );
}

export default Builder;
