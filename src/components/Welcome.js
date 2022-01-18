import React from 'react';
import { Link } from 'react-router-dom';

function Welcome(props) {
  return (
    <main className='welcome'>
      <div className='cardstock'>
        <h2 className='hero-emoji'>💝</h2>
        <h2>Let's make this quick</h2>
        <p>These things are not for everyone, we get it.</p>
        <p>Last minute situation? No problem!</p>
        <p>We are here to help, and we got lots of kitties.</p>
        <Link to='/build' className='build-link'>
          Pour some honey
        </Link>
      </div>
    </main>
  );
}

export default Welcome;
