export const paperQuotes = {
  config: {
    apiSampleURL:
      'https://api.paperquotes.com/apiv1/quotes/?tags=love,motivation,life&maxlength=100&limit=20&order=-likes',
    apiBaseURL: 'https://api.paperquotes.com/apiv1/quotes/',
  },
  async fetch(options) {
    const results = 24;
    const offset = Math.floor(Math.random() * 50); // For now provide a random offset for variety
    const tags = 'love,motivation,life';
    const maxLength = 120;
    const url = `${paperQuotes.config.apiBaseURL}?tags=${tags}&maxlength=${maxLength}&offset=${offset}&limit=${results}&order=-likes`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Token ${process.env.REACT_APP_PPQTS_TKN}`,
      },
    });

    // Report specifics if response is not ok
    if (!response.ok) {
      throw new Error(
        `Could not fetch from ${url} ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  },
};
