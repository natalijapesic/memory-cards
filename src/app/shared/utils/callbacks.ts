import { Card } from '../../quiz/_models';

export const numberToHex = (component: number): string => {
  let hex = component.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
};

export const rgbToHex = (rgb: number[]): string => {
  return `#${numberToHex(rgb[0])}${numberToHex(rgb[1])}${numberToHex(rgb[2])}`;
};

export const setColorById = (id: number): string => {
  if (id == 0) id = 99;
  let rgb: number[] = [255, 255, 0];
  id % 2 === 0
    ? (rgb[1] = Number((255 / (100 - id) / 10).toFixed()))
    : (rgb[0] = Number(((255 * id) / 100).toFixed()));

  return rgbToHex(rgb);
};

export const pointsPerAnswer = (card: Card) => {
  return 1 / card.answers.length;
};

export const calculateMaxPoints = (card: Card): number => {
  return pointsPerAnswer(card) * card.correctAnswers.length;
};
