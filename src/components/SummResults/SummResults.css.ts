import { css } from '@emotion/react';

const resultsModal = css`
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  //position: relative;
  z-index: 1;

  svg {
    position: absolute;
    top: 0;
    right: 0;
    padding: 1rem;
  }
`;

const listWrapper = css`
  //height: 50%;
  //padding: 0 2rem;
  position: absolute;
  //padding: 0 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  background-color: #dadddf;
  overflow: auto;
  z-index: 1;
  padding: 1rem;
  //max-width: 800px;

  h1 {
    font-family: 'Transat Text', sans-serif;
    font-weight: lighter;
    letter-spacing: 4px;
    text-transform: lowercase;
    font-size: 3rem;
    color: #212121;
    text-align: left;
    min-width: 800px;
  }
`;

export { resultsModal, listWrapper };
