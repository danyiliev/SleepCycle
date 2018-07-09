import { handleActions, createAction } from 'redux-actions';

export const actions = {
  startLoading: 'APPSTATE/START_LOADING',
  finishLoading: 'APPSTATE/FINISH_LOADING',
  errorOccurred: 'APPSTATE/ON_ERROR',
  resetError: 'APPSTATE/RESET_ERROR'
};

export const startLoading = createAction(actions.startLoading);
export const finishLoading = createAction(actions.finishLoading);
export const errorOccurred = createAction(actions.errorOccurred);

const initState = {
  loading: false,
  error: {}
};

export default handleActions(
  {
    [actions.startLoading]: state => ({
      ...state,
      loading: true
    }),
    [actions.finishLoading]: state => ({
      ...state,
      loading: false
    }),
    [actions.errorOccurred]: (state, { payload }) => ({
      ...state,
      error: payload
    }),
    [actions.resetError]: state => ({
      ...state,
      error: {}
    })
  },
  initState
);
