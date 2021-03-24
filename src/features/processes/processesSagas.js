import { call, put, takeLatest, takeEvery, select } from 'redux-saga/effects';
import axios from 'axios';
import { normalize } from 'normalizr';
import { toast } from 'react-toastify';

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
import { createProcess } from './processUtils';

axios.defaults.baseURL = 'http://localhost:3001';

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

    toast.error(error.message || 'Something went wrong');
  }
}

function* handleFetchProcessAction(action) {
  const { id } = action.payload;

  try {
    yield put(fetchProcessStarted({ id }));

    yield call(fetchProcess, id);
  } catch (error) {
    yield put(fetchProcessFailed({ id }));
    toast.error(error.message || 'Something went wrong');
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

    const process = createProcess();

    const { data } = yield call(axios, {
      method: 'post',
      url: '/api/createProcess',
      data: process,
    });

    const normalizedProcess = normalize(data, processEntitySchema);

    yield put(createProcessSuccess(normalizedProcess));

    toast.success(`New process added: ${process.id}`);
  } catch (error) {
    yield put(createProcessFailed());
    toast.error(error.message || 'Something went wrong');
  }
}

function* handleDeleteProcessAction(action) {
  const { id } = action.payload;

  const process = yield select((state) => selectProcessById(state, id));

  try {
    yield put(deleteProcessStarted(process));

    yield call(axios, {
      method: 'delete',
      url: `/processes/${id}`,
    });

    yield put(deleteProcessSuccess(process));

    toast.success(`Process deleted: ${process.name}`);
  } catch (error) {
    yield put(deleteProcessFailed(process));
    toast.error(error.message || 'Something went wrong');
  }
}

export function* processesWatcher() {
  yield takeLatest(fetchProcessesInBackgroundAction, fetchProcessesInBackground);
  yield takeLatest(fetchProcessesAction, handleFetchProcessesAction);
  yield takeLatest(fetchProcessAction, handleFetchProcessAction);
  yield takeEvery(createProcessAction, handleCreateProcessAction);
  yield takeEvery(deleteProcessAction, handleDeleteProcessAction);
}
