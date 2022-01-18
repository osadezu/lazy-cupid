import React, { useState } from 'react';
import { useOutletContext, useLocation } from 'react-router-dom';

function Error() {
  // Get general app settings
  const { appContext } = useOutletContext();

  // State to control error message toggle
  const [showErr, setShowErr] = useState(false);

  // Used to check if state passed an error
  const { state } = useLocation();

  return (
    <main className='error'>
      <div className='cardstock'>
        <h2 className='hero-emoji'>💔</h2>
        <h2>It's not you, it's us!</h2>
        <p>
          {/* Display error passed in state or default */}
          {state && 'error' in state
            ? appContext.errorMessages[state.error.type]
            : appContext.errorMessages['default']}
        </p>
        <div className='error-message'>
          <button
            type='button'
            className={
              showErr ? 'reveal-error revealed' : 'reveal-error concealed'
            }
            onClick={() => setShowErr(!showErr)}>
            Things for Geeks
          </button>
          {/* If error passed, show under toggle */}
          {showErr && (
            <p>
              {state && 'error' in state
                ? state.error.payload.toString()
                : 'Default redirect.'}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

export default Error;
