import React from 'react';
import MatchCard from '../MatchCard';

import { listWrapper, resultsModal } from './SummResults.css';
import { ResultsProps } from '@/utils/types';

import { RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { invalidate, validate } from '@/components/SummResults/resultsSlice';

const SummResults: React.FC<ResultsProps> = (props: ResultsProps) => {
  const { summQuery, data, staticData } = props;
  const resultsFetched = useSelector(
    (state: RootState) => state.results.fetched
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (data) {
      dispatch(validate());
      console.log(resultsFetched);
    } else {
      dispatch(invalidate());
      console.log(resultsFetched);
    }
  }, [resultsFetched, data, dispatch]);

  return (
    <div css={resultsModal}>
      <h1>{summQuery}</h1>
      <div css={listWrapper}>
        {data &&
          data.map((match: any, index: number) => {
            return (
              match.creepScore !== undefined && (
                <MatchCard
                  staticData={staticData}
                  key={index}
                  gameMode={match.gameMode}
                  win={match.outcome}
                  gameDuration={match.gameDuration}
                  gameStartTimestamp={match.gameStartTimestamp}
                  summonerName={match.summonerName}
                  summAId={match.spell1Id}
                  summBId={match.spell2Id}
                  championId={match.championId}
                  kills={match.kills}
                  deaths={match.deaths}
                  assists={match.assists}
                  kda={match.kda}
                  items={match.items}
                  champLevel={match.championLevel}
                  totalMinionsKilled={match.creepScore.totalMinionsKilled | 0}
                  neutralMinionsKilled={
                    match.creepScore.neutralMinionsKilled | 0
                  }
                  neutralMinionsKilledTeamJungle={
                    match.creepScore.neutralMinionsKilledTeamJungle | 0
                  }
                  neutralMinionsKilledEnemyJungle={
                    match.creepScore.neutralMinionsKilledEnemyJungle | 0
                  }
                />
              )
            );
          })}
      </div>
    </div>
  );
};

export default SummResults;
