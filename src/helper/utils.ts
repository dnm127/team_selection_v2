export const getRandomIndex = <T>(array: T[]): number => {
  if (array.length === 0) {
    throw new Error("Array cannot be empty");
  }
  return Math.floor(Math.random() * array.length);
};

export const getRandomTeam = (teamList: Array<string>) => {
  const randomIndex = getRandomIndex(teamList);
  return teamList[randomIndex];
};
