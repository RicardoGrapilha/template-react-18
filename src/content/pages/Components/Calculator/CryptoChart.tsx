import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Chart from 'react-apexcharts';

const CryptoChart: React.FC = () => {
  const [cryptoOptions, setCryptoOptions] = useState<any[]>([]);
  const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null);
  const [priceData, setPriceData] = useState<any[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);

  /*const fetchCryptoOptions = async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/list');
      const options = response.data.map((crypto: any) => ({
        value: crypto.symbol,
        label: `${crypto.name} (${crypto.symbol.toUpperCase()})`
      }));
      setCryptoOptions(options);
    } catch (error) {
      console.error('Error fetching crypto options:', error);
    }
  };*/

  const fetchPriceData = async (symbol: string) => {
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${symbol}/market_chart?vs_currency=usd&days=10`, {
        params: {
          vs_currency: 'usd',
          days: '30'
        }
      });
      const prices = response.data.prices.map((price: [number, number]) => ({
        x: new Date(price[0]),
        y: price[1]
      }));
      setPriceData(prices);
    } catch (error) {
      console.error('Error fetching price data:', error);
    }
  };

  const handleCryptoSelect = (option: any) => {
    setSelectedCrypto(option.value);
    fetchPriceData(option.value);
  };

  const handleChartClick = (event: any, chartContext: any, config: any) => {
    if (config && config.dataPointIndex !== undefined) {
      const price = priceData[config.dataPointIndex];
      setSelectedPrice(price.y);
    }
  };

  return (
    <div>
      <h1>Crypto Price Chart</h1>
      <Select
        options={cryptoOptions}
        onChange={handleCryptoSelect}
        placeholder="Select a cryptocurrency"
      />
      {selectedCrypto && (
        <div>
          <h2>Price Chart for {selectedCrypto.toUpperCase()}</h2>
          <Chart
            options={{
              chart: {
                id: 'price-chart'
              },
              xaxis: {
                type: 'datetime'
              }
            }}
            series={[{ data: priceData }]}
            type="line"
            width="500"
            height="300"
            events={{
              click: handleChartClick
            }}
          />
          {selectedPrice && (
            <input
              type="text"
              value={`Selected Price: $${selectedPrice}`}
              readOnly
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CryptoChart;

