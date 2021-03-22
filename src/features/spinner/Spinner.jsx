import { memo } from 'react';

import { SpinnerContainer, Spin } from './spinnerStyle';

const Spinner = () => {
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
};

export default memo(Spinner);
