export const getTotalCS = (minionsKilled: any) => {
  const {
    neutralMinionsKilledTeamJungle,
    neutralMinionsKilledEnemyJungle,
    totalMinionsKilled,
    neutralMinionsKilled,
  } = minionsKilled;
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

export const getCsPerMin = (totalCS: number, gameDuration: number) => {
  const csPerMin = totalCS / Math.floor(gameDuration / 60);
  return csPerMin.toFixed(1);
};
