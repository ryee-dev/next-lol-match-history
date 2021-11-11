import React from 'react';
import MatchCard from '../MatchCard';

import { listWrapper, resultsModal } from './SummResults.css';
import { ResultsProps } from '@/utils/types';

const SummResults: React.FC<ResultsProps> = (props: ResultsProps) => {
  const { summQuery, data, staticData } = props;

  return (
    <div css={resultsModal}>
      <div css={listWrapper}>
        <h1>{summQuery}</h1>
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
