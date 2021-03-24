import { selectLoadingStatus, selectIsNewProcessCreating, selectDeletingProcessesIds } from './processesPageSelector';

describe('processes page selectors', () => {
  it('select loading status', () => {
    const state = {
      processPage: {
        loading: 'loading',
      },
    };

    expect(selectLoadingStatus(state)).toEqual('loading');
  });

  it('select is new process creating', () => {
    const state = {
      processPage: {
        isNewProcessCreating: false,
      },
    };

    expect(selectIsNewProcessCreating(state)).toEqual(false);
  });

  it('select deleting processes ids', () => {
    const ids = ['s', 'd', 'f'];

    const state = {
      processPage: {
        deletingProcessesIds: ids,
      },
    };

    expect(selectDeletingProcessesIds(state)).toEqual(ids);
  });
});
