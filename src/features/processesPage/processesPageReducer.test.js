import {
  fetchProcessesStarted,
  fetchProcessesSuccess,
  fetchProcessesFailed,
  cerateProcessStarted,
  createProcessSuccess,
  createProcessFailed,
  deleteProcessStarted,
  deleteProcessSuccess,
  deleteProcessFailed,
} from 'features/processes';

import { LoadingStatuses } from 'features/lib';

import { processesPageReducer } from './processesPageReducer';
import { leaveProcessPage } from './processesPageActions';

describe('processes page reducer', () => {
  it('should handle fetchProcessesStarted action', () => {
    const state = {
      loading: LoadingStatuses.IDLE,
      isNewProcessCreating: false,
      deletingProcessesIds: [],
    };

    expect(processesPageReducer(state, fetchProcessesStarted())).toEqual({
      loading: LoadingStatuses.LOADING,
      isNewProcessCreating: false,
      deletingProcessesIds: [],
    });
  });

  it('should handle fetchProcessesSuccess action', () => {
    const state = {
      loading: LoadingStatuses.LOADING,
      isNewProcessCreating: false,
      deletingProcessesIds: [],
    };

    expect(processesPageReducer(state, fetchProcessesSuccess())).toEqual({
      loading: LoadingStatuses.SUCCEEDED,
      isNewProcessCreating: false,
      deletingProcessesIds: [],
    });
  });

  it('should handle fetchProcessesFailed action', () => {
    const state = {
      loading: LoadingStatuses.LOADING,
      isNewProcessCreating: false,
      deletingProcessesIds: [],
    };

    expect(processesPageReducer(state, fetchProcessesFailed())).toEqual({
      loading: LoadingStatuses.FAILED,
      isNewProcessCreating: false,
      deletingProcessesIds: [],
    });
  });

  it('should handle cerateProcessStarted action', () => {
    const state = {
      loading: LoadingStatuses.SUCCEEDED,
      isNewProcessCreating: false,
      deletingProcessesIds: [],
    };

    expect(processesPageReducer(state, cerateProcessStarted())).toEqual({
      loading: LoadingStatuses.SUCCEEDED,
      isNewProcessCreating: true,
      deletingProcessesIds: [],
    });
  });

  it('should handle createProcessSuccess action', () => {
    const state = {
      loading: LoadingStatuses.SUCCEEDED,
      isNewProcessCreating: false,
      deletingProcessesIds: [],
    };

    expect(processesPageReducer(state, createProcessSuccess())).toEqual({
      loading: LoadingStatuses.SUCCEEDED,
      isNewProcessCreating: false,
      deletingProcessesIds: [],
    });
  });

  it('should handle createProcessFailed action', () => {
    const state = {
      loading: LoadingStatuses.SUCCEEDED,
      isNewProcessCreating: true,
      deletingProcessesIds: [],
    };

    expect(processesPageReducer(state, createProcessFailed())).toEqual({
      loading: LoadingStatuses.SUCCEEDED,
      isNewProcessCreating: false,
      deletingProcessesIds: [],
    });
  });

  it('should handle leaveProcessPage action', () => {
    const state = {
      loading: LoadingStatuses.SUCCEEDED,
      isNewProcessCreating: false,
      deletingProcessesIds: [],
    };

    expect(processesPageReducer(state, leaveProcessPage())).toEqual({
      loading: LoadingStatuses.IDLE,
      isNewProcessCreating: false,
      deletingProcessesIds: [],
    });
  });

  it('should handle deleteProcessStarted action', () => {
    const state = {
      loading: LoadingStatuses.SUCCEEDED,
      isNewProcessCreating: false,
      deletingProcessesIds: [],
    };

    const process = {
      id: 'a',
      name: 'test',
      startTime: 123456,
      jobsCount: 1,
      jobs: ['a'],
    };

    expect(processesPageReducer(state, deleteProcessStarted(process))).toEqual({
      loading: LoadingStatuses.SUCCEEDED,
      isNewProcessCreating: false,
      deletingProcessesIds: [process.id],
    });
  });

  it('should handle deleteProcessSuccess action', () => {
    const state = {
      loading: LoadingStatuses.SUCCEEDED,
      isNewProcessCreating: false,
      deletingProcessesIds: ['a', 'b'],
    };

    const process = {
      id: 'a',
      name: 'test',
      startTime: 123456,
      jobsCount: 1,
      jobs: ['a'],
    };

    expect(processesPageReducer(state, deleteProcessSuccess(process))).toEqual({
      loading: LoadingStatuses.SUCCEEDED,
      isNewProcessCreating: false,
      deletingProcessesIds: ['b'],
    });
  });

  it('should handle deleteProcessFailed action', () => {
    const state = {
      loading: LoadingStatuses.SUCCEEDED,
      isNewProcessCreating: false,
      deletingProcessesIds: ['a', 'b'],
    };

    const process = {
      id: 'a',
      name: 'test',
      startTime: 123456,
      jobsCount: 1,
      jobs: ['a'],
    };

    expect(processesPageReducer(state, deleteProcessFailed(process))).toEqual({
      loading: LoadingStatuses.SUCCEEDED,
      isNewProcessCreating: false,
      deletingProcessesIds: ['b'],
    });
  });
});
