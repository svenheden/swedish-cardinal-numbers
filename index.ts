const cardinals = {
  0: 'noll',
  1: 'en',
  2: 'två',
  3: 'tre',
  4: 'fyra',
  5: 'fem',
  6: 'sex',
  7: 'sju',
  8: 'åtta',
  9: 'nio',
  10: 'tio',
  11: 'elva',
  12: 'tolv',
  13: 'tretton',
  14: 'fjorton',
  15: 'femton',
  16: 'sexton',
  17: 'sjutton',
  18: 'arton',
  19: 'nitton',

  20: 'tjugo',
  30: 'trettio',
  40: 'fyrtio',
  50: 'femtio',
  60: 'sextio',
  70: 'sjuttio',
  80: 'åttio',
  90: 'nittio',
};

const positions = {
  100: 'hundra',
  1000: 'tusen',
}

const toReversedArray = (obj: any) => (
  Object.keys(obj)
    .map(num => ({
      num: Number(num),
      cardinal: obj[num]
    }))
    .sort((x, y) => y.num - x.num)
);

const cardinalsArr = toReversedArray(cardinals);
const positionsArr = toReversedArray(positions);

export const convertToSwedishCardinalNumber = (num: number): string => {
  if (num in cardinals) return cardinals[num];
  if (num in positions) return positions[num];

  const position = positionsArr.find(x => num / x.num > 1);

  if (position) {
    const quotient = Math.floor(num / position.num);
    const remainder = num - (quotient * position.num);

    return (
      (quotient === 1 ? 'ett' : convertToSwedishCardinalNumber(quotient)) +
      ' ' +
      position.cardinal +
      (remainder > 0 ? ' ' + convertToSwedishCardinalNumber(remainder) : '')
    );
  }

  const start = cardinalsArr.find(x => num - x.num > 0);
  const remainder = num - start.num;

  return `${start.cardinal} ${convertToSwedishCardinalNumber(remainder)}`;
};
