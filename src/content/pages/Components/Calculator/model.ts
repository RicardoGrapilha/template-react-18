// Enum para os campos select
export enum Direction {
  LONG = 'LONG 📈',
  SHORT = 'SHORT 📉'
}

export enum Risk {
  ALTO = 'Alto🔴',
  MUITO_ALTO = 'Muito Alto 🔴🔴',
  ALTISSIMO = 'Altíssimo 🔴🔴🔴'
}

// Modelo para a calculadora
export interface ModelCalculator {
  symbol: string;
  direction: Direction;
  entry: number;
  exits: number[];
  exit: number;
  leverage: number;
  stopLoss: number;
  risk?: Risk;
  analyze?: string;
  monitor?: string;
}
export const valueBiggerOne = (value: number): number => {
  const result = value > 1 ? parseFloat(value.toFixed(2)) : value;
  return isNaN(result) ? 0 : result;
};
//alvo
export const checkShortOrBuyTarget = (
  exitValue: number,
  calculatorData: ModelCalculator
) => {
  if (calculatorData.direction === 'LONG 📈') {
    return ` $${valueBiggerOne(exitValue)}(${(
      ((valueBiggerOne(exitValue) - calculatorData.entry) /
        calculatorData.entry) *
      calculatorData.leverage
    ).toFixed(2)}%)`;
  } else {
    return ` $${valueBiggerOne(exitValue)}(${(
      ((calculatorData.entry - valueBiggerOne(exitValue)) /
        calculatorData.entry) *
      calculatorData.leverage *
      100
    ).toFixed(2)}%)`;
  }
};
//Stop
export const checkShortOrBuyStop = (calculatorData: ModelCalculator) => {
  if (calculatorData.direction === 'LONG 📈') {
    return ` $${valueBiggerOne(calculatorData.stopLoss)}(${(
      ((calculatorData.stopLoss - calculatorData.entry) /
        calculatorData.entry) *
      calculatorData.leverage
    ).toFixed(2)}%)`;
  } else {
    return ` $${valueBiggerOne(calculatorData.stopLoss)}(${(
      ((calculatorData.entry - calculatorData.stopLoss) /
        calculatorData.entry) *
      calculatorData.leverage *
      100
    ).toFixed(2)}%)`;
  }
};

export {};
