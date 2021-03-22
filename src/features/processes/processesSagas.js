import { call, put, takeLatest, takeEvery, select } from 'redux-saga/effects';
import axios from 'axios';
import { normalize } from 'normalizr';
import { nanoid } from 'nanoid';
import faker from 'faker';

import { JobStatuses } from 'features/lib';

import {
  fetchProcesses as fetchProcessesAction,
  fetchProcessesStarted,
  fetchProcessesSuccess,
  fetchProcessesFailed,
  fetchProcess as fetchProcessAction,
  fetchProcessStarted,
  fetchProcessSuccess,
  fetchProcessFailed,
  fetchProcessesInBackground as fetchProcessesInBackgroundAction,
  cerateProcess as createProcessAction,
  cerateProcessStarted,
  createProcessSuccess,
  createProcessFailed,
  deleteProcess as deleteProcessAction,
  deleteProcessStarted,
  deleteProcessSuccess,
  deleteProcessFailed,
} from './processesActions';

import { processEntitySchema } from './processesSchema';
import { selectProcessById } from './processesSelectors';

axios.defaults.baseURL = 'http://localhost:3001';

const STATUSES = Object.values(JobStatuses);

function* fetchProcess(id) {
  const { data } = yield call(axios, {
    method: 'get',
    url: `/processes/${id}?_embed=jobs`,
  });

  const normalizedProcess = normalize(data, processEntitySchema);

  yield put(fetchProcessSuccess(normalizedProcess));
}

function* fetchProcesses() {
  const { data } = yield call(axios, {
    method: 'get',
    url: '/processes?_embed=jobs',
  });

  const normalizedProcesses = normalize(data, [processEntitySchema]);

  yield put(fetchProcessesSuccess(normalizedProcesses.entities));
}

function* handleFetchProcessesAction() {
  try {
    yield put(fetchProcessesStarted());

    yield call(fetchProcesses);
  } catch (error) {
    yield put(fetchProcessesFailed());

    alert(error.message || 'Something went wrong');
  }
}

function* handleFetchProcessAction(action) {
  const { id } = action.payload;

  try {
    yield put(fetchProcessStarted());

    yield call(fetchProcess, id);
  } catch (error) {
    yield put(fetchProcessFailed({ id }));
    alert(error.message || 'Something went wrong');
  }
}

function* fetchProcessesInBackground(action) {
  const { id } = action.payload;

  if (id) {
    yield call(fetchProcess, id);

    return;
  }

  yield call(fetchProcesses);
}

function* handleCreateProcessAction() {
  try {
    yield put(cerateProcessStarted());

    const processId = nanoid();

    const jobsCount = faker.random.number({
      min: 1,
      max: 10,
    });

    const jobs = new Array(jobsCount).fill(0).map(() => {
      return {
        id: nanoid(),
        processId: processId,
        name: faker.company.companyName(),
        status:
          STATUSES[
            faker.random.number({
              min: 0,
              max: STATUSES.length - 1,
            })
          ],
      };
    });

    const process = {
      id: processId,
      name: faker.system.commonFileName(),
      startTime: Date.now(),
      jobsCount: jobsCount,
      jobs: jobs,
    };

    const { data } = yield call(axios, {
      method: 'post',
      url: '/api/createProcess',
      data: process,
    });

    const normalizedProcess = normalize(data, processEntitySchema);

    yield put(createProcessSuccess(normalizedProcess));

    alert(`New process added: ${processId}`);
  } catch (error) {
    yield put(createProcessFailed);
    alert(error.message || 'Something went wrong');
  }
}

function* handleDeleteProcessAction(action) {
  const { id } = action.payload;

  const process = yield select((state) => selectProcessById(state, id));

  try {
    yield put(deleteProcessStarted({ process }));

    yield call(axios, {
      method: 'delete',
      url: `/processes/${id}`,
    });

    yield put(deleteProcessSuccess({ process }));

    alert(`Process deleted: ${process.name}`);
  } catch (error) {
    yield put(deleteProcessFailed({ process }));

    alert(error.message || 'Something went wrong');
  }
}

export function* processesWatcher() {
  yield takeLatest(fetchProcessesInBackgroundAction, fetchProcessesInBackground);
  yield takeLatest(fetchProcessesAction, handleFetchProcessesAction);
  yield takeLatest(fetchProcessAction, handleFetchProcessAction);
  yield takeEvery(createProcessAction, handleCreateProcessAction);
  yield takeEvery(deleteProcessAction, handleDeleteProcessAction);
}
