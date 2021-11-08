import React, { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { MatchDataProps, MatchProps } from '@/utils/types';
import { Box, Container } from 'theme-ui';
// import RunesLayout from '../RunesLayout';
import { handleConvertSecToMin } from '@/utils/helpers';
import Image from 'next/image';

import { cardCol, cardRow, cardWrapper, itemContainer } from './MatchCard.css';

const MatchCard: React.FC<MatchProps> = (props: MatchProps) => {
  const {
    staticData,
    gameMode,
    win,
    gameDuration,
    gameStartTimestamp,
    summAId,
    summBId,
    items,
    championId,
    kills,
    deaths,
    assists,
    kda,
    champLevel,
    totalMinionsKilled,
    neutralMinionsKilled,
    neutralMinionsKilledTeamJungle,
    neutralMinionsKilledEnemyJungle,
  } = props;

  const [championName, setChampionName] = useState('');
  const [matchData, setMatchData] = useState<MatchDataProps>({
    spells: {
      summAName: ``,
      summBName: ``,
      summAId: 0,
      summBId: 0,
    },
    items: {
      item0: 0,
      item1: 0,
      item2: 0,
      item3: 0,
      item4: 0,
      item5: 0,
      item6: 0,
    },
  });

  const [gameLength, setGameLength] = useState(``);

  const getTotalCS = () => {
    let total;
    if (
      neutralMinionsKilledTeamJungle === undefined ||
      neutralMinionsKilledEnemyJungle === undefined
    ) {
      total = totalMinionsKilled + neutralMinionsKilled;
    } else {
      total =
        totalMinionsKilled +
        neutralMinionsKilled +
        neutralMinionsKilledTeamJungle +
        neutralMinionsKilledEnemyJungle;
    }
    return total;
  };

  const getCsPerMin = () => {
    const csPerMin = getTotalCS() / Math.floor(gameDuration / 60);
    return csPerMin.toFixed(1);
  };

  useEffect(() => {
    const { item0, item1, item2, item3, item4, item5, item6 } = items;
    // console.log(staticData.champions[championName]);

    // console.log(championName);

    setMatchData({
      spells: {
        summAName: staticData.spells[summAId],
        summBName: staticData.spells[summBId],
        summAId,
        summBId,
      },
      items: {
        item0,
        item1,
        item2,
        item3,
        item4,
        item5,
        item6,
      },
    });
  }, []);

  useEffect(() => {
    setGameLength(handleConvertSecToMin(gameDuration));
  }, [gameDuration, gameStartTimestamp]);

  useEffect(() => {
    console.log(staticData.champions[championId]);
    setChampionName(staticData.champions[championId]);
  }, []);

  return (
    <Container
      css={cardWrapper}
      style={
        win ? { backgroundColor: `#b6f7c1` } : { backgroundColor: `#ffcccc` }
      }
    >
      <Box css={cardRow} className="list">
        <Box css={cardCol}>
          <h3 style={{ fontWeight: `bold` }}>{gameMode}</h3>
          {win ? (
            <h3 style={{ color: `#91b859` }}>Victory</h3>
          ) : (
            <h3 style={{ color: `#f07178` }}>Defeat</h3>
          )}
          <p>{gameLength}</p>
        </Box>
        <Box css={cardCol} className="center">
          <Image
            className="champion-img"
            src={`https://ddragon.leagueoflegends.com/cdn/11.20.1/img/champion/${championName}.png`}
            alt={`${championName}`}
            data-tip={`${championName}`}
            height={100}
            width={100}
            layout="fixed"
          />
          <ReactTooltip place="top" type="dark" effect="float" />
          <Box css={cardRow}>
            <Image
              className="spell-image"
              src={`https://ddragon.leagueoflegends.com/cdn/11.20.1/img/spell/${matchData.spells.summAName}.png`}
              alt={`${matchData.spells.summAName}`}
              height={50}
              width={50}
              layout="fixed"
            />
            <Image
              className="spell-image"
              src={`https://ddragon.leagueoflegends.com/cdn/11.20.1/img/spell/${matchData.spells.summBName}.png`}
              alt={`${matchData.spells.summBName}`}
              height={50}
              width={50}
              layout="fixed"
            />
          </Box>
        </Box>
        <Box css={cardCol} className="center">
          <p>
            {kills}/<span style={{ color: `#be3044` }}>{deaths}</span>/{assists}
          </p>
          {deaths === 0 ? <p>Perfect</p> : <p>{kda}:1 KDA</p>}

          <p>level: {champLevel}</p>
          <p>
            {getTotalCS()} ({getCsPerMin()}) CS
          </p>
        </Box>
        <Box css={cardCol} className="items">
          <Box css={itemContainer}>
            <div className="row">
              <div className="img-wrapper">
                {matchData.items.item0 !== 0 ? (
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/11.20.1/img/item/${matchData.items.item0}.png`}
                    alt={`${matchData.items.item0}`}
                    height={50}
                    width={50}
                    layout="fixed"
                  />
                ) : (
                  <div className="empty" />
                )}
              </div>
              <div className="img-wrapper">
                {matchData.items.item1 !== 0 ? (
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/11.20.1/img/item/${matchData.items.item1}.png`}
                    alt={`${matchData.items.item1}`}
                    height={50}
                    width={50}
                    layout="fixed"
                  />
                ) : (
                  <div className="empty" />
                )}
              </div>
              <div className="img-wrapper">
                {matchData.items.item2 !== 0 ? (
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/11.20.1/img/item/${matchData.items.item2}.png`}
                    alt={`${matchData.items.item2}`}
                    height={50}
                    width={50}
                    layout="fixed"
                  />
                ) : (
                  <div className="empty" />
                )}
              </div>
              <div className="img-wrapper">
                {matchData.items.item6 !== 0 ? (
                  <Image
                    className="trinket"
                    src={`https://ddragon.leagueoflegends.com/cdn/11.20.1/img/item/${matchData.items.item6}.png`}
                    alt={`${matchData.items.item6}`}
                    height={50}
                    width={50}
                    layout="fixed"
                  />
                ) : (
                  <div className="empty" />
                )}
              </div>
            </div>
            <div className="row">
              <div className="img-wrapper">
                {matchData.items.item4 !== 0 ? (
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/11.20.1/img/item/${matchData.items.item4}.png`}
                    alt={`${matchData.items.item4}`}
                    height={50}
                    width={50}
                    layout="fixed"
                  />
                ) : (
                  <div className="empty" />
                )}
              </div>
              <div className="img-wrapper">
                {matchData.items.item5 !== 0 ? (
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/11.20.1/img/item/${matchData.items.item5}.png`}
                    alt={`${matchData.items.item5}`}
                    height={50}
                    width={50}
                    layout="fixed"
                  />
                ) : (
                  <div className="empty" />
                )}
              </div>
              <div className="img-wrapper">
                {matchData.items.item3 !== 0 ? (
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/11.20.1/img/item/${matchData.items.item3}.png`}
                    alt={`${matchData.items.item3}`}
                    height={50}
                    width={50}
                    layout="fixed"
                  />
                ) : (
                  <div className="empty" />
                )}
              </div>
            </div>
          </Box>
        </Box>
      </Box>
      {/*<RunesLayout />*/}
    </Container>
  );
};

export default MatchCard;
