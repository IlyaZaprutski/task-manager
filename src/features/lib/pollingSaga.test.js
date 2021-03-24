import { expectSaga } from 'redux-saga-test-plan';

import { pollSagaWatcher, startPoll } from './pollingSaga';

describe('polling saga', () => {
  it('run polling saga', async () => {
    const action = () => {
      return {
        type: 'test',
      };
    };

    const { effects } = await expectSaga(pollSagaWatcher)
      .delay(2000)
      .dispatch(
        startPoll({
          action: action,
          key: 'test',
          delay: 100,
        })
      )
      .run(3000);

    expect(effects.put).toHaveLength(9);
  });
});
