import React from 'react';
import {
  useLocation,
  useOutletContext,
  useSearchParams,
} from 'react-router-dom';

import Card from './Card';

function Retriever(props) {
  // Get general app settings
  const { appContext, details } = useOutletContext();

  const imageBaseUrl = appContext.imagesAPIs[0].baseURL;

  return (
    <div className='retriever'>
      <Card
        cardDetails={{
          ...details,
          imageSrc: `${imageBaseUrl}${details.imageID}`,
        }}
      />
    </div>
  );
}

export default Retriever;
