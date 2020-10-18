import {
  FETCH_LEAGUES_BEGIN,
  FETCH_LEAGUES_SUCCESS,
  FETCH_LEAGUES_ERROR,
  LEAGUE_SELECTED
} from "../actions/types";

const initialState = {
  leagues: [],
  error: null,
  loading: false,
  selected: {
    label: "Premier League",
    value: 2021
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_LEAGUES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_LEAGUES_SUCCESS:
      return {
        ...state,
        leagues: action.payload,
        loading: false,
        error: null
      };
    case FETCH_LEAGUES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        leagues: []
      };
    case LEAGUE_SELECTED:
      return {
        ...state,
        selected: action.payload
      };
    default:
      return state;
  }
}
