import { handleActions, createAction } from 'redux-actions';

export const actions = {
  changeUser: 'SLEEPCYLCE/CHANGE_USER',
  setSleepData: 'SLEEPCYCLE/SET_SLEEP_DATA'
};

export const changeUser = createAction(actions.changeUser);

const initState = {
  userId: '',
  sleepData: {}
};

export default handleActions(
  {
    [actions.changeUser]: (state, { payload }) => ({
      ...state,
      userId: payload
    }),
    [actions.setSleepData]: (state, { payload }) => ({
      ...state,
      sleepData: payload
    })
  },
  initState
);
