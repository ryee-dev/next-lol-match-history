import React from 'react';
import MatchCard from '../MatchCard';

import { listWrapper, resultsModal } from './SummResults.css';
import { ResultsProps } from '@/utils/types';
import { useStore } from '@/store';

const SummResults: React.FC<ResultsProps> = (props: ResultsProps) => {
  const { data, staticData } = props;
  const searchQuery = useStore((state) => state.searchQuery);

  React.useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div css={resultsModal}>
      <h1>{searchQuery}</h1>
      <div css={listWrapper}>
        {data &&
          data.map((match: any, index: number) => {
            return (
              match && (
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
