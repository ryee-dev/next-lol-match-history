import React, { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import {
  formContainer,
  submitButt,
  summInput,
  summonerForm,
} from './SummForm.css';
import { Flex } from '@chakra-ui/react';
import ReactTooltip from 'react-tooltip';

interface Props {
  setSummName: Dispatch<SetStateAction<string>>;
  summQuery: string;
  setSummQuery: Dispatch<SetStateAction<string>>;
  summName: string;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const SummForm: React.FC<Props> = (props: Props) => {
  const { setSummName, summName, summQuery, setSummQuery, setLoading } = props;

  const [invalidSummName, setInvalidSummName] = React.useState(false);

  const validationRegex = /^[A-Za-z0-9-_]+$/i;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'onChange',
  });

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

  const handleOnChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSummName(e.target.value);

    if (
      e.target.value.length < 4 ||
      !validationRegex.test(e.target.value as string)
    ) {
      console.log('error');
      setInvalidSummName(true);
    } else {
      setInvalidSummName(false);
    }
  };

  // React.useEffect(() => {
  //   if (watchSummName.summName?.length < 4) {
  //     setInvalidSummName(true);
  //   }
  //   setSummName(watchSummName.summName);
  // }, [watch, setSummName]);

  return (
    <div css={formContainer}>
      <div css={summonerForm}>
        {/*<form onSubmit={handleSubmit(handlePostData)} id="summName">*/}
        {/*  <input*/}
        {/*    {...register('summName', {*/}
        {/*      required: true,*/}
        {/*      minLength: 4,*/}
        {/*      pattern: /^[A-Za-z0-9-_]+$/i,*/}
        {/*    })}*/}
        {/*    css={summInput}*/}
        {/*    value={summName}*/}
        {/*    id="summName"*/}
        {/*    // name="summName"*/}
        {/*    type="text"*/}
        {/*    aria-autocomplete="list"*/}
        {/*    required*/}
        {/*    onChange={handleOnChange}*/}
        {/*    data-tip={errors.summName && 'INVALID SUMMONER NAME'}*/}
        {/*    placeholder="Enter Summoner Name..."*/}
        {/*  />*/}
        {/*  {errors.summName && (*/}
        {/*    <span className="validation-error">invalid summoner name</span>*/}
        {/*  )}*/}
        {/*  <button*/}
        {/*    css={submitButt}*/}
        {/*    disabled={summName?.length < 4 || invalidSummName}*/}
        {/*  >*/}
        {/*    submit*/}
        {/*  </button>*/}
        {/*</form>*/}
        <Flex
          align="flex-start"
          justify="flex-start"
          direction="column"
          width="auto"
        >
          <input
            {...register('summName', {
              required: true,
              minLength: 4,
              pattern: /^[A-Za-z0-9-_]+$/i,
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
            data-tip={invalidSummName && 'INVALID SUMMONER NAME'}
          />

          {invalidSummName && (
            <>
              <span className="validation-error">invalid summoner name</span>

              <ReactTooltip
                className="show tooltip"
                type="error"
                effect="solid"
                place="bottom"
              />
            </>
          )}
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
