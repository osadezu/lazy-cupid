import { useReducer } from 'react';
import { Outlet } from 'react-router-dom';

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

  // const [searchParams, setSearchParams] = useSearchParams();

  // // Keep details in search query
  // useEffect(() => {
  //   setSearchParams(details);
  // }, [setSearchParams, details]);

  return (
    <div className='app'>
      <header>
        <h1>Lazy Cupid!</h1>
      </header>
      <main>
        <Outlet context={{ appContext, details, detailsDispatch }} />
      </main>
    </div>
  );
}

export default App;
