import { css } from '@emotion/react';

const formContainer = css`
  //width: 100%;
  border-radius: 4px;
  max-width: 1200px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  //position: absolute;
  //left: 0;
  //top: 50%;
  z-index: 2;
  padding-left: 2.4rem;
  overflow: auto;

  h1 {
    color: white;
  }
`;

const summonerForm = css`
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  border-radius: 6px;

  .validation-error {
    text-transform: uppercase;
    color: #f07178;
  }

  .tooltip {
    margin-top: 1rem !important;
    display: block;
    visibility: visible !important;
  }
`;

const summInput = css`
  font-family: ClanOT-Book, sans-serif;
  text-transform: uppercase;
  color: #5d5e5a;
  outline: 0;
  border-radius: 2px;
  margin: 1rem 1rem 1rem 0;
  transition: all 0.2s ease-in-out;
  border-width: 0 0 2px;
  border-color: #5d5e5a;
  background-color: transparent;
  padding-bottom: 2px;
  min-width: 300px;
  //width: 100%;

  ::placeholder {
    color: #565b63;
  }

  //.input-line {
  //  height: 2px;
  //  width: 300px;
  //  color: #5d5e5a;
  //  transition: all 0.2s ease-in-out;
  //}

  &:focus {
    //.input-line {
    //  transform: scaleX(1.2);
    //}
  }
`;

const submitButt = css`
  position: relative;
  font-family: ClanOT-Book, sans-serif;
  margin-top: 0.4rem;
  padding: 0.4rem 2rem;
  text-decoration: none;
  outline: none;
  background-color: transparent;
  border: solid #5d5e5a 1px;
  color: #5d5e5a;
  cursor: pointer;
  font-weight: bold;
  letter-spacing: 1px;
  text-align: center;
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;
  z-index: 3;

  &:hover {
    color: #e6e6e6;
    background-color: #5d5e5a;
  }

  &:disabled {
    opacity: 0.4;

    &:hover {
      background-color: transparent;
      color: #5d5e5a;
      //color: #1380f0;
      cursor: default;
    }
  }
`;

export { summonerForm, formContainer, summInput, submitButt };
