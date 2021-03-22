import { createSelector } from '@reduxjs/toolkit';

import { JobStatuses } from 'features/lib';

const getProcessStatus = (jobsStatuses) => {
  const jobsStatusesMap = new Set(jobsStatuses);

  if (jobsStatusesMap.has(JobStatuses.RUNNING)) {
    return 'running';
  }

  if (jobsStatusesMap.has(JobStatuses.FAILED)) {
    return 'failed';
  }

  return 'succeeded';
};

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
