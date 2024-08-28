import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container/Container';
import Grid from '@mui/material/Grid/Grid';
import Card from '@mui/material/Card/Card';
import CardHeader from '@mui/material/CardHeader/CardHeader';
import CardContent from '@mui/material/CardContent/CardContent';
import Divider from '@mui/material/Divider/Divider';
import Box from '@mui/material/Box/Box';
import { Helmet } from 'react-helmet-async';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import Button from '@mui/material/Button/Button';
import { Direction, ModelCalculator, Risk, checkShortOrBuyStop, checkShortOrBuyTarget, valueBiggerOne } from './model';
const Calculator: React.FC = () => {
  const [exits, setExits] = useState<number[]>([]);
  const [calculatorData, setCalculatorData] = useState<ModelCalculator>({
    symbol: '',
    direction: Direction.LONG,
    entry: 0,
    exits: [],
    exit: 0,
    leverage: 0,
    stopLoss: 0,
    risk: undefined,
    analyze: '',
    monitor: ''
  });

  const addExit = () => {
    setExits([...exits, calculatorData.exit]);
  };

  const calculate = () => {
    let resultHtml = `
            <div class="telegram-message">
                ${calculatorData.analyze && `<p>${calculatorData.analyze}</p>`}
                <p>${calculatorData.symbol} (${calculatorData.direction})</p>
                <p>➖➖➖➖➖</p>
                <p>Alavancagem: ${calculatorData.leverage}x</p>
                <p>➡️ENTRADA: ${valueBiggerOne(calculatorData.entry)}</p>
                ${
                  calculatorData.monitor &&
                  `<p>Monitorar: ${calculatorData.monitor}</p>`
                }
                <p>➖➖➖➖➖</p>
                ${exits
                  .map(
                    (exitValue, index) => `
                    <p>🎯Alvo ${index + 1}: ${checkShortOrBuyTarget(
                      exitValue, calculatorData
                    )}:</p>
                    <p>🎯Alvo ${index + 1}: $${valueBiggerOne(exitValue)}(${(
                      (calculatorData.entry -
                        exitValue /
                          (calculatorData.entry * calculatorData.leverage)) *
                      100
                    ).toFixed(2)}%):</p>
                    
                `
                  )
                  .join('')}
                <p>🚫 STOP LOSS : ${checkShortOrBuyStop(calculatorData)}</p>
                <p>➖➖➖➖➖</p>
                ${
                  calculatorData.risk &&
                  `
                    <br>
                    <p>Risco: ${calculatorData.risk}</p>
                    <br>
                `
                }
                <p>MASTER TRADE</p>
            </div>
        `;

    const resultsDiv = document.getElementById('results');
    if (resultsDiv) {
      resultsDiv.innerHTML += resultHtml;
    }
  };
  const cleanResult = () => {
    const resultsDiv = document.getElementById('results');
    if (resultsDiv) {
      resultsDiv.innerHTML = '';
    }
  };

  return (
    <>
      <Helmet>
        <title>Calculadora de Variação com Alavancagem</title>
      </Helmet>

      <br />

      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Calculadora Variação com Alavancagem" />
              <Divider />
              <CardContent>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' }
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <TextField
                      label="Ativo"
                      type="text"
                      id="symbol"
                      value={calculatorData.symbol}
                      onChange={(e) =>
                        setCalculatorData({
                          ...calculatorData,
                          symbol: e.target.value
                        })
                      }
                      required
                      variant="standard"
                      InputLabelProps={{
                        shrink: true
                      }}
                    />

                    <TextField
                      id="direction"
                      select
                      label="Direção "
                      value={calculatorData.direction}
                      onChange={(e) =>
                        setCalculatorData({
                          ...calculatorData,
                          direction: e.target.value as Direction
                        })
                      }
                      required
                      variant="standard"
                    >
                      {Object.values(Direction).map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      id="entry"
                      value={calculatorData.entry}
                      label="Entrada "
                      type="number"
                      onChange={(e) =>
                        setCalculatorData({
                          ...calculatorData,
                          entry: parseFloat(e.target.value || '0')
                        })
                      }
                      required
                      variant="standard"
                      InputLabelProps={{
                        shrink: true
                      }}
                    />

                    <TextField
                      id="exit"
                      value={calculatorData.exit}
                      label="Saída"
                      type="number"
                      onChange={(e) =>
                        setCalculatorData({
                          ...calculatorData,
                          exit: parseFloat(e.target.value || '0')
                        })
                      }
                      required
                      variant="standard"
                      InputLabelProps={{
                        shrink: true
                      }}
                    />

                    <Button
                      variant="outlined"
                      sx={{ margin: 1 }}
                      color="primary"
                      onClick={addExit}
                      disabled={
                        calculatorData.exit === null &&
                        ((calculatorData.direction === 'LONG 📈' &&
                          calculatorData.exit <= calculatorData.entry) ||
                          (calculatorData.direction === 'SHORT 📉' &&
                            calculatorData.exit >= calculatorData.entry))
                      }
                    >
                      Adicionar Saída
                    </Button>
                    <br />

                    <TextField
                      id="leverage"
                      label=" Alavancagem (x)"
                      type="number"
                      variant="standard"
                      value={calculatorData.leverage}
                      onChange={(e) =>
                        setCalculatorData({
                          ...calculatorData,
                          leverage: parseFloat(e.target.value || '0')
                        })
                      }
                      required
                      InputLabelProps={{
                        shrink: true
                      }}
                    />

                    <TextField
                      id="stopLoss"
                      label="Stop Loss (%)"
                      type="number"
                      value={calculatorData.stopLoss}
                      onChange={(e) =>
                        setCalculatorData({
                          ...calculatorData,
                          stopLoss: parseFloat(e.target.value || '0')
                        })
                      }
                      required
                      variant="standard"
                      InputLabelProps={{
                        shrink: true
                      }}
                    />

                    <TextField
                      id="risk"
                      select
                      label="Risco"
                      value={calculatorData.risk}
                      variant="standard"
                      onChange={(e) =>
                        setCalculatorData({
                          ...calculatorData,
                          risk: e.target.value as Risk
                        })
                      }
                      helperText="Risco"
                    >
                      {Object.values(Risk).map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      label="Análise do Ativo"
                      type="text"
                      id="analyze"
                      value={calculatorData.analyze}
                      onChange={(e) =>
                        setCalculatorData({
                          ...calculatorData,
                          analyze: e.target.value
                        })
                      }
                      required
                      variant="standard"
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                    <TextField
                      label="Monitorar Ativo Tempo Grafico"
                      type="text"
                      id="monitor"
                      value={calculatorData.monitor}
                      onChange={(e) =>
                        setCalculatorData({
                          ...calculatorData,
                          monitor: e.target.value
                        })
                      }
                      required
                      variant="standard"
                      InputLabelProps={{
                        shrink: true
                      }}
                    />

                    <Button
                      variant="outlined"
                      sx={{ margin: 1 }}
                      color="primary"
                      onClick={calculate}
                    >
                      Calcular
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{ margin: 1 }}
                      color="primary"
                      onClick={cleanResult}
                    >
                      Limpar Resultado
                    </Button>

                    <h2>Resultados:</h2>
                    <div id="results"></div>
                  </div>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Calculator;
