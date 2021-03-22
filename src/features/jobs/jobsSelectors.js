import { createSelector } from '@reduxjs/toolkit';

export const selectJobsByProcessId = createSelector(
  (state, processId) => processId,
  (state) => state.jobs,
  (processId, { ids, entities }) => {
    const jobs = ids.map((id) => entities[id]);

    return jobs.filter((job) => job.processId === processId);
  }
);
