import { selectLoadingStatus } from './processJobsPageSelector';

describe('process job page selectors', () => {
  it('select loading status', () => {
    const state = {
      processJobsPage: {
        loading: 'loading',
      },
    };

    expect(selectLoadingStatus(state)).toEqual('loading');
  });
});
