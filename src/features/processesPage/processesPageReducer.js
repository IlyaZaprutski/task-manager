import { createReducer } from '@reduxjs/toolkit';

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

import { leaveProcessPage } from './processesPageActions';

const initialState = {
  loading: LoadingStatuses.IDLE,
  isNewProcessCreating: false,
  deletingProcessesIds: [],
};

export const processesPageReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchProcessesStarted, (state) => {
      state.loading = LoadingStatuses.LOADING;
    })
    .addCase(fetchProcessesSuccess, (state) => {
      state.loading = LoadingStatuses.SUCCEEDED;
    })
    .addCase(fetchProcessesFailed, (state) => {
      state.loading = LoadingStatuses.FAILED;
    })
    .addCase(leaveProcessPage, (state) => {
      state.loading = LoadingStatuses.IDLE;
    })
    .addCase(cerateProcessStarted, (state) => {
      state.isNewProcessCreating = true;
    })
    .addCase(createProcessSuccess, (state) => {
      state.isNewProcessCreating = false;
    })
    .addCase(createProcessFailed, (state) => {
      state.isNewProcessCreating = false;
    })
    .addCase(deleteProcessStarted, (state, action) => {
      state.deletingProcessesIds.push(action.payload.id);
    })
    .addCase(deleteProcessSuccess, (state, action) => {
      state.deletingProcessesIds = state.deletingProcessesIds.filter((x) => x !== action.payload.id);
    })
    .addCase(deleteProcessFailed, (state, action) => {
      state.deletingProcessesIds = state.deletingProcessesIds.filter((x) => x !== action.payload.id);
    });
});
