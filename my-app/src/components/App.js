import React from 'react';
import { useState, useEffect } from 'react';
import Coin from './Coin';
const url =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [coins, setCoins] = useState([]);

  let filterCoin = coins.filter((coin) => {
    return coin.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const getCoin = async () => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data, 'data');
    setCoins(data);
  };

  useEffect(() => {
    getCoin();
  }, []);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form>
          <input
            className="coin-input"
            type="text"
            onChange={handleChange}
            placeholder="Search"
          />
        </form>
      </div>
      {filterCoin.map((coin) => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.total_volume}
            volume={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
          />
        );
      })}
    </div>
  );
}

export default App;
