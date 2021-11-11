import React, { Dispatch, SetStateAction } from 'react';
import RorLogo from 'src/public/ror-logo.svg';

import {
  formContainer,
  submitButt,
  summInput,
  summonerForm,
} from './SummForm.css';
import Image from 'next/image';

interface Props {
  setSummName: Dispatch<SetStateAction<string>>;
  summQuery: string;
  setSummQuery: Dispatch<SetStateAction<string>>;
  summName: string;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const SummForm: React.FC<Props> = (props: Props) => {
  const { setSummName, summName, summQuery, setSummQuery, setLoading } = props;

  const handlePostData = async () => {
    setSummQuery(summName);
    setLoading(true);
    console.log(summQuery);
    await fetch('/api/summoner/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ summName }),
    });
  };

  return (
    <div css={formContainer}>
      <Image src={RorLogo} alt="ror-logo" />
      <div css={summonerForm}>
        <input
          css={summInput}
          placeholder="Enter Summoner Name..."
          value={summName}
          id="summName"
          name="summName"
          type="text"
          autoComplete="summName"
          aria-autocomplete="list"
          required
          onChange={(e: { target: { value: string } }) =>
            setSummName(e.target.value)
          }
        />
        <button
          css={submitButt}
          disabled={summName === ``}
          onClick={handlePostData}
        >
          submit
        </button>
      </div>
    </div>
  );
};

export default SummForm;
