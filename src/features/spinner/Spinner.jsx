import { memo } from 'react';

import { SpinnerContainer, Spin } from './spinnerStyle';

export const Spinner = memo(() => {
  return (
    <SpinnerContainer>
      <Spin>
        <Spin>
          <Spin>
            <Spin>
              <Spin>
                <Spin />
              </Spin>
            </Spin>
          </Spin>
        </Spin>
      </Spin>
    </SpinnerContainer>
  );
});
