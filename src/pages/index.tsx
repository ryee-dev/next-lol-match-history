import React, { useEffect, useState } from 'react';
import { Container, Spinner } from '@chakra-ui/react';
import { NextPage } from 'next';
import { appShell, modalWrapper, spinnerWrapper } from '@/index.css';
import { DDragon } from '@fightmegg/riot-api';
import { BuildStaticData } from '@/utils/buildStaticData';
import useSWR from 'swr';
import { SummForm, SummResults } from '@/components';
import useOnClickOutside from 'use-onclickoutside';
import { motion } from 'framer-motion';

// import CloseIcon from '../public/close.svg';
// import Image from 'next/image';

const fetcher = async (url: RequestInfo) =>
  await fetch(url).then((res) => res.json());

const variants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: '-100%' },
};

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

const SummonersRift: NextPage = ({ rawStaticData }: any) => {
  // const { champList, itemList, spellList, runeList } = rawStaticData;
  const ref = React.useRef(null);

  const [modalStatus, setModalStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageError, setPageError] = useState(false);
  const [summData, setSummData] = useState(null);
  const [summName, setSummName] = useState(``);
  const [summQuery, setSummQuery] = useState(``);
  const [staticData, setStaticData] = useState(null);

  const closeModal = () => {
    setModalStatus(false);
    setSummData(null);
    setSummQuery(``);
    setSummName(``);
  };

  useOnClickOutside(ref, closeModal);

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
        setLoading(false);
        console.log(err);
      },
    }
  );

  const handleEscClose = (e: { keyCode: number }) => {
    if (e.keyCode === 27) {
      closeModal();
    }
  };

  useEffect(() => {
    console.log(`loading: ${isValidating}`);
    isValidating ? setLoading(true) : setLoading(false);
  }, [isValidating]);

  useEffect(() => {
    const formattedStaticData = BuildStaticData(rawStaticData);
    // @ts-ignore
    setStaticData(formattedStaticData);
  }, [rawStaticData]);

  return (
    <Container maxW="auto" css={appShell} onKeyDown={handleEscClose}>
      <SummForm
        setSummName={setSummName}
        setSummQuery={setSummQuery}
        summName={summName}
        summQuery={summQuery}
        setLoading={setLoading}
      />
      {loading && (
        <div css={spinnerWrapper}>
          <Spinner size="xl" sx={{ zIndex: 5 }} />
        </div>
      )}
      {modalStatus && !loading && (
        <motion.div
          animate={modalStatus ? 'visible' : 'hidden'}
          variants={variants}
          css={modalWrapper}
          ref={ref}
        >
          <SummResults
            staticData={staticData}
            data={summData}
            summQuery={summQuery}
          />
        </motion.div>
      )}

      {/*{(loading || modalStatus) && <div css={appOverlay} />}*/}

      {/*{modalStatus && !loading && (*/}
      {/*  <Image*/}
      {/*    src={CloseIcon}*/}
      {/*    alt="close-icon"*/}
      {/*    height={30}*/}
      {/*    width={30}*/}
      {/*    onClick={closeModal}*/}
      {/*  />*/}
      {/*)}*/}
    </Container>
  );
};

export default SummonersRift;
