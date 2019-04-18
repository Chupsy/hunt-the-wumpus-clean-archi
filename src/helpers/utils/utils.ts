export function subtractRandomItemFromArray(array: any[]): any {
  return array.splice(getRandomNumber(array.length), 1)[0];
}

export function getRandomNumber(max): number {
  return Math.floor(Math.random() * max);
}
