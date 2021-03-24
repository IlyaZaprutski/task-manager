import { JobStatuses } from 'features/lib';

import { getProcessStatus } from './processUtils';

describe('process utils', () => {
  it('process empty list of jobs', () => {
    expect(getProcessStatus([])).toEqual('n/a');
  });

  it('status of the process must be running when at least one job is in a state of running', () => {
    const jobsStatuses = [JobStatuses.SUCCEEDED, JobStatuses.RUNNING, JobStatuses.FAILED];

    expect(getProcessStatus(jobsStatuses)).toEqual('running');
  });

  it('status of the process must be failed when all jobs finished and at least one job is in a state of failed', () => {
    const jobsStatuses = [JobStatuses.SUCCEEDED, JobStatuses.RUNNING, JobStatuses.FAILED];

    expect(getProcessStatus(jobsStatuses)).toEqual('running');
  });

  it('status of the process must be succeeded when all jobs have status succeeded', () => {
    const jobsStatuses = [JobStatuses.SUCCEEDED, JobStatuses.SUCCEEDED];

    expect(getProcessStatus(jobsStatuses)).toEqual('succeeded');
  });
});
