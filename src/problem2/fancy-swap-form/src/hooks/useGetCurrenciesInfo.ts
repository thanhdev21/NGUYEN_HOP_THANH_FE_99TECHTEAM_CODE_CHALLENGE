import { useEffect, useState } from "react";
import { Currency } from "../types";

const useGetCurrenciesInfo = () => {
  const [loading, setLoading] = useState(false);
  const [currenciesInfo, setCurrenciesInfo] = useState<Array<Currency>>([]);
  const [filteredCurrencies, setFilteredCurrencies] = useState<Array<Currency>>(
    []
  );

  const fetchCurrenciesInfo = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://interview.switcheo.com/prices.json"
      );
      const data = await response.json();
      const uniqueCurrencies = Array.from(
        new Set(data.map((currency: Currency) => currency.currency))
      ).map((currency) => {
        return data.find((c: Currency) => c.currency === currency);
      });

      setCurrenciesInfo(uniqueCurrencies);
      setFilteredCurrencies(uniqueCurrencies);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const onSearch = (searchValue: string) => {
    if (!searchValue) {
      setFilteredCurrencies(currenciesInfo);
      return;
    }
    const filtered = currenciesInfo.filter((currency) =>
      currency.currency.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredCurrencies(filtered);
  };

  useEffect(() => {
    fetchCurrenciesInfo();
  }, []);

  return { loading, currenciesInfo, filteredCurrencies, onSearch };
};

export default useGetCurrenciesInfo;
