import React, { useContext, useState, useEffect } from "react";
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

export default function XnaToCountry() {
  const value = useContext(CrossRatesContext);
  const valueA = useContext(DataContext);
  const [arr] = valueA.arr;
  const [audbal, setAUDbal] = useState({});
  var [cRates] = value.cRates;

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
      console.log("XNAtoCountry ", json.al);
    }
    fetchaud();
  }, []);
  if (!audbal.length) {
    return <Loading />;
  }
  // if ( !cRates.length ) {
  //   return <Loading/>
  // }

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
                <td>1 XNA</td>
                <td>
                  {(parseFloat(audbal[0].xnaaud) * cRates[0].data.AUD).toFixed(
                    9
                  )}
                </td>
                {/* <td><ReactCountryFlag countryCode="AU" svg style={myStyle}/></td> */}
                <td>
                  <ReactCountryFlag countryCode="AU" svg style={myStyle} /> AUD
                </td>
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "CAD" ? (
              <tr>
                <td>1 XNA</td>
                <td>
                  {(parseFloat(audbal[0].xnaaud) * cRates[0].data.CAD).toFixed(
                    9
                  )}
                </td>
                <td>
                  <ReactCountryFlag countryCode="CA" svg style={myStyle} /> CAD
                </td>
                {/* <td>CAD</td> */}
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "CHF" ? (
              <tr>
                <td>1 XNA</td>
                <td>
                  {(parseFloat(audbal[0].xnaaud) * cRates[0].data.CHF).toFixed(
                    9
                  )}
                </td>
                <td>
                  <ReactCountryFlag countryCode="LI" svg style={myStyle} /> CHF
                </td>
                {/* <td>CHF</td> */}
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "CNY" ? (
              <tr>
                <td>1 XNA</td>
                <td>
                  {(parseFloat(audbal[0].xnaaud) * cRates[0].data.CNY).toFixed(
                    9
                  )}
                </td>
                <td>
                  <ReactCountryFlag countryCode="CN" svg style={myStyle} /> CNY
                </td>
                {/* <td>CNY</td> */}
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "DKK" ? (
              <tr>
                <td>1 XNA</td>
                <td>
                  {(parseFloat(audbal[0].xnaaud) * cRates[0].data.DKK).toFixed(
                    9
                  )}
                </td>
                <td>
                  <ReactCountryFlag countryCode="DK" svg style={myStyle} /> DKK
                </td>
                {/* <td>DKK</td> */}
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "EUR" ? (
              <tr>
                <td>1 XNA</td>
                <td>
                  {(parseFloat(audbal[0].xnaaud) * cRates[0].data.EUR).toFixed(
                    9
                  )}
                </td>
                <td>
                  <ReactCountryFlag countryCode="EE" svg style={myStyle} /> EUR
                </td>
                {/* <td>EUR</td> */}
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "GBP" ? (
              <tr>
                <td>1 XNA</td>
                <td>
                  {(parseFloat(audbal[0].xnaaud) * cRates[0].data.GBP).toFixed(
                    9
                  )}
                </td>
                <td>
                  <ReactCountryFlag countryCode="GG" svg style={myStyle} /> GBP
                </td>
                {/* <td>GBP</td> */}
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "INR" ? (
              <tr>
                <td>1 XNA</td>
                <td>
                  {(parseFloat(audbal[0].xnaaud) * cRates[0].data.INR).toFixed(
                    9
                  )}
                </td>
                <td>
                  <ReactCountryFlag countryCode="IN" svg style={myStyle} /> INR
                </td>
                {/* <td>INR</td> */}
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "JPY" ? (
              <tr>
                <td>1 XNA</td>
                <td>
                  {(parseFloat(audbal[0].xnaaud) * cRates[0].data.JPY).toFixed(
                    9
                  )}
                </td>
                <td>
                  <ReactCountryFlag countryCode="JP" svg style={myStyle} /> JPY
                </td>
                {/* <td>JPY</td> */}
              </tr>
            ) : (
              ""
            )
          )}
          {/* { arr.map((item) => item === "KWD"?  */}
          {/* <tr>
          <td>1 XNA</td>
            <td>{(parseFloat(audbal[0].xnaaud)*cRates[0].data.KWD).toFixed(9)}</td>
            <td><ReactCountryFlag countryCode="KW" svg style={myStyle}/></td>
            <td>KWD</td>
        </tr> */}
          {/* :"")} */}
          {arr.map((item) =>
            item === "MYR" ? (
              <tr>
                <td>1 XNA</td>
                <td>
                  {(parseFloat(audbal[0].xnaaud) * cRates[0].data.MYR).toFixed(
                    9
                  )}
                </td>
                <td>
                  <ReactCountryFlag countryCode="MY" svg style={myStyle} /> MYR
                </td>
                {/* <td>MYR</td> */}
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "NOK" ? (
              <tr>
                <td>1 XNA</td>
                <td>
                  {(parseFloat(audbal[0].xnaaud) * cRates[0].data.NOK).toFixed(
                    9
                  )}
                </td>
                <td>
                  <ReactCountryFlag countryCode="NO" svg style={myStyle} /> NOK
                </td>
                {/* <td>NOK</td> */}
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "PKR" ? (
              <tr>
                <td>1 XNA</td>
                <td>
                  {(parseFloat(audbal[0].xnaaud) * cRates[0].data.PKR).toFixed(
                    9
                  )}
                </td>
                <td>
                  <ReactCountryFlag countryCode="PK" svg style={myStyle} /> PKR
                </td>
                {/* <td>PKR</td> */}
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "QAR" ? (
              <tr>
                <td>1 XNA</td>
                <td>
                  {(parseFloat(audbal[0].xnaaud) * cRates[0].data.QAR).toFixed(
                    9
                  )}
                </td>
                <td>
                  <ReactCountryFlag countryCode="QA" svg style={myStyle} /> QAR
                </td>
                {/* <td>QAR</td> */}
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "RUB" ? (
              <tr>
                <td>1 XNA</td>
                <td>
                  {(parseFloat(audbal[0].xnaaud) * cRates[0].data.RUB).toFixed(
                    9
                  )}
                </td>
                <td>
                  <ReactCountryFlag countryCode="RU" svg style={myStyle} /> RUB
                </td>
                {/* <td>RUB</td> */}
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "SEK" ? (
              <tr>
                <td>1 XNA</td>
                <td>
                  {(parseFloat(audbal[0].xnaaud) * cRates[0].data.SEK).toFixed(
                    9
                  )}
                </td>
                <td>
                  <ReactCountryFlag countryCode="SE" svg style={myStyle} /> SEK
                </td>
                {/* <td>SEK</td> */}
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "SGD" ? (
              <tr>
                <td>1 XNA</td>
                <td>
                  {(parseFloat(audbal[0].xnaaud) * cRates[0].data.SGD).toFixed(
                    9
                  )}
                </td>
                <td>
                  <ReactCountryFlag countryCode="SG" svg style={myStyle} /> SGD
                </td>
                {/* <td>SGD</td> */}
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "TRY" ? (
              <tr>
                <td>1 XNA</td>
                <td>
                  {(parseFloat(audbal[0].xnaaud) * cRates[0].data.TRY).toFixed(
                    9
                  )}
                </td>
                <td>
                  <ReactCountryFlag countryCode="TR" svg style={myStyle} /> TRY
                </td>
                {/* <td>TRY</td> */}
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "USD" ? (
              <tr>
                <td>1 XNA</td>
                <td>
                  {(parseFloat(audbal[0].xnaaud) * cRates[0].data.USD).toFixed(
                    9
                  )}
                </td>
                <td>
                  <ReactCountryFlag countryCode="US" svg style={myStyle} /> USD
                </td>
                {/* <td>USD</td> */}
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
// const value = useContext(DataContext);
// const [curpri,setCurPri]=useState([])
// const [currency] = value.currency;
// alert(currency);
// console.log("XNATOCOUNTRY"+curpri)
// <tr>
//         <td>1 XNA</td>
//           {/* <td>0.017663526</td> */}
//           <td>{(6195*(parseFloat(audbal[0].xnaaud)/cRates[0].data.USD)).toFixed(9)}</td>
//           <td><ReactCountryFlag countryCode="US" svg style={myStyle}/></td>
//           <td>USD</td>
//       </tr>
