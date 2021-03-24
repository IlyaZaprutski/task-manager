import {
  fetchProcessesSuccess,
  fetchProcessSuccess,
  createProcessSuccess,
  deleteProcessSuccess,
} from 'features/processes';

import { jobsReducer } from './jobsReducer';

describe('job reducer', () => {
  it('should ignore fetchProcessesSuccess action without jobs', () => {
    const state = {
      ids: ['a'],
      entities: {
        a: {
          id: 'a',
          processId: '1',
          name: 'test 1',
          status: 'running',
        },
      },
    };

    expect(jobsReducer(state, fetchProcessesSuccess({}))).toEqual(state);
  });

  it('should handle fetchProcessesSuccess action with jobs', () => {
    const state = {
      ids: ['a'],
      entities: {
        a: {
          id: 'a',
          processId: '1',
          name: 'test 1',
          status: 'running',
        },
      },
    };

    expect(
      jobsReducer(
        state,
        fetchProcessesSuccess({
          jobs: [
            {
              id: 'b',
              processId: '1',
              name: 'test 2',
              status: 'running',
            },
            {
              id: 'c',
              processId: '2',
              name: 'test 3',
              status: 'running',
            },
          ],
        })
      )
    ).toEqual({
      ids: ['a', 'b', 'c'],
      entities: {
        a: {
          id: 'a',
          processId: '1',
          name: 'test 1',
          status: 'running',
        },
        b: {
          id: 'b',
          processId: '1',
          name: 'test 2',
          status: 'running',
        },
        c: {
          id: 'c',
          processId: '2',
          name: 'test 3',
          status: 'running',
        },
      },
    });
  });

  it('should ignore fetchProcessSuccess action without jobs', () => {
    const state = {
      ids: ['a'],
      entities: {
        a: {
          id: 'a',
          processId: '1',
          name: 'test 1',
          status: 'running',
        },
      },
    };

    expect(jobsReducer(state, fetchProcessSuccess({ entities: {} }))).toEqual(state);
  });

  it('should handle fetchProcessSuccess action with jobs', () => {
    const state = {
      ids: ['a'],
      entities: {
        a: {
          id: 'a',
          processId: '1',
          name: 'test 1',
          status: 'running',
        },
      },
    };

    expect(
      jobsReducer(
        state,
        fetchProcessSuccess({
          entities: {
            jobs: [
              {
                id: 'b',
                processId: '1',
                name: 'test 2',
                status: 'running',
              },
            ],
          },
        })
      )
    ).toEqual({
      ids: ['a', 'b'],
      entities: {
        a: {
          id: 'a',
          processId: '1',
          name: 'test 1',
          status: 'running',
        },
        b: {
          id: 'b',
          processId: '1',
          name: 'test 2',
          status: 'running',
        },
      },
    });
  });

  it('should handle createProcessSuccess action without jobs', () => {
    const state = {
      ids: [],
      entities: {},
    };

    expect(
      jobsReducer(
        state,
        createProcessSuccess({
          entities: {
            jobs: [
              {
                id: 'b',
                processId: '1',
                name: 'test 1',
                status: 'running',
              },
              {
                id: 'a',
                processId: '2',
                name: 'test 2',
                status: 'running',
              },
            ],
          },
        })
      )
    ).toEqual({
      ids: ['b', 'a'],
      entities: {
        b: {
          id: 'b',
          processId: '1',
          name: 'test 1',
          status: 'running',
        },
        a: {
          id: 'a',
          processId: '2',
          name: 'test 2',
          status: 'running',
        },
      },
    });
  });

  it('should handle deleteProcessSuccess action', () => {
    const state = {
      ids: ['a', 'b'],
      entities: {
        a: {
          id: 'a',
          processId: '2',
          name: 'test 2',
          status: 'running',
        },
        b: {
          id: 'b',
          processId: '1',
          name: 'test 1',
          status: 'running',
        },
      },
    };

    expect(
      jobsReducer(
        state,
        deleteProcessSuccess({
          jobs: ['a', 'b'],
        })
      )
    ).toEqual({
      ids: [],
      entities: {},
    });
  });
});
