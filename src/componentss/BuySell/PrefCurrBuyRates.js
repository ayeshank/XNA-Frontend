import React, { useContext } from "react";
import { Table } from "react-bootstrap";
import "../../stylesheets/AdminSettingDashboard.css";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";
import Loading from "../Loading";
import { DataContext } from "../../ContextAPI/CurrencyRates";
import { CrossRatesContext } from "../../ContextAPI/CrossRates.js";
const myStyle = {
  fontSize: "2em",
  lineHeight: "2em",
};
export default function PrefCurrBuyRates(props) {
  const { t } = useTranslation();
  const valueA = useContext(DataContext);
  const [arr] = valueA.arr;
  const value2 = useContext(CrossRatesContext);
  const [cRates] = value2.cRates;
  console.log("BUY AMOUNT PROPS", props.buyamt);
  return (
    <div>
      {/* <h6 className="xnarateh6" style={{backgroundColor:"rgb(8, 143, 114)"}}>{t('Buy Amount In Preffered Currencies')}</h6> */}
      <p className="xnaratep">
        {t("Equivalent Buy Amount In Your Selected Preffered Currencies")}
      </p>
      <Table responsive style={{ fontSize: "small" }}>
        <tbody>
          {arr.map((item) =>
            item === "CAD" ? (
              <tr>
                <td>
                  <ReactCountryFlag countryCode="CA" svg style={myStyle} /> CAD
                </td>
                <td>
                  {(parseFloat(props.buyamt) * cRates[0].data.CAD).toFixed(9)}
                </td>
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "CHF" ? (
              <tr>
                <td>
                  {" "}
                  <ReactCountryFlag countryCode="LI" svg style={myStyle} /> CHF
                </td>
                <td>
                  {(parseFloat(props.buyamt) * cRates[0].data.CHF).toFixed(9)}
                </td>
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "CNY" ? (
              <tr>
                <td>
                  <ReactCountryFlag countryCode="CN" svg style={myStyle} /> CNY
                </td>
                <td>
                  {(parseFloat(props.buyamt) * cRates[0].data.CNY).toFixed(9)}
                </td>
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "DKK" ? (
              <tr>
                <td>
                  <ReactCountryFlag countryCode="DK" svg style={myStyle} /> DKK
                </td>
                <td>
                  {(parseFloat(props.buyamt) * cRates[0].data.DKK).toFixed(9)}
                </td>
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "EUR" ? (
              <tr>
                <td>
                  <ReactCountryFlag countryCode="EE" svg style={myStyle} /> EUR
                </td>
                <td>
                  {(parseFloat(props.buyamt) * cRates[0].data.EUR).toFixed(9)}
                </td>
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "GBP" ? (
              <tr>
                <td>
                  <ReactCountryFlag countryCode="GG" svg style={myStyle} /> GBP
                </td>
                <td>
                  {(parseFloat(props.buyamt) * cRates[0].data.GBP).toFixed(9)}
                </td>
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "INR" ? (
              <tr>
                <td>
                  {" "}
                  <ReactCountryFlag countryCode="IN" svg style={myStyle} /> INR
                </td>
                <td>
                  {(parseFloat(props.buyamt) * cRates[0].data.INR).toFixed(9)}
                </td>
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "JPY" ? (
              <tr>
                <td>
                  <ReactCountryFlag countryCode="JP" svg style={myStyle} /> JPY
                </td>
                <td>
                  {(parseFloat(props.buyamt) * cRates[0].data.JPY).toFixed(9)}
                </td>
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "KWD" ? (
              <tr>
                <td>
                  <ReactCountryFlag countryCode="KW" svg style={myStyle} /> KWD
                </td>
                <td>
                  {(parseFloat(props.buyamt) * cRates[0].data.KWD).toFixed(9)}
                </td>
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "MYR" ? (
              <tr>
                <td>
                  <ReactCountryFlag countryCode="MY" svg style={myStyle} /> MYR
                </td>
                <td>
                  {(parseFloat(props.buyamt) * cRates[0].data.MYR).toFixed(9)}
                </td>
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "NOK" ? (
              <tr>
                <td>
                  <ReactCountryFlag countryCode="NO" svg style={myStyle} /> NOK
                </td>
                <td>
                  {(parseFloat(props.buyamt) * cRates[0].data.NOK).toFixed(9)}
                </td>
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "PKR" ? (
              <tr>
                <td>
                  {" "}
                  <ReactCountryFlag countryCode="PK" svg style={myStyle} /> PKR
                </td>
                <td>
                  {(parseFloat(props.buyamt) * cRates[0].data.PKR).toFixed(9)}
                </td>
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "QAR" ? (
              <tr>
                <td>
                  <ReactCountryFlag countryCode="QA" svg style={myStyle} /> QAR
                </td>
                <td>
                  {(parseFloat(props.buyamt) * cRates[0].data.QAR).toFixed(9)}
                </td>
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "RUB" ? (
              <tr>
                <td>
                  <ReactCountryFlag countryCode="RU" svg style={myStyle} /> RUB
                </td>
                <td>
                  {(parseFloat(props.buyamt) * cRates[0].data.RUB).toFixed(9)}
                </td>
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "SEK" ? (
              <tr>
                <td>
                  <ReactCountryFlag countryCode="SE" svg style={myStyle} /> SEK
                </td>
                <td>
                  {(parseFloat(props.buyamt) * cRates[0].data.SEK).toFixed(9)}
                </td>
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "SGD" ? (
              <tr>
                <td>
                  <ReactCountryFlag countryCode="SG" svg style={myStyle} /> SGD
                </td>
                <td>
                  {(parseFloat(props.buyamt) * cRates[0].data.SGD).toFixed(9)}
                </td>
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "TRY" ? (
              <tr>
                <td>
                  <ReactCountryFlag countryCode="TR" svg style={myStyle} /> TRY
                </td>
                <td>
                  {(parseFloat(props.buyamt) * cRates[0].data.TRY).toFixed(9)}
                </td>
              </tr>
            ) : (
              ""
            )
          )}
          {arr.map((item) =>
            item === "USD" ? (
              <tr>
                <td>
                  <ReactCountryFlag countryCode="US" svg style={myStyle} /> USD
                </td>
                <td>
                  {(parseFloat(props.buyamt) * cRates[0].data.USD).toFixed(9)}
                </td>
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
