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
  overflow-y: visible;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;

  svg {
    position: absolute;
    top: 0;
    right: 0;
    padding: 1rem;
  }

  h1 {
    font-family: 'ClanOT-Bold', sans-serif;
    //font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-size: 5rem;
    color: #212121;
    text-align: left;
    min-width: 800px;
    margin: 1rem 0 0 -5rem;
    position: absolute;
  }
`;

const listWrapper = css`
  position: relative;
  //margin-top: 8rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  overflow: auto;
  z-index: 1;
  padding: 0.4rem 1rem;
  height: 100%;
`;

export { resultsModal, listWrapper };
