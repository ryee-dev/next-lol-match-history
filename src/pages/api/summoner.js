import { PlatformId, RiotAPI } from '@fightmegg/riot-api';

const { API_KEY } = process.env;
// const port = process.env.PORT || 5000;

const rAPI = new RiotAPI(API_KEY);

export const config = {
  api: {
    externalResolver: true,
  },
};

let summNameInput = '';

export default async function handler(req, res) {
  // res.header(
  //   'Access-Control-Allow-Origin',
  //   'Access-Control-Allow-Headers',
  //   'Origin, X-Requested-With, Content-Type,' + ' Accept',
  //   '*'
  // );
  // res.header(
  //   'Access-Control-Allow-Headers',
  //   'Origin, X-Requested-With, Content-Type, Accept'
  // );

  const handleGetPuuid = async (summName) => {
    const summPuuid = await rAPI.summoner.getBySummonerName({
      region: PlatformId.NA1,
      summonerName: summName,
    });

    return summPuuid.puuid;
  };

  const handleGetMatchHistory = async (name) => {
    const acctPuuid = await handleGetPuuid(name);

    return await rAPI.matchV5.getIdsbyPuuid({
      cluster: PlatformId.AMERICAS,
      puuid: `${acctPuuid}`,
      params: {
        start: 0,
        count: 5,
      },
    });
  };

  const handleBuildData = (matchData, nameInput) => {
    const {
      info: {
        gameDuration,
        gameStartTimestamp,
        gameId,
        gameMode,
        participants,
      },
    } = matchData;

    for (const {
      win,
      perks,
      kills,
      deaths,
      assists,
      item0,
      item1,
      item2,
      item3,
      item4,
      item5,
      item6,
      champLevel,
      totalMinionsKilled,
      neutralMinionsKilled,
      neutralMinionsKilledTeamJungle,
      neutralMinionsKilledEnemyJungle,
      championId,
      summoner1Id,
      summoner2Id,
      summonerName,
    } of participants) {
      if (nameInput === summonerName) {
        return {
          gameId,
          gameMode,
          outcome: win,
          gameDuration,
          gameStartTimestamp,
          nameInput,
          spell1Id: summoner1Id,
          spell2Id: summoner2Id,
          runes: {
            keystone: perks.styles[0].selections[0].perk,
            primaryRune1: perks.styles[0].selections[1].perk,
            primaryRune2: perks.styles[0].selections[2].perk,
            primaryRune3: perks.styles[0].selections[3].perk,
            secondaryRune1: perks.styles[1].selections[0].perk,
            secondaryRune2: perks.styles[1].selections[1].perk,
          },
          championId,
          kills,
          deaths,
          assists,
          kda: ((kills + assists) / deaths).toFixed(2),
          items: {
            item0,
            item1,
            item2,
            item3,
            item4,
            item5,
            item6,
          },
          championLevel: champLevel,
          creepScore: {
            totalMinionsKilled,
            neutralMinionsKilled,
            neutralMinionsKilledTeamJungle,
            neutralMinionsKilledEnemyJungle,
          },
        };
      }
    }
  };

  const handleGetMatch = async (matchId) =>
    await rAPI.matchV5.getMatchById({
      cluster: PlatformId.AMERICAS,
      matchId: `${matchId}`,
    });

  const searchSummoner = async (summNameInput) => {
    const matchIdList = [];
    const finalResponse = [];

    // console.log(summNameInput);

    const riftMatchHistory = await handleGetMatchHistory(summNameInput);
    // const riftMatchHistory = await handleGetMatchHistory('buttslayer');

    for (const element of riftMatchHistory) {
      matchIdList.push(element.gameId);
    }

    for (let i = 0; i < 5; i++) {
      // eslint-disable-next-line no-await-in-loop
      await handleGetMatch(riftMatchHistory[i]).then((res) => {
        finalResponse.push(handleBuildData(res, summNameInput));
      });
    }
    return finalResponse;
  };

  // let output = null;

  if (req.method === 'POST') {
    summNameInput = req.body.summName;
    res.status(204).send();
  } else if (req.method === 'GET') {
    console.log('get', summNameInput);
    const data = await searchSummoner(summNameInput);
    // res.status(200).json(data);
    res.json(data);

    // await searchSummoner(summNameInput)
    //   .then((summRes) => {
    //     output = summRes;
    //
    //     res.setHeader('Content-Type', 'application/json');
    //     res.status(200).json(output);
    //     // res.json(output);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     // res.status(405);
    //     // res.end();
    //   });

    // if (output) {
    //   console.log(output);
    //   res.status(200).json(output);
    // }

    // let output = null;

    // const summonerData = {};

    // await searchSummoner(summNameInput)
    //   .then((summRes) => {
    //     output = summRes;
    //
    //     res.setHeader('Content-Type', 'application/json');
    //     res.status(200).json(output);
    //     res.json(output);
    //   })
    //   .catch((err) => {
    //     console.log('error');
    //     console.log(err);
    //     res.status(405);
    //     res.end();
    //   });
    // res.status(200).send(output);
  }
}
