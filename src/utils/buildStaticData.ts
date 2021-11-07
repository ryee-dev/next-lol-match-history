export const BuildStaticData = (rawStaticData: {
  champions: any;
  items: any;
  spells: any;
  // runes: any;
}) => {
  const { champions, items, spells } = rawStaticData;

  const formattedStaticData = {
    champions: {},
    items: {},
    spells: {},
    // runes: {},
  };

  const champEntries = Object.entries(champions.data);
  const itemEntries = Object.entries(items.data);
  const spellEntries = Object.entries(spells.data);
  // const runesEntries = Object.entries(runes.data);

  // Champions
  for (const [champion, values] of champEntries) {
    // @ts-ignore
    formattedStaticData.champions[values.key] = champion;
  }

  // Items
  for (const [item, values] of itemEntries) {
    // @ts-ignore
    formattedStaticData.items[item] = values.name;
  }

  // Spells
  for (const [spell, values] of spellEntries) {
    // @ts-ignore
    formattedStaticData.spells[values.key] = values.id;
  }

  // Runes
  // formattedStaticData.runes = runesEntries.map((item) => item[1]);

  // console.log(formattedStaticData);

  return formattedStaticData;
};
