import {
  fetchProcessesStarted,
  fetchProcessesSuccess,
  fetchProcessesFailed,
  cerateProcessStarted,
  createProcessSuccess,
  createProcessFailed,
} from 'features/processes';

import { LoadingStatuses } from 'features/lib';

import { processesPageReducer } from './processesPageReducer';
import { leaveProcessPage } from './processesPageActions';

describe('processes page reducer', () => {
  it('should handle fetchProcessesStarted action', () => {
    const state = {
      loading: LoadingStatuses.IDLE,
      isNewProcessCreating: false,
    };

    expect(processesPageReducer(state, fetchProcessesStarted())).toEqual({
      loading: LoadingStatuses.LOADING,
      isNewProcessCreating: false,
    });
  });

  it('should handle fetchProcessesSuccess action', () => {
    const state = {
      loading: LoadingStatuses.LOADING,
      isNewProcessCreating: false,
    };

    expect(processesPageReducer(state, fetchProcessesSuccess())).toEqual({
      loading: LoadingStatuses.SUCCEEDED,
      isNewProcessCreating: false,
    });
  });

  it('should handle fetchProcessesFailed action', () => {
    const state = {
      loading: LoadingStatuses.LOADING,
      isNewProcessCreating: false,
    };

    expect(processesPageReducer(state, fetchProcessesFailed())).toEqual({
      loading: LoadingStatuses.FAILED,
      isNewProcessCreating: false,
    });
  });

  it('should handle cerateProcessStarted action', () => {
    const state = {
      loading: LoadingStatuses.SUCCEEDED,
      isNewProcessCreating: false,
    };

    expect(processesPageReducer(state, cerateProcessStarted())).toEqual({
      loading: LoadingStatuses.SUCCEEDED,
      isNewProcessCreating: true,
    });
  });

  it('should handle createProcessSuccess action', () => {
    const state = {
      loading: LoadingStatuses.SUCCEEDED,
      isNewProcessCreating: false,
    };

    expect(processesPageReducer(state, createProcessSuccess())).toEqual({
      loading: LoadingStatuses.SUCCEEDED,
      isNewProcessCreating: false,
    });
  });

  it('should handle createProcessFailed action', () => {
    const state = {
      loading: LoadingStatuses.SUCCEEDED,
      isNewProcessCreating: true,
    };

    expect(processesPageReducer(state, createProcessFailed())).toEqual({
      loading: LoadingStatuses.SUCCEEDED,
      isNewProcessCreating: false,
    });
  });

  it('should handle leaveProcessPage action', () => {
    const state = {
      loading: LoadingStatuses.SUCCEEDED,
      isNewProcessCreating: false,
    };

    expect(processesPageReducer(state, leaveProcessPage())).toEqual({
      loading: LoadingStatuses.IDLE,
      isNewProcessCreating: false,
    });
  });
});
