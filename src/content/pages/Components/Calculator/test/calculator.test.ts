import { Direction, ModelCalculator, Risk } from "../model";


// Função para calcular o alvo com base na direção
function calculateTarget(direction: Direction, entry: number, exit: number, leverage: number): number {
    if (direction === Direction.LONG) {
        return entry + (entry * leverage * exit / 100);
    } else {
        return entry - (entry * leverage * exit / 100);
    }
}

// Testes para calcular alvos
describe('Calculate Targets', () => {
    let calculatorLong: ModelCalculator;
    let calculatorShort: ModelCalculator;
    beforeEach(() => {
        calculatorLong = {
            symbol: 'BTCUSDT',
            direction: Direction.LONG,
            entry: 38000,
            exits: [38500, 39000, 39500],
            exit:0,
            leverage: 10,
            stopLoss: 37000,
            risk: Risk.ALTO,
            analyze: 'Análise do BTCUSDT',
            monitor: '15m'
        };
        calculatorShort = {
            symbol: 'BTCUSDT',
            direction: Direction.LONG,
            entry: 40000,
            exits: [38500, 39000, 39500],
            exit:0,
            leverage: 10,
            stopLoss: 41000,
            risk: Risk.ALTO,
            analyze: 'Análise do BTCUSDT',
            monitor: '15m'
        };
    });

    test('Should calculate targets for LONG direction', () => {
        const targets: number[] = calculatorLong.exits.map(exit => calculateTarget(calculatorLong.direction, calculatorLong.entry, exit, calculatorLong.leverage));
        expect(targets).toEqual([38500, 39000, 39500]);
    });

    test('Should calculate targets for SHORT direction', () => {
        calculatorShort.direction = Direction.SHORT;
        const targets: number[] = calculatorShort.exits.map(exit => calculateTarget(calculatorShort.direction, calculatorShort.entry, exit, calculatorShort.leverage));
        expect(targets).toEqual([38500, 39000, 39500]);
    });
});
