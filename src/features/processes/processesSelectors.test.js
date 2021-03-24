import { selectAllProcessesWithStatus, selectProcessById } from './processesSelectors';

describe('process selectors', () => {
  it('select process by id', () => {
    const state = {
      processes: {
        ids: ['a', 'b'],
        entities: {
          a: {
            id: 'a',
            name: 'test a',
            startTime: 123556,
            jobsCount: 1,
          },
          b: {
            id: 'b',
            name: 'test b',
            startTime: 123456,
            jobsCount: 4,
          },
        },
      },
    };

    expect(selectProcessById(state, 'a')).toEqual({
      id: 'a',
      name: 'test a',
      startTime: 123556,
      jobsCount: 1,
    });
  });

  it('select all processes with status', () => {
    const state = {
      processes: {
        ids: ['a'],
        entities: {
          a: {
            id: 'a',
            name: 'test a',
            startTime: 123556,
            jobsCount: 2,
            jobs: ['a', 'b'],
          },
        },
      },
      jobs: {
        ids: ['a', 'b'],
        entities: {
          a: {
            id: 'a',
            processId: 'a',
            name: 'test 1',
            status: 'running',
          },
          b: {
            id: 'b',
            processId: 'a',
            name: 'test 2',
            status: 'succeeded',
          },
        },
      },
    };

    expect(selectAllProcessesWithStatus(state)).toEqual([
      {
        id: 'a',
        name: 'test a',
        startTime: 123556,
        jobsCount: 2,
        jobs: ['a', 'b'],
        status: 'running',
      },
    ]);
  });
});
