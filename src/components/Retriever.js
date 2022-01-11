import React, { useEffect } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';

import Card from './Card';

function Retriever(props) {
  // Get general app settings
  const { appContext, setCopied } = useOutletContext();

  // Load details from search query
  const details = {};
  const [searchParams] = useSearchParams();
  for (const [key, value] of searchParams) {
    details[key] = value;
  }

  // Reset 'copy link' button in case user went back to build
  useEffect(() => setCopied(false), []);

  const imageBaseURL = appContext.imagesAPIs[0].imageBaseURL;

  return (
    <main className='retriever'>
      <Card
        cardDetails={{
          ...details,
          imageSrc: `${imageBaseURL}${details.imageID}`,
        }}
      />
    </main>
  );
}

export default Retriever;
