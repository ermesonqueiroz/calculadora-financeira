import ipca from '../assets/ipca.json';

export interface IPCA {
  date: string;
  value: number;
  accumulatedIndex: number;
}

export const ibgeService = {
  getHistoricIPCA: (): IPCA[] => {
    let accumulatedIndex = 1;
    return ipca.map(entry => {
      const factor = 1 + entry.value / 100;
      accumulatedIndex *= factor;
      return {
        ...entry,
        accumulatedIndex: accumulatedIndex
      };
    });
  }
};
