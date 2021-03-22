import { createReducer } from '@reduxjs/toolkit';

import { fetchProcessStarted, fetchProcessSuccess, fetchProcessFailed } from 'features/processes';
import { LoadingStatuses } from 'features/lib';

import { leaveProcessJobPage } from './processJobsPageActions';

const initialState = {
  loading: LoadingStatuses.IDLE,
};

export const processJobsPageReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchProcessStarted, (state) => {
    state.loading = LoadingStatuses.LOADING;
  });

  builder.addCase(fetchProcessSuccess, (state) => {
    state.loading = LoadingStatuses.SUCCEEDED;
  });

  builder.addCase(fetchProcessFailed, (state) => {
    state.loading = LoadingStatuses.FAILED;
  });

  builder.addCase(leaveProcessJobPage, (state) => {
    state.loading = LoadingStatuses.IDLE;
  });
});
