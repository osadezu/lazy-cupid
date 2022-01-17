// eslint-disable react-hooks/exhaustive-deps
import { useEffect, useMemo, useReducer } from 'react';
import {
  useOutletContext,
  createSearchParams,
  useNavigate,
} from 'react-router-dom';

import Card from './Card';
import Toolkit from './Toolkit';

// Load static data for testing/debugging
// import { getQuotes, getCats } from '../data/staticData'

function listReducer(state, action) {
  state = state ? state : { index: 0, items: [], choice: undefined };

  switch (action.type) {
    case 'next': {
      const index = (state.index + 1) % state.items.length;
      return { ...state, index, choice: state.items[index] };
    }

    case 'prev': {
      const index = state.index > 0 ? state.index - 1 : state.items.length - 1;
      return { ...state, index, choice: state.items[index] };
    }

    case 'new':
      const index = action.index != null ? action.index : state.index;
      const items = Array.isArray(action.payload)
        ? [...state.items, ...action.payload]
        : [...state.items, action.payload];
      const choice = items[index];

      return { ...state, index, items, choice };

    default:
      return state; // do nothing
  }
}

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
  const { appContext, details, detailsDispatch } = useOutletContext();

  // Hook to navigate to card preview when user is done building
  const navigate = useNavigate();

  // States and reduers for content collections
  // const [images, imageDispatch] = useReducer(collectionReducer, initImages());
  const [images, imageDispatch] = useReducer(listReducer);
  // const [images, imageDispatch] = useReducer(oldCollectionReducer, []);
  const [quotes, quoteDispatch] = useReducer(oldCollectionReducer, []);

  // Content sources (For future addition of different choice APIs)
  const imageBaseURL = appContext.imagesAPIs[0].imageBaseURL;
  const imageRequestURL = appContext.imagesAPIs[0].apiBaseURL;
  const quoteRequestURL = appContext.quotesAPI.apiBaseURL;

  useEffect(() => {
    // TODO: Combine this logic into a single function that can fetch from both APIs
    // and is reusable for loading additional content.

    let results = 24;
    let offset = Math.floor(Math.random() * 50); // For now provide a random offset for variety
    let tags = 'cute';
    let url = `${imageRequestURL}?tags=${tags}&skip=${offset}&limit=${results}`;
    fetch(url)
      .then((res) => {
        // Get specifics if response is not ok
        // console.log(res);
        if (!res.ok) {
          throw new Error(
            `Could not fetch from ${url} ${res.status} ${res.statusText}`
          );
        }
        return res;
      })
      .then((res) => res.json())
      .then((res) => {
        let index = res.findIndex((v) => v?.id === details?.imageID);
        if (index === -1) {
          index = 0;
          res = !details?.imageID
            ? res
            : [
                {
                  id: details.imageID,
                  tags: details.imageAlt.split(' ').slice(0, -1),
                },
                ...res,
              ];
        }
        imageDispatch({ type: 'new', index, payload: res });
      })
      .catch((err) => {
        navigate('/oops', {
          state: { error: { type: 'api', payload: err } },
        });
      });

    results = 24;
    offset = Math.floor(Math.random() * 50); // For now provide a random offset for variety
    tags = 'love,motivation,life';
    const maxLength = 120;
    url = `${quoteRequestURL}?tags=${tags}&maxlength=${maxLength}&offset=${offset}&limit=${results}&order=-likes`;
    fetch(url, {
      headers: {
        Authorization: `Token ${process.env.REACT_APP_PPQTS_TKN}`,
      },
    })
      .then((res) => {
        // Get specifics if response is not ok
        // console.log(res);
        if (!res.ok) {
          throw new Error(
            `Could not fetch from ${url} ${res.status} ${res.statusText}`
          );
        }
        return res;
      })
      .then((res) => res.json())
      .then((res) => {
        quoteDispatch({ type: 'new', payload: res.results });
      })
      .catch((err) => {
        navigate('/oops', {
          state: { error: { type: 'api', payload: err } },
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // console.log('log', { details });
  }, [details]);

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

  return (
    <main className='builder'>
      <Card
        cardDetails={{
          ...details,
          imageSrc: `${imageBaseURL}${details.imageID}`,
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
