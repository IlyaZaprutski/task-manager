import { selectJobsByProcessId } from './jobsSelectors';

describe('jobs selectors', () => {
  it('should handle fetchProcessesStarted action', () => {
    const processId = 'abc';

    const state = {
      jobs: {
        ids: ['a', 'b', 'c'],
        entities: {
          a: {
            id: 'a',
            processId: processId,
            name: 'test 1',
            status: 'running',
          },
          b: {
            id: 'b',
            processId: 'fgh',
            name: 'test 2',
            status: 'succeeded',
          },
          c: {
            id: 'c',
            processId: processId,
            name: 'test 3',
            status: 'failed',
          },
        },
      },
    };

    expect(selectJobsByProcessId(state, processId)).toEqual([
      {
        id: 'a',
        processId: processId,
        name: 'test 1',
        status: 'running',
      },
      {
        id: 'c',
        processId: processId,
        name: 'test 3',
        status: 'failed',
      },
    ]);
  });
});
