import { cataas } from './cataas';

export const allImageProviders = {
  fetch(type, options) {
    switch (type) {
      case 'cats': {
        return cataas.fetch(options);
      }
      default:
        throw `No image provider for ${type}!`;
    }
  },
};
