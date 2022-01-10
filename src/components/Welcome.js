import React from 'react';
import { Link } from 'react-router-dom';

function Welcome(props) {
  return (
    <main className='welcome'>
      <h2>Ok, let's make this quick.</h2>
      <Link to='/build'>👉 Pour some Honey!</Link>
      <br />
      <Link to='/oops/wrong-path'>❤️ Somebody sent you here?</Link>
    </main>
  );
}

export default Welcome;
