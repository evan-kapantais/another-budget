import { keyframes } from 'styled-components';

export const buttonPulse = (color) => keyframes`
  from {
    box-shadow: 0 0 5px ${color};
  }
  to {
    box-shadow: 0 0 20px transparent;
  }
`;
