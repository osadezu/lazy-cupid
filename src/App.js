import { useState, useReducer } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

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

  const appContext = {
    imagesAPIs: [
      { type: 'cats', baseURL: 'https://cataas.com/cat/' },
      { type: 'flowers', baseURL: 'XXX' },
    ],
    quotesAPI: { baseURL: 'XXX' },
  };

  // Indicate that url was copied to clipboard
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
        <h1>{pathname === '/show' ? 'Kitty Cupid!' : 'Lazy Cupid!'}</h1>
        {/* Enable copy link button after navigating from builder to retriever */}
        {!!state && 'senderView' in state && (
          <button
            type='button'
            className='action-button'
            onClick={handleCopyLink}>
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        )}
      </header>
      <Outlet context={{ appContext, details, detailsDispatch }} />
    </div>
  );
}

export default App;
