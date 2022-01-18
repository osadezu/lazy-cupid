import { useEffect } from 'react';
import {
  useOutletContext,
  createSearchParams,
  useNavigate,
} from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { useListReducer } from '../hooks/useListReducer';
import { cataas, paperQuotes } from '../providers';

import Card from './Card';
import Toolkit from './Toolkit';

function Builder() {
  // Get general app settings
  const { details, detailsDispatch } = useOutletContext();

  // Hook to navigate to card preview when user is done building
  const navigate = useNavigate();

  // States and reducers for content collections
  const [images, imageDispatch] = useListReducer();
  const [quotes, quoteDispatch] = useListReducer();

  useEffect(() => {
    let mounted = true;

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

    // Initialize quotes with retained state from details
    if (details?.quote) {
      quoteDispatch({
        type: 'append',
        payload: [
          {
            quote: details.quote,
            author: details.quoteAuthor,
          },
        ],
      });
    }

    // Fetch content from images provider
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

    // Fetch content from quotes provider
    paperQuotes
      .fetch()
      .then((res) => {
        // exit early when unmounted
        if (!mounted) {
          return;
        }
        // component is still mounted
        quoteDispatch({
          type: 'append',
          payload: res.results,
          identifier: (item) => item.quote,
        });
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
    // Wait until collections have been loaded.
    if (!images?.choice || !quotes?.choice) return;

    detailsDispatch({
      type: 'update-content',
      payload: {
        imageID: images.choice.id,
        imageAlt: images.choice.tags.length
          ? images.choice.tags.join(' ') + ' cat'
          : 'cute cat',
        quote: quotes.choice.quote,
        quoteAuthor: quotes.choice.author,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images?.choice, quotes?.choice]);

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
    <>
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
      {
        // preload images for faster app
        <Helmet>
          {images?.items.map((image) => (
            <link
              key={image.id}
              crossorigin='anonymous'
              rel='prefetch'
              as='image'
              href={`${cataas.config.imageBaseURL}${image.id}`}
            />
          ))}
        </Helmet>
      }
    </>
  );
}

export default Builder;
