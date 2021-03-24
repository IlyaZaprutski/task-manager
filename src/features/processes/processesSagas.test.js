import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import axios from 'axios';

import {
  deleteProcess,
  deleteProcessStarted,
  deleteProcessSuccess,
  deleteProcessFailed,
  cerateProcess,
  cerateProcessStarted,
  createProcessSuccess,
  createProcessFailed,
  fetchProcess,
  fetchProcessStarted,
  fetchProcessSuccess,
  fetchProcessFailed,
  fetchProcesses,
  fetchProcessesStarted,
  fetchProcessesSuccess,
  fetchProcessesFailed,
  fetchProcessesInBackground,
} from './processesActions';

import { processesWatcher } from './processesSagas';

describe('process sagas', () => {
  it('handle delete process', () => {
    const process = {
      id: 'a',
      name: 'test',
      startTime: 123456,
      jobsCount: 1,
      jobs: ['a'],
    };

    const storeState = {
      processes: {
        ids: [process.id],
        entities: {
          [process.id]: process,
        },
      },
    };

    return expectSaga(processesWatcher)
      .withState(storeState)
      .provide([[matchers.call.fn(axios)]])
      .put(deleteProcessSuccess(process))
      .put(deleteProcessStarted(process))
      .dispatch(deleteProcess(process))
      .silentRun();
  });

  it('handle delete process with error', () => {
    const process = {
      id: 'a',
      name: 'test',
      startTime: 123456,
      jobsCount: 1,
      jobs: ['a'],
    };

    const storeState = {
      processes: {
        ids: [process.id],
        entities: {
          [process.id]: process,
        },
      },
    };

    return expectSaga(processesWatcher)
      .withState(storeState)
      .provide([[matchers.call.fn(axios), throwError(new Error('test error'))]])
      .put(deleteProcessFailed(process))
      .put(deleteProcessStarted(process))
      .dispatch(deleteProcess(process))
      .silentRun();
  });

  it('handle cerate process', () => {
    const process = {
      id: '8fe5mvXMwwn_7QIi-TQgZ',
      name: 'invoice.gif',
      startTime: 1616582320117,
      jobsCount: 1,
      jobs: [
        {
          id: 'MuHmuVB9MZgYHxbGR5iDM',
          processId: '8fe5mvXMwwn_7QIi-TQgZ',
          name: 'Marvin Group',
          status: 'running',
        },
      ],
    };

    return expectSaga(processesWatcher)
      .provide([[matchers.call.fn(axios), { data: process }]])
      .put(
        createProcessSuccess({
          entities: {
            processes: {
              [process.id]: {
                ...process,
                jobs: process.jobs.map((x) => x.id),
              },
            },
            jobs: process.jobs.reduce((a, x) => ({ ...a, [x.id]: x }), {}),
          },
          result: process.id,
        })
      )
      .put(cerateProcessStarted())
      .dispatch(cerateProcess())
      .silentRun();
  });

  it('handle cerate process with error', () => {
    return expectSaga(processesWatcher)
      .provide([[matchers.call.fn(axios), throwError(new Error('test error'))]])
      .put(createProcessFailed())
      .put(cerateProcessStarted())
      .dispatch(cerateProcess())
      .silentRun();
  });

  it('handle fetch process by id', () => {
    const process = {
      id: '8fe5mvXMwwn_7QIi-TQgZ',
      name: 'invoice.gif',
      startTime: 1616582320117,
      jobsCount: 1,
      jobs: [
        {
          id: 'MuHmuVB9MZgYHxbGR5iDM',
          processId: '8fe5mvXMwwn_7QIi-TQgZ',
          name: 'Marvin Group',
          status: 'running',
        },
      ],
    };

    return expectSaga(processesWatcher)
      .provide([[matchers.call.fn(axios), { data: process }]])
      .put(
        fetchProcessSuccess({
          entities: {
            processes: {
              [process.id]: {
                ...process,
                jobs: process.jobs.map((x) => x.id),
              },
            },
            jobs: process.jobs.reduce((a, x) => ({ ...a, [x.id]: x }), {}),
          },
          result: process.id,
        })
      )
      .put(fetchProcessStarted({ id: process.id }))
      .dispatch(fetchProcess({ id: process.id }))
      .silentRun();
  });

  it('handle fetch process by id with error', () => {
    const processId = 'a';

    return expectSaga(processesWatcher)
      .provide([[matchers.call.fn(axios), throwError(new Error('test error'))]])
      .put(fetchProcessFailed({ id: processId }))
      .put(fetchProcessStarted({ id: processId }))
      .dispatch(fetchProcess({ id: processId }))
      .silentRun();
  });

  it('handle fetch processes', () => {
    const process = {
      id: '8fe5mvXMwwn_7QIi-TQgZ',
      name: 'invoice.gif',
      startTime: 1616582320117,
      jobsCount: 1,
      jobs: [
        {
          id: 'MuHmuVB9MZgYHxbGR5iDM',
          processId: '8fe5mvXMwwn_7QIi-TQgZ',
          name: 'Marvin Group',
          status: 'running',
        },
      ],
    };

    return expectSaga(processesWatcher)
      .provide([[matchers.call.fn(axios), { data: [process] }]])
      .put(
        fetchProcessesSuccess({
          processes: {
            [process.id]: {
              ...process,
              jobs: process.jobs.map((x) => x.id),
            },
          },
          jobs: process.jobs.reduce((a, x) => ({ ...a, [x.id]: x }), {}),
        })
      )
      .put(fetchProcessesStarted())
      .dispatch(fetchProcesses())
      .silentRun();
  });

  it('handle fetch processes with error', () => {
    return expectSaga(processesWatcher)
      .provide([[matchers.call.fn(axios), throwError(new Error('test error'))]])
      .put(fetchProcessesFailed())
      .put(fetchProcessesStarted())
      .dispatch(fetchProcesses())
      .silentRun();
  });

  it('handle fetch process in background', () => {
    const process = {
      id: '8fe5mvXMwwn_7QIi-TQgZ',
      name: 'invoice.gif',
      startTime: 1616582320117,
      jobsCount: 1,
      jobs: [
        {
          id: 'MuHmuVB9MZgYHxbGR5iDM',
          processId: '8fe5mvXMwwn_7QIi-TQgZ',
          name: 'Marvin Group',
          status: 'running',
        },
      ],
    };

    return expectSaga(processesWatcher)
      .provide([[matchers.call.fn(axios), { data: process }]])
      .put(
        fetchProcessSuccess({
          entities: {
            processes: {
              [process.id]: {
                ...process,
                jobs: process.jobs.map((x) => x.id),
              },
            },
            jobs: process.jobs.reduce((a, x) => ({ ...a, [x.id]: x }), {}),
          },
          result: process.id,
        })
      )
      .dispatch(fetchProcessesInBackground({ id: process.id }))
      .silentRun();
  });

  it('handle fetch processes in background', () => {
    const process = {
      id: '8fe5mvXMwwn_7QIi-TQgZ',
      name: 'invoice.gif',
      startTime: 1616582320117,
      jobsCount: 1,
      jobs: [
        {
          id: 'MuHmuVB9MZgYHxbGR5iDM',
          processId: '8fe5mvXMwwn_7QIi-TQgZ',
          name: 'Marvin Group',
          status: 'running',
        },
      ],
    };

    return expectSaga(processesWatcher)
      .provide([[matchers.call.fn(axios), { data: [process] }]])
      .put(
        fetchProcessesSuccess({
          processes: {
            [process.id]: {
              ...process,
              jobs: process.jobs.map((x) => x.id),
            },
          },
          jobs: process.jobs.reduce((a, x) => ({ ...a, [x.id]: x }), {}),
        })
      )
      .dispatch(fetchProcessesInBackground({}))
      .silentRun();
  });
});
