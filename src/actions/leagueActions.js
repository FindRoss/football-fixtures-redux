import { FETCH_LEAGUES_BEGIN, FETCH_LEAGUES_SUCCESS, FETCH_LEAGUES_ERROR } from './types';
import axios from 'axios';

const head = {
  headers: {
    'X-Auth-Token': 'b4d8ff1cd4f848c7854b8eb2b8c13532'
  }
}

function fetchLeaguesBegin() {
  return {
    type: FETCH_LEAGUES_BEGIN
  }
}

function fetchLeaguesSuccess(matches) {
  return {
    type: FETCH_LEAGUES_SUCCESS,
    payload: matches
  }
}

function fetchLeaguesError(error) {
  return {
    type: FETCH_LEAGUES_ERROR,
    payload: error
  }
}

export const fetchLeagues = () => dispatch => {
  dispatch(fetchLeaguesBegin());
  axios.get(`https://api.football-data.org/v2/competitions?plan=TIER_ONE`, head)
    .then(res => dispatch(fetchLeaguesSuccess(res.data)))
    .catch(error => dispatch(fetchLeaguesError(error)))
}