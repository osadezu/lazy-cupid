import { useReducer } from 'react';

export function useListReducer(defaultState) {
  return useReducer(listReducer, defaultState);
}

function listReducer(state, action) {
  state = state ? state : { index: 0, items: [], choice: undefined };

  switch (action.type) {
    case 'next': {
      const index = (state.index + 1) % state.items.length;
      return { ...state, index, choice: state.items[index] };
    }

    case 'prev': {
      const index = state.index > 0 ? state.index - 1 : state.items.length - 1;
      return { ...state, index, choice: state.items[index] };
    }

    case 'append':
      let { payload, identifier: getIdentifier } = action;

      if (getIdentifier) {
        const existing = state.items.map(getIdentifier);

        payload = payload.filter((newItem) => {
          return existing.includes(getIdentifier(newItem)) === false;
        });
      }

      const newItems = [...state.items, ...payload];

      return { ...state, items: newItems, choice: newItems[state.index] };

    default:
      return state; // do nothing
  }
}
