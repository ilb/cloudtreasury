import Search from './../core/Search';
import { useMemo } from 'react';

const SearchStock = ({ value, stocks, onChange }) => {
  const options = useMemo(() => {
    if (stocks && stocks.length) {
      return stocks.map((stock) => ({
        stock,
        label: stock.ticker,
        value: stock.id
      }));
    }
  }, [stocks]);

  return (
    <Search
      placeholder="Выберите ценную бумагу"
      value={value}
      options={options}
      onChange={onChange}
    />
  );
};

export default SearchStock;
