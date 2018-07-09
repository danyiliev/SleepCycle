import { all, fork } from 'redux-saga/effects';

import SleepCycle from './sleepcycle';

export default function* mainSaga() {
  yield all([fork(SleepCycle)]);
}
