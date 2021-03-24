import { delay, put, call, race, take, takeEvery } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';

export const startPoll = createAction('POLL_START');
export const stopPoll = createAction('POLL_STOP');

function* pollSaga(config) {
  while (true) {
    try {
      yield delay(config.delay);

      yield put(config.action(config.payload, config.meta));
    } catch (err) {
      yield put(stopPoll({ key: config.key, err }));
    }
  }
}

function* pollController(startAction) {
  yield race([
    call(pollSaga, startAction.payload),
    take((stopAction) => {
      return stopAction.type === stopPoll.toString() && stopAction.payload.key === startAction.payload.key;
    }),
  ]);
}

export function* pollSagaWatcher() {
  yield takeEvery(startPoll, pollController);
}
