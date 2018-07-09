import { put, takeEvery, call } from 'redux-saga/effects';
import { hasIn } from 'lodash';

import { fetchSleepData } from '../../api/sleepcycle';

import { actions } from '../sleepcycle';
import { actions as appstateActions } from '../appstate';

function* fetchData(action) {
  const userId = action.payload;
  yield put({ type: appstateActions.resetError });
  yield put({ type: appstateActions.startLoading });
  try {
    const result = yield call(fetchSleepData, userId);
    if (hasIn(result, 'failed')) {
      yield put({
        type: appstateActions.errorOccurred,
        payload: result.reason
      });
    } else {
      yield put({
        type: actions.setSleepData,
        payload: result
      });
    }
    yield put({ type: appstateActions.finishLoading });
  } catch (err) {
    yield put({ type: appstateActions.errorOccurred, payload: err });
    yield put({ type: appstateActions.finishLoading });
  }
}

const AuthSaga = function* Auth() {
  yield takeEvery(actions.changeUser, fetchData);
};

export default AuthSaga;
