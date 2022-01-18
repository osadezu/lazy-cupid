// eslint-disable react-hooks/exhaustive-deps
import { useEffect, useReducer } from 'react';
import {
  useOutletContext,
  createSearchParams,
  useNavigate,
} from 'react-router-dom';
import { useListReducer } from '../hooks/useListReducer';
import { cataas, paperQuotes } from '../providers';

import Card from './Card';
import Toolkit from './Toolkit';

// TODO: Refactor this to use collection[] + selection index variable
function oldCollectionReducer(state, action) {
  switch (action.type) {
    case 'next':
      return [...state.slice(1), state[0]]; // Replace with index increase
    case 'prev':
      return [...state.slice(-1), ...state.slice(0, -1)]; // Replace with index decrease
    case 'new':
      return [...action.payload];
    default:
      return state; // do nothing
  }
}

function Builder() {
  // Get general app settings
  const { details, detailsDispatch } = useOutletContext();

  // Hook to navigate to card preview when user is done building
  const navigate = useNavigate();

  // States and reduers for content collections
  const [images, imageDispatch] = useListReducer();
  const [quotes, quoteDispatch] = useReducer(oldCollectionReducer, []);

  useEffect(() => {
    let mounted = true;
    // TODO: Combine this logic into a single function that can fetch from both APIs
    // and is reusable for loading additional content.

    // Initialize images with retained state from details
    if (details?.imageID) {
      imageDispatch({
        type: 'append',
        payload: [
          {
            id: details.imageID,
            tags: details.imageAlt.split(' ').slice(0, -1),
          },
        ],
      });
    }

    cataas
      .fetch()
      .then((res) => {
        // exit early when unmounted
        if (!mounted) {
          return;
        }
        // component is still mounted
        imageDispatch({
          type: 'append',
          payload: res,
          identifier: (item) => item.id,
        });
      })
      .catch((err) => {
        navigate('/oops', {
          state: { error: { type: 'api', payload: err } },
        });
      });

    paperQuotes
      .fetch()
      .then((res) => {
        console.log('paperQuotes', { res });
        // exit early when unmounted
        if (!mounted) {
          return;
        }
        // component is still mounted
        quoteDispatch({ type: 'new', payload: res.results });
      })
      .catch((err) => {
        navigate('/oops', {
          state: { error: { type: 'api', payload: err } },
        });
      });

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Changes to content collections trigger updating selections details
  useEffect(() => {
    console.log({ images, quotes });
    // Wait until collections have been loaded.
    if (!images?.choice || !quotes?.length) return;

    detailsDispatch({
      type: 'update-content',
      payload: {
        imageID: images.choice.id,
        imageAlt: images.choice.tags.length
          ? images.choice.tags.join(' ') + ' cat'
          : 'cute cat',
        quote: quotes[0].quote,
        quoteAuthor: quotes[0].author,
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images?.choice, quotes?.[0]]);

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
  }

  // TODO: Prevent form from being submitted on Enter
  // function preventEnterSubmit() {}

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

  console.log('render', { details });
  return (
    <main className='builder'>
      <Card
        cardDetails={{
          ...details,
          imageSrc: `${cataas.config.imageBaseURL}${details.imageID}`,
        }}
      />
      <Toolkit
        handleSubmit={handleSubmit}
        handleTextChange={handleTextChange}
        handleSelection={handleSelection}
        details={details}
      />
    </main>
  );
}

export default Builder;
