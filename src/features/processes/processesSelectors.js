import { createSelector } from '@reduxjs/toolkit';

import { getProcessStatus } from './processUtils';

export const selectAllProcessesWithStatus = createSelector(
  (state) => state.processes,
  (state) => state.jobs,
  (processes, jobs) => {
    return processes.ids.map((id) => {
      const process = processes.entities[id];
      const jobsStatuses = process.jobs.map((jobId) => jobs.entities[jobId].status);

      return {
        ...processes.entities[id],
        status: getProcessStatus(jobsStatuses),
      };
    });
  }
);

export const selectProcessById = createSelector(
  (state, id) => id,
  (state) => state.processes,
  (processId, { entities }) => {
    const process = entities[processId];

    return process;
  }
);
