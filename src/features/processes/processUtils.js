import { nanoid } from 'nanoid';
import faker from 'faker';

import { JobStatuses } from 'features/lib';

const STATUSES = Object.values(JobStatuses);

export const getProcessStatus = (jobsStatuses = []) => {
  if (!jobsStatuses.length) {
    return 'n/a';
  }

  const jobsStatusesMap = new Set(jobsStatuses);

  if (jobsStatusesMap.has(JobStatuses.RUNNING)) {
    return 'running';
  }

  if (jobsStatusesMap.has(JobStatuses.FAILED)) {
    return 'failed';
  }

  return 'succeeded';
};

export const createProcess = () => {
  const processId = nanoid();

  const jobsCount = faker.random.number({
    min: 1,
    max: 10,
  });

  const jobs = new Array(jobsCount).fill(0).map(() => {
    return {
      id: nanoid(),
      processId: processId,
      name: faker.company.companyName(),
      status:
        STATUSES[
          faker.random.number({
            min: 0,
            max: STATUSES.length - 1,
          })
        ],
    };
  });

  const process = {
    id: processId,
    name: faker.system.commonFileName(),
    startTime: Date.now(),
    jobsCount: jobsCount,
    jobs: jobs,
  };

  return process;
};
