import { createReducer } from '@reduxjs/toolkit';

import {
  fetchProcessesStarted,
  fetchProcessesSuccess,
  fetchProcessesFailed,
  cerateProcessStarted,
  createProcessSuccess,
  createProcessFailed,
} from 'features/processes';
import { LoadingStatuses } from 'features/lib';

import { leaveProcessPage } from './processesPageActions';

const initialState = {
  loading: LoadingStatuses.IDLE,
  isNewProcessCreating: false,
};

export const processesPageReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchProcessesStarted, (state) => {
    state.loading = LoadingStatuses.LOADING;
  });

  builder.addCase(fetchProcessesSuccess, (state) => {
    state.loading = LoadingStatuses.SUCCEEDED;
  });

  builder.addCase(fetchProcessesFailed, (state) => {
    state.loading = LoadingStatuses.FAILED;
  });

  builder.addCase(leaveProcessPage, (state) => {
    state.loading = LoadingStatuses.IDLE;
  });

  builder.addCase(cerateProcessStarted, (state) => {
    state.isNewProcessCreating = true;
  });

  builder.addCase(createProcessSuccess, (state) => {
    state.isNewProcessCreating = false;
  });

  builder.addCase(createProcessFailed, (state) => {
    state.isNewProcessCreating = false;
  });
});
