import { FETCH_MATCHES_BEGIN, FETCH_MATCHES_SUCCESS, FETCH_MATCHES_ERROR } from './types';
import axios from 'axios';

const head = {
  headers: {
    'X-Auth-Token': 'b4d8ff1cd4f848c7854b8eb2b8c13532'
  }
}

function fetchMatchesBegin() {
  return {
    type: FETCH_MATCHES_BEGIN
  }
}

function fetchMatchesSuccess(matches) {
  return {
    type: FETCH_MATCHES_SUCCESS,
    payload: matches
  }
}

function fetchMatchesError(error) {
  return {
    type: FETCH_MATCHES_ERROR,
    payload: error
  }
}

export const fetchMatches = (league) => dispatch => {
  dispatch(fetchMatchesBegin());
  axios.get(`http://api.football-data.org/v2/competitions/${league}/matches?status=SCHEDULED`, head)
    .then(res => dispatch(fetchMatchesSuccess(res.data)))
    .catch(error => {
      console.log(error);
      dispatch(fetchMatchesError(error))
    })
}