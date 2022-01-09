import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
  const appContext = {
    imagesAPIs: [
      { type: 'cats', baseURL: 'https://cataas.com/cat/' },
      { type: 'flowers', baseURL: 'XXX' },
    ],
    quotesAPI: { baseURL: 'XXX' },
  };

  return (
    <div className='app'>
      <header>
        <h1>Lazy Cupid!</h1>
      </header>
      <main>
        <Outlet context={appContext} />
      </main>
    </div>
  );
}

export default App;
