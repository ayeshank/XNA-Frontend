import React, { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import ReactCountryFlag from "react-country-flag";
import "../stylesheets/XNARatesConversion.scss";
import { DataContext } from "../ContextAPI/CurrencyRates";
import { CrossRatesContext } from "../ContextAPI/CrossRates";
import Loading from "./Loading";
import BASE_URL from "../config";

const myStyle = {
  fontSize: "2em",
  lineHeight: "2em",
};

export default function CountryToXNA() {
  const value = useContext(CrossRatesContext);
  const valueA = useContext(DataContext);
  const [arr] = valueA.arr;
  const [audbal, setAUDbal] = useState({});
  const [cRates] = value.cRates;

  useEffect(() => {
    async function fetchaud() {
      const response = await fetch(`${BASE_URL}/audlastget`, {
        credentials: "include",
        cache: "no-cache",
        headers: {
          "Cache-Control": "no-cache",
        },
      });
      const json = await response.json();
      setAUDbal(json.al);
      console.log("CountrytoXNA ", json.al);
    }
    fetchaud();
  }, []);
  if (!audbal.length) {
    return <Loading />;
  }

  return (
    <div>
      <Table
        responsive
        style={{ fontSize: "small" }}
        className="conversionTable"
      >
        <tbody>
          {arr.map((item) =>
            item === "AUD" ? (
              <tr>
                <td>
                  <ReactCountryFlag countryCode="AU" svg style={myStyle} /> 1
                  AUD
                </td>
                {/* <td>1 AUD</td> */}
                <td>
                  {(
                    1 /
                    (parseFloat(audbal[0].xnaaud) * cRates[0].data.AUD)
                  ).toFixed(9)}
                </td>
                <td>XNA</td>
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "CAD" ? (
              <tr>
                <td>
                  <ReactCountryFlag countryCode="CA" svg style={myStyle} /> 1
                  CAD
                </td>
                {/* <td>1 CAD</td> */}
                <td>
                  {(
                    1 /
                    (parseFloat(audbal[0].xnaaud) * cRates[0].data.CAD)
                  ).toFixed(9)}
                </td>
                <td>XNA</td>
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "CHF" ? (
              <tr>
                <td>
                  <ReactCountryFlag countryCode="LI" svg style={myStyle} /> 1
                  CHF
                </td>
                {/* <td>1 CHF</td> */}
                <td>
                  {(
                    1 /
                    (parseFloat(audbal[0].xnaaud) * cRates[0].data.CHF)
                  ).toFixed(9)}
                </td>
                <td>XNA</td>
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "CNY" ? (
              <tr>
                <td>
                  <ReactCountryFlag countryCode="CN" svg style={myStyle} /> 1
                  CNY
                </td>
                {/* <td>1 CNY</td> */}
                <td>
                  {(
                    1 /
                    (parseFloat(audbal[0].xnaaud) * cRates[0].data.CNY)
                  ).toFixed(9)}
                </td>
                <td>XNA</td>
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "DKK" ? (
              <tr>
                <td>
                  <ReactCountryFlag countryCode="DK" svg style={myStyle} /> 1
                  DKK
                </td>
                {/* <td>1 DKK</td> */}
                <td>
                  {(
                    1 /
                    (parseFloat(audbal[0].xnaaud) * cRates[0].data.DKK)
                  ).toFixed(9)}
                </td>
                <td>XNA</td>
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "EUR" ? (
              <tr>
                <td>
                  <ReactCountryFlag countryCode="EE" svg style={myStyle} /> 1
                  EUR
                </td>
                {/* <td>1 EUR</td> */}
                <td>
                  {(
                    1 /
                    (parseFloat(audbal[0].xnaaud) * cRates[0].data.EUR)
                  ).toFixed(9)}
                </td>
                <td>XNA</td>
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "GBP" ? (
              <tr>
                <td>
                  <ReactCountryFlag countryCode="GG" svg style={myStyle} /> 1
                  GBP
                </td>
                {/* <td>1 GBP</td> */}
                <td>
                  {(
                    1 /
                    (parseFloat(audbal[0].xnaaud) * cRates[0].data.GBP)
                  ).toFixed(9)}
                </td>
                <td>XNA</td>
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "INR" ? (
              <tr>
                <td>
                  <ReactCountryFlag countryCode="IN" svg style={myStyle} /> 1
                  INR
                </td>
                {/* <td>1 INR</td> */}
                <td>
                  {(
                    1 /
                    (parseFloat(audbal[0].xnaaud) * cRates[0].data.INR)
                  ).toFixed(9)}
                </td>
                <td>XNA</td>
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "JPY" ? (
              <tr>
                <td>
                  <ReactCountryFlag countryCode="JP" svg style={myStyle} /> 1
                  JPY
                </td>
                {/* <td>1 JPY</td> */}
                <td>
                  {(
                    1 /
                    (parseFloat(audbal[0].xnaaud) * cRates[0].data.JPY)
                  ).toFixed(9)}
                </td>
                <td>XNA</td>
              </tr>
            ) : (
              ""
            )
          )}
          {/* { arr.map((item) => item === "KWD"?  */}
          {/* <tr>
       
       <td><ReactCountryFlag countryCode="KW" svg style={myStyle}/></td>
         <td>1 KWD</td>
         <td>{(1/(parseFloat(audbal[0].xnaaud)*cRates[0].data.KWD)).toFixed(9)}</td>
         <td>XNA</td>
     </tr> */}
          {/* :"")} */}
          {arr.map((item) =>
            item === "MYR" ? (
              <tr>
                <td>
                  <ReactCountryFlag countryCode="MY" svg style={myStyle} /> 1
                  MYR
                </td>
                {/* <td>1 MYR</td> */}
                <td>
                  {(
                    1 /
                    (parseFloat(audbal[0].xnaaud) * cRates[0].data.MYR)
                  ).toFixed(9)}
                </td>
                <td>XNA</td>
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "NOK" ? (
              <tr>
                <td>
                  <ReactCountryFlag countryCode="NO" svg style={myStyle} /> 1
                  NOK
                </td>
                {/* <td>1 NOK</td> */}
                <td>
                  {(
                    1 /
                    (parseFloat(audbal[0].xnaaud) * cRates[0].data.NOK)
                  ).toFixed(9)}
                </td>
                <td>XNA</td>
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "PKR" ? (
              <tr>
                <td>
                  <ReactCountryFlag countryCode="PK" svg style={myStyle} /> 1
                  PKR
                </td>
                {/* <td>1 PKR</td> */}
                <td>
                  {(
                    1 /
                    (parseFloat(audbal[0].xnaaud) * cRates[0].data.PKR)
                  ).toFixed(9)}
                </td>
                <td>XNA</td>
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "QAR" ? (
              <tr>
                <td>
                  <ReactCountryFlag countryCode="QA" svg style={myStyle} /> 1
                  QAR
                </td>
                {/* <td>1 QAR</td> */}
                <td>
                  {(
                    1 /
                    (parseFloat(audbal[0].xnaaud) * cRates[0].data.QAR)
                  ).toFixed(9)}
                </td>
                <td>XNA</td>
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "RUB" ? (
              <tr>
                <td>
                  <ReactCountryFlag countryCode="RU" svg style={myStyle} /> 1
                  RUB
                </td>
                {/* <td>1 RUB</td> */}
                <td>
                  {(
                    1 /
                    (parseFloat(audbal[0].xnaaud) * cRates[0].data.RUB)
                  ).toFixed(9)}
                </td>
                <td>XNA</td>
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "SEK" ? (
              <tr>
                <td>
                  <ReactCountryFlag countryCode="SE" svg style={myStyle} /> 1
                  SEK
                </td>
                {/* <td>1 SEK</td> */}
                <td>
                  {(
                    1 /
                    (parseFloat(audbal[0].xnaaud) * cRates[0].data.SEK)
                  ).toFixed(9)}
                </td>
                <td>XNA</td>
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "SGD" ? (
              <tr>
                <td>
                  <ReactCountryFlag countryCode="SG" svg style={myStyle} /> 1
                  SGD
                </td>
                {/* <td>1 SGD</td> */}
                <td>
                  {(
                    1 /
                    (parseFloat(audbal[0].xnaaud) * cRates[0].data.SGD)
                  ).toFixed(9)}
                </td>
                <td>XNA</td>
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "TRY" ? (
              <tr>
                <td>
                  <ReactCountryFlag countryCode="TR" svg style={myStyle} /> 1
                  TRY
                </td>
                {/* <td>1 TRY</td> */}
                <td>
                  {(
                    1 /
                    (parseFloat(audbal[0].xnaaud) * cRates[0].data.TRY)
                  ).toFixed(9)}
                </td>
                <td>XNA</td>
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "USD" ? (
              <tr>
                <td>
                  <ReactCountryFlag countryCode="US" svg style={myStyle} /> 1
                  USD
                </td>
                {/* <td>1 USD</td> */}
                <td>
                  {(
                    1 /
                    (parseFloat(audbal[0].xnaaud) * cRates[0].data.USD)
                  ).toFixed(9)}
                </td>
                <td>XNA</td>
              </tr>
            ) : (
              ""
            )
          )}
        </tbody>
      </Table>
    </div>
  );
}
