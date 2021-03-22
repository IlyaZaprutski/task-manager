import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const SpinnerContainer = styled.div`
  position: relative;

  overflow: hidden;

  width: 100%;
  height: 100%;
`;

export const Spin = styled.div`
  position: absolute;

  width: calc(100% - 9.9px);
  height: calc(100% - 9.9px);

  animation: ${rotate} 5s cubic-bezier(0.17, 0.49, 0.96, 0.76) infinite;

  border: 3px solid transparent;
  border-top-color: #3e57db;
  border-radius: 50%;
`;
