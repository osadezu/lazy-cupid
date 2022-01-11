import { useState, useReducer } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import './App.css';

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

//
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

function App() {
  // State and reducer for user's customization details
  const [details, detailsDispatch] = useReducer(detailsReducer, {});

  // General app settings shared in Outlet context.
  const appContext = {
    imagesAPIs: [
      {
        type: 'cats',
        apiSampleURL: 'https://cataas.com/api/cats?tags=cute&skip=0&limit=24',
        apiBaseURL: 'https://cataas.com/api/cats',
        imageBaseURL: 'https://cataas.com/cat/',
      },
      { type: 'flowers', baseURL: 'XXX' },
    ],
    quotesAPI: {
      apiSampleURL:
        'https://api.paperquotes.com/apiv1/quotes/?tags=love,motivation,life&maxlength=100&limit=20&order=-likes',
      apiBaseURL: 'https://api.paperquotes.com/apiv1/quotes/',
    },
    errorMessages: {
      api: 'We seem to have been dumped by our partner API.\nPlease try again later.',
      default:
        'If someone sent you here (lucky you!) please ask them to check the link and try again.\n\nWe assure you this is totally our fault!',
    },
  };

  // Indicate that url was copied to clipboard
  // TODO: reset button if user navigates back and returns to preview
  const [copied, setCopied] = useState(false);
  function handleCopyLink(event) {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => setCopied(true));
    // .catch(console.error);
    // Handle error for user
  }

  // Used to customize UI when previewing and retrieving card
  const { pathname, state } = useLocation();

  return (
    <div className='app'>
      <header>
        {/* When in Retriever, do not show 'Lazy' in heading :P */}
        <h1>
          <Link to='/'>
            {pathname === '/show' ? 'Kitty Cupid!' : 'Lazy Cupid!'}
          </Link>
        </h1>
        {/* Enable copy link button after navigating from builder to retriever */}
        {state && 'senderView' in state && (
          <button
            type='button'
            className='action-button'
            onClick={handleCopyLink}>
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        )}
      </header>
      <Outlet context={{ appContext, details, detailsDispatch, setCopied }} />
    </div>
  );
}

export default App;
