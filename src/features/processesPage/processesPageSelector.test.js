import { selectLoadingStatus, selectIsNewProcessCreating } from './processesPageSelector';

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
});
