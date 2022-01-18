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

    case 'new':
      const index = action.index != null ? action.index : state.index;
      const items = Array.isArray(action.payload)
        ? [...state.items, ...action.payload]
        : [...state.items, action.payload];
      const choice = items[index];

      return { ...state, index, items, choice };

    default:
      return state; // do nothing
  }
}
