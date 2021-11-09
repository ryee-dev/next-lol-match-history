import React, { useEffect, useRef, useState } from 'react';
import useOnClickOutside from 'use-onclickoutside';
import { Container, Spinner } from '@chakra-ui/react';
import { NextPage } from 'next';
import {
  appOverlay,
  appShell,
  modalWrapper,
  spinnerWrapper,
} from '@/index.css';
import { DDragon } from '@fightmegg/riot-api';
import { BuildStaticData } from '@/utils/buildStaticData';
import useSWR from 'swr';
import { SummForm, SummResults } from '@/components';
import Error from 'next/error';
import CloseIcon from '../public/close.svg';

const fetcher = async (url: RequestInfo) =>
  await fetch(url).then((res) => res.json());

export const getStaticProps = async () => {
  const ddragon = new DDragon();

  const champsList = await ddragon.champion.all();
  const itemsList = await ddragon.items();
  const spellsList = await ddragon.summonerSpells();
  // const runesList = await ddragon.runesReforged();

  if (!champsList || !itemsList || !spellsList) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      rawStaticData: {
        champions: champsList,
        items: itemsList,
        spells: spellsList,
        // runes: runesList,
      },
    },
  };
};

// async function getSummData() {
//   const res = await fetch('');
//   console.log(res);
//   return res;
// }

const SummonersRift: NextPage = ({ rawStaticData }: any) => {
  // const { champList, itemList, spellList, runeList } = rawStaticData;

  const [modalStatus, setModalStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageError, setPageError] = useState(false);
  const [summData, setSummData] = useState(null);
  const [summName, setSummName] = useState(``);
  const [summQuery, setSummQuery] = useState(``);
  const [staticData, setStaticData] = useState(null);

  const { data, isValidating } = useSWR(
    summQuery.length !== 0 ? '/api/summoner/' : null,
    fetcher,
    {
      onSuccess: (data) => {
        setSummData(data);
        setPageError(false);
        setLoading(false);
        setModalStatus(true);
        console.log(summQuery, `fetched`);
      },
      onError: (err) => {
        setPageError(true);
        console.log(err);
      },
    }
  );

  const closeModal = () => {
    setModalStatus(false);
    setSummData(null);
    setSummQuery(``);
    setSummName(``);
  };

  const ref = useRef(null);

  useOnClickOutside(ref, closeModal);

  const handleEscClose = (e: { keyCode: number }) => {
    if (e.keyCode === 27) {
      closeModal();
    }
  };

  useEffect(() => {
    // data && console.log(data);
    console.log(isValidating);
    isValidating ? setLoading(true) : setLoading(false);
  }, [isValidating]);

  useEffect(() => {
    const formattedStaticData = BuildStaticData(rawStaticData);
    // @ts-ignore
    setStaticData(formattedStaticData);
  }, []);

  return (
    <Container maxW="auto" css={appShell} onKeyDown={handleEscClose}>
      {loading && (
        <div css={spinnerWrapper}>
          <Spinner size="xl" sx={{ zIndex: 5 }} />
        </div>
      )}

      <SummForm
        setSummName={setSummName}
        setSummQuery={setSummQuery}
        summName={summName}
        summQuery={summQuery}
      />
      {!loading && modalStatus && pageError && <Error statusCode={404} />}
      {modalStatus && !loading && (
        <div css={modalWrapper} ref={ref}>
          <SummResults
            staticData={staticData}
            data={summData}
            summQuery={summQuery}
          />
        </div>
      )}
      {summQuery !== `` && <div css={appOverlay} />}
      {modalStatus && !loading && (
        <img src={CloseIcon} alt="close-icon" onClick={closeModal} />
      )}
    </Container>
  );
};

export default SummonersRift;
