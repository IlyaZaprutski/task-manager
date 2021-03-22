import { delay, fork, put, call, race, take } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';

export const startPoll = createAction('POLL_START');
export const stopPoll = createAction('POLL_STOP');

function* pollSaga(config) {
  while (true) {
    try {
      if (!config.delay) {
        throw new Error('Polling delay must be configured!');
      }

      yield delay(config.delay);

      yield put(config.action(config.payload, config.meta));
    } catch (err) {
      yield put(stopPoll(err));
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
  while (true) {
    const action = yield take(startPoll);

    yield fork(pollController, action);
  }
}
