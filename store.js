/* eslint import/no-extraneous-dependencies: 0 */
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';

import reducer from './reducers';
import mainSaga from './reducers/sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mainSaga);

export default store;
export const persistor = persistStore(store);
