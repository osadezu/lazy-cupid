import React from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';

import Card from './Card';

function Retriever(props) {
  // Get general app settings
  const { appContext } = useOutletContext();

  // Load details from search query
  const details = {};
  const [searchParams] = useSearchParams();
  for (const [key, value] of searchParams) {
    details[key] = value;
  }

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
