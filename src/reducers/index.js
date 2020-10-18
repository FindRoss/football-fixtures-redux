import { combineReducers } from 'redux';
import matchReducer from './matchReducer';
import leaguesReducer from './leaguesReducer';

export default combineReducers({
  fixtures: matchReducer,
  leagues: leaguesReducer
})
