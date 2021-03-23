import { createReducer, createEntityAdapter } from '@reduxjs/toolkit';

import {
  fetchProcessesSuccess,
  fetchProcessSuccess,
  createProcessSuccess,
  deleteProcessSuccess,
} from 'features/processes';

const jobsAdapter = createEntityAdapter();

const initialState = jobsAdapter.getInitialState();

export const jobsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchProcessesSuccess, (state, action) => {
      if (action.payload.jobs) {
        jobsAdapter.upsertMany(state, action.payload.jobs);
      }
    })
    .addCase(fetchProcessSuccess, (state, action) => {
      if (action.payload.entities.jobs) {
        jobsAdapter.upsertMany(state, action.payload.entities.jobs);
      }
    })
    .addCase(createProcessSuccess, (state, action) => {
      jobsAdapter.addMany(state, action.payload.entities.jobs);
    })
    .addCase(deleteProcessSuccess, (state, action) => {
      const { jobs } = action.payload.process;

      jobsAdapter.removeMany(state, jobs);
    });
});
