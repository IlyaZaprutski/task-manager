import { fetchProcessStarted, fetchProcessSuccess, fetchProcessFailed } from 'features/processes';

import { LoadingStatuses } from 'features/lib';

import { processJobsPageReducer } from './processJobsPageReducer';
import { leaveProcessJobPage } from './processJobsPageActions';

describe('process job page reducer', () => {
  it('should handle fetchProcessStarted action', () => {
    const state = {
      loading: LoadingStatuses.IDLE,
    };

    expect(processJobsPageReducer(state, fetchProcessStarted())).toEqual({
      loading: LoadingStatuses.LOADING,
    });
  });

  it('should handle fetchProcessSuccess action', () => {
    const state = {
      loading: LoadingStatuses.LOADING,
    };

    expect(processJobsPageReducer(state, fetchProcessSuccess())).toEqual({
      loading: LoadingStatuses.SUCCEEDED,
    });
  });

  it('should handle fetchProcessFailed action', () => {
    const state = {
      loading: LoadingStatuses.LOADING,
    };

    expect(processJobsPageReducer(state, fetchProcessFailed())).toEqual({
      loading: LoadingStatuses.FAILED,
    });
  });

  it('should handle leaveProcessPage action', () => {
    const state = {
      loading: LoadingStatuses.SUCCEEDED,
    };

    expect(processJobsPageReducer(state, leaveProcessJobPage())).toEqual({
      loading: LoadingStatuses.IDLE,
    });
  });
});
