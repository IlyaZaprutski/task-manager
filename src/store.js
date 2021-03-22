import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { call, spawn, all } from 'redux-saga/effects';

import { jobsReducer } from 'features/jobs';
import { processesReducer, processesWatcher } from 'features/processes';
import { processJobsPageReducer } from 'features/processJobsPage';
import { processesPageReducer } from 'features/processesPage';
import { startPoll, pollSagaWatcher } from 'features/lib';

const sagaMiddleware = createSagaMiddleware();

const middleware = [
  ...getDefaultMiddleware({
    thunk: false,
    serializableCheck: {
      ignoredActions: [startPoll.toString()],
    },
  }),
  sagaMiddleware,
];

const store = configureStore({
  reducer: {
    processes: processesReducer,
    jobs: jobsReducer,
    processJobsPage: processJobsPageReducer,
    processPage: processesPageReducer,
  },
  middleware,
});

function* rootSaga() {
  const sagas = [pollSagaWatcher, processesWatcher];

  yield all(
    sagas.map((saga) =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.log(e);
          }
        }
      })
    )
  );
}

sagaMiddleware.run(rootSaga);

export default store;
