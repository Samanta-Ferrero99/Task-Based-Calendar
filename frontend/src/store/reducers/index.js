import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import userReducer from './user';

const buildRootReducer = (history) => {
  const reducer = combineReducers({
    router: connectRouter(history),
    user: userReducer
  });
  return reducer;
}

export default buildRootReducer;
