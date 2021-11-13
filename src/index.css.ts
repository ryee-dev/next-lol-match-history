import { css } from '@emotion/react';

export const appShell = css`
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  padding: 4rem 3rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: #e6e6e6;
  overflow: hidden;
  font-family: 'Arboria', sans-serif;

  .close {
    position: absolute;
    top: 0;
    right: 0;
    padding: 2rem 2rem 0 0;
    z-index: 3;

    &:hover {
      cursor: pointer;
    }
  }

  a {
    text-decoration: none;
  }
`;

export const appOverlay = css`
  position: absolute;
  height: 100vh;
  width: 100vw;
  background-color: black;
  opacity: 0.75;
  z-index: 2;
`;

export const modalWrapper = css`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: hidden;
  overflow-x: hidden;
  border-radius: 6px;
  z-index: 5;
  box-sizing: border-box;
`;

export const spinnerWrapper = css`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
`;
