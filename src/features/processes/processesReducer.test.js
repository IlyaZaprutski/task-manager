import {
  fetchProcessSuccess,
  fetchProcessesSuccess,
  createProcessSuccess,
  deleteProcessSuccess,
} from './processesActions';

import { processesReducer } from './processesReducer';

describe('processes reducer', () => {
  it('should ignore fetchProcessesSuccess action without processes', () => {
    const state = {
      ids: [],
      entities: {},
    };

    expect(processesReducer(state, fetchProcessesSuccess({}))).toEqual(state);
  });

  it('should handle fetchProcessesSuccess action with processes', () => {
    const state = {
      ids: [],
      entities: {},
    };

    expect(
      processesReducer(
        state,
        fetchProcessesSuccess({
          processes: [
            {
              id: 'a',
              name: 'test',
              startTime: 123456,
              jobsCount: 1,
            },
          ],
        })
      )
    ).toEqual({
      ids: ['a'],
      entities: {
        a: {
          id: 'a',
          name: 'test',
          startTime: 123456,
          jobsCount: 1,
        },
      },
    });
  });

  it('should handle fetchProcessSuccess action', () => {
    const state = {
      ids: [],
      entities: {},
    };

    expect(
      processesReducer(
        state,
        fetchProcessSuccess({
          result: 'a',
          entities: {
            processes: {
              a: {
                id: 'a',
                name: 'test',
                startTime: 123456,
                jobsCount: 1,
              },
            },
          },
        })
      )
    ).toEqual({
      ids: ['a'],
      entities: {
        a: {
          id: 'a',
          name: 'test',
          startTime: 123456,
          jobsCount: 1,
        },
      },
    });
  });

  it('should handle createProcessSuccess action', () => {
    const state = {
      ids: [],
      entities: {},
    };

    expect(
      processesReducer(
        state,
        createProcessSuccess({
          result: 'a',
          entities: {
            processes: {
              a: {
                id: 'a',
                name: 'test',
                startTime: 123456,
                jobsCount: 1,
              },
            },
          },
        })
      )
    ).toEqual({
      ids: ['a'],
      entities: {
        a: {
          id: 'a',
          name: 'test',
          startTime: 123456,
          jobsCount: 1,
        },
      },
    });
  });

  it('should handle deleteProcessSuccess action', () => {
    const state = {
      ids: ['a'],
      entities: {
        a: {
          id: 'a',
          name: 'test',
          startTime: 123456,
          jobsCount: 1,
        },
      },
    };

    expect(
      processesReducer(
        state,
        deleteProcessSuccess({
          process: {
            id: 'a',
            name: 'test',
            startTime: 123456,
            jobsCount: 1,
          },
        })
      )
    ).toEqual({
      ids: [],
      entities: {},
    });
  });
});
