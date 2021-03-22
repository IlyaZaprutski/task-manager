import { createReducer, createEntityAdapter } from '@reduxjs/toolkit';

import {
  fetchProcessSuccess,
  fetchProcessesSuccess,
  createProcessSuccess,
  deleteProcessSuccess,
} from './processesActions';

const processesAdapter = createEntityAdapter();

const initialState = processesAdapter.getInitialState();

export const processesReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchProcessesSuccess, (state, action) => {
    if (action.payload.processes) {
      processesAdapter.upsertMany(state, action.payload.processes);
    }
  });

  builder.addCase(fetchProcessSuccess, (state, action) => {
    const { entities, result } = action.payload;
    const newProcess = entities.processes[result];

    processesAdapter.upsertOne(state, newProcess);
  });

  builder.addCase(createProcessSuccess, (state, action) => {
    const { entities, result } = action.payload;
    const newProcess = entities.processes[result];

    processesAdapter.addOne(state, newProcess);
  });

  builder.addCase(deleteProcessSuccess, (state, action) => {
    processesAdapter.removeOne(state, action.payload.process.id);
  });
});
