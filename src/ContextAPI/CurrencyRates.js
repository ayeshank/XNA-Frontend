import React, { createContext, useState, useEffect } from "react";
import BASE_URL from "../config";

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [currency, setCurrency] = useState([]);
  var arr = [];

  const value = {
    currency: [currency, setCurrency],
    arr: [arr],
  };

  useEffect(() => {
    async function fetchCurrency() {
      try {
        const response = await fetch(`${BASE_URL}/prefferedCurrencyGET`, {
          credentials: "include",
        });
        const json = await response.json();
        setCurrency(json.pfg);
      } catch (error) {
        console.error("Error fetching preferred currency:", error);
      }
    }
    fetchCurrency();
  }, []);
  if (currency.length) {
    const selectedCurrency = () => {
      arr.push(currency[0].PCurr_One);
      arr.push(currency[0].PCurr_Two);
      arr.push(currency[0].PCurr_Three);
      arr.push(currency[0].PCurr_Four);
      arr.push(currency[0].PCurr_Five);
    };
    selectedCurrency();
  }
  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  );
};
