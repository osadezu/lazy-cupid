export const cataas = {
  config: {
    apiSampleURL: 'https://cataas.com/api/cats?tags=cute&skip=0&limit=24',
    apiBaseURL: 'https://cataas.com/api/cats',
    imageBaseURL: 'https://cataas.com/cat/',
  },
  async fetch(options) {
    let limit = options?.limit ?? 24;
    let offset = Math.floor(Math.random() * 50); // For now provide a random offset for variety
    let tags = 'cute';
    let url = `${cataas.config.apiBaseURL}?tags=${tags}&skip=${offset}&limit=${limit}`;

    const response = await fetch(url);
    // Report specifics if response is not ok
    if (!response.ok) {
      throw new Error(
        `Could not fetch from ${url} ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  },
};
