import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className='app'>
      <header>
        <h1>Lazy Cupid!</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
