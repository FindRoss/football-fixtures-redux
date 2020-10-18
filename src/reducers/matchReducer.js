import { FETCH_MATCHES_BEGIN, FETCH_MATCHES_SUCCESS, FETCH_MATCHES_ERROR } from '../actions/types';

const initialState = {
  matches: [],
  error: null,
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_MATCHES_BEGIN:
      return {
        ...state,
        loading: true,
      }
    case FETCH_MATCHES_SUCCESS:
      return {
        ...state,
        matches: action.payload,
        loading: false
      }
    case FETCH_MATCHES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        matches: []
      }
    default:
      return state;
  }
}