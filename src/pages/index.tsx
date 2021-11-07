import React, { useEffect, useRef, useState } from 'react';
import useOnClickOutside from 'use-onclickoutside';
import { Container } from 'theme-ui';
import Error from 'next/error';
import { Loading, SummForm, SummResults } from '../components';
import CloseIcon from '../public/close.svg';
import ky from 'ky';
import { NextPage } from 'next';
import { appOverlay, appShell, modalWrapper } from '@/index.css';
import { DDragon } from '@fightmegg/riot-api';
import { BuildStaticData } from '@/utils/buildStaticData';

export async function getStaticProps() {
  const ddragon = new DDragon();

  const champsList = await ddragon.champion.all();
  const itemsList = await ddragon.items();
  const spellsList = await ddragon.summonerSpells();
  // const runesList = await ddragon.runesReforged();

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
}

// async function getSummData() {
//   const res = await fetch('http://127.0.0.1:3000/api/summoner/');
//   console.log(res);
//   return res;
// }

const SummonersRift: NextPage = ({ rawStaticData }: any) => {
  // const { champList, itemList, spellList, runeList } = rawStaticData;

  const [modalStatus, setModalStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
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

  const ref = useRef(null);

  useOnClickOutside(ref, closeModal);

  const handleEscClose = (e: { keyCode: number }) => {
    if (e.keyCode === 27) {
      closeModal();
    }
  };

  useEffect(() => {
    const handleToggleModal = () => {
      // @ts-ignore
      if (summData?.length !== 0) {
        setError(false);
        setLoading(false);
        setModalStatus(true);
        console.log(summQuery, `fetched`);
      }
    };

    if (summQuery !== `` && summData) {
      handleToggleModal();
    }
  }, [summData, summQuery]);

  useEffect(() => {
    const fetchData = async () => {
      setModalStatus(false);
      setLoading(true);

      if (summQuery !== '') {
        setLoading(true);
        console.log('fetching');

        await ky
          .get('/api/summoner/')
          .json()
          .then((res) => {
            // @ts-ignore
            setSummData(res);
          });
      }
    };

    if (summQuery !== '') {
      fetchData();
    }
  }, [summQuery]);

  useEffect(() => {
    const formattedStaticData = BuildStaticData(rawStaticData);
    // @ts-ignore
    setStaticData(formattedStaticData);
  }, []);

  return (
    <Container css={appShell} onKeyDown={handleEscClose}>
      <SummForm
        setSummName={setSummName}
        setSummQuery={setSummQuery}
        summName={summName}
        summQuery={summQuery}
      />
      {summQuery !== `` && loading && <Loading />}
      {!loading && modalStatus && error && <Error statusCode={404} />}
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
