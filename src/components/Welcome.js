import React from 'react';
import { Link } from 'react-router-dom';

function Welcome(props) {
  return (
    <main className='welcome'>
      <div className='cardstock'>
        <h2>Ok, let's make this quick!</h2>
        <Link to='/build' className='build-link'>
          Pour some Honey.
        </Link>
      </div>
      <div className='cardstock'>
        <Link to='/oops/wrong-path' className='oops-link'>
          Somebody sent you here?
        </Link>
      </div>
    </main>
  );
}

export default Welcome;
