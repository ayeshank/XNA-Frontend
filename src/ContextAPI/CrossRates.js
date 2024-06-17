import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CrossRatesContext = createContext();

export const CrossRatesProvider = (props) => {
  const [crossRates, setCrossRates] = useState([
    {
      data: {
        USD: 0.687999,
        RUB: 50.911962,
        JPY: 92.271093,
        CNY: 4.724906,
        CHF: 0.63636,
        CAD: 0.927115,
        INR: 56.942666,
        TRY: 12.954831,
        SAR: 2.578421,
        SEK: 7.190424,
        NOK: 7.098256,
        TWD: 20.90714,
        DKK: 4.789991,
        MYR: 3.049215,
        SGD: 0.919855,
        PKR: 179.156712,
        QAR: 2.505008,
        SDG: 402.823956,
        MMK: 1431.889837,
        MWK: 699.877016,
        STD: 14240.185187,
        AUD: 1,
        GBP: 0.571238,
        EUR: 0.641767,
      },
    },
  ]);

  //   useEffect(() => {
  //     axios
  //       .get(
  //         "https://freecurrencyapi.net/api/v2/latest?apikey=6cfea260-497f-11ec-94b3-adf08d2418fe&base_currency=AUD"
  //       )
  //       .then((response) => {
  //         console.log("Currency exhchnage rates values : ", response.data);
  //         //   setCrossRates(response.data);
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   }, []);
  const value = {
    cRates: [crossRates, setCrossRates],
  };

  return (
    <CrossRatesContext.Provider value={value}>
      {props.children}
    </CrossRatesContext.Provider>
  );
};
