import React, { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import {
  formContainer,
  submitButt,
  summInput,
  summonerForm,
} from './SummForm.css';
import { Box, Flex } from '@chakra-ui/react';
import Tooltip from '@/components/SummForm/Tooltip';

interface Props {
  setSummName: Dispatch<SetStateAction<string>>;
  summQuery: string;
  setSummQuery: Dispatch<SetStateAction<string>>;
  summName: string;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const SummForm: React.FC<Props> = (props: Props) => {
  const { setSummName, summName, setSummQuery, setLoading } = props;

  const [invalidSummName, setInvalidSummName] = React.useState(false);

  const validationRegex = /^[ A-Za-z0-9-_]+$/i;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'onChange',
  });

  const handlePostData = async () => {
    setLoading(true);

    await fetch('/api/summoner/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ summName }),
    }).then(() => {
      setSummQuery(summName);
      setLoading(false);
    });
  };

  const handleOnChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSummName(e.target.value);

    if (!validationRegex.test(e.target.value as string)) {
      setInvalidSummName(true);
    } else {
      setInvalidSummName(false);
    }
  };

  return (
    <div css={formContainer}>
      <div css={summonerForm}>
        <Flex
          align="flex-start"
          justify="flex-start"
          direction="column"
          width="auto"
        >
          <Tooltip summName={summName} />
          <input
            {...register('summName', {
              required: true,
              minLength: 4,
              pattern: /^[A-Za-z0-9-_]+(?:\s[A-Za-z0-9-_]+)?$/i,
            })}
            css={summInput}
            placeholder="Enter Summoner Name..."
            value={summName}
            id="summName"
            name="summName"
            type="text"
            autoComplete="summName"
            aria-autocomplete="list"
            required
            onChange={handleOnChange}
            data-tip={'INVALID SUMMONER NAME'}
          />
          <Box className="input-line" />
        </Flex>
        <button
          css={submitButt}
          disabled={invalidSummName}
          onClick={handleSubmit(handlePostData)}
        >
          submit
        </button>
      </div>
    </div>
  );
};

export default SummForm;
