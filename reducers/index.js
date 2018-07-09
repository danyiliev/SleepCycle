import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import appstate from './appstate';
import sleepcycle from './sleepcycle';

const persistConfig = {
  key: 'root',
  storage
};

export default persistCombineReducers(persistConfig, {
  sleepcycle,
  appstate
});
