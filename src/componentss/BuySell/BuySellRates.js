import React, { useContext, useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Scrollbars } from "rc-scrollbars";
import ReactCountryFlag from "react-country-flag";
import "../../stylesheets/XNARates.css";
import { useTranslation } from "react-i18next";
import { DataContext } from "../../ContextAPI/CurrencyRates";
import { CrossRatesContext } from "../../ContextAPI/CrossRates.js";
import Loading from "../Loading.js";
import BASE_URL from "../../config.js";

const myStyle = {
  fontSize: "2em",
  lineHeight: "2em",
};

export default function BuySellRates() {
  const { t } = useTranslation();
  const value = useContext(CrossRatesContext);
  const valueA = useContext(DataContext);
  const [arr] = valueA.arr;
  const [audbal, setAUDbal] = useState({});
  //const [br01, setbr01] = useState(0);
  //const [sr01, setsr01] = useState(0);
  const [compSet, setcompSet] = useState({});
  const [cRates] = value.cRates;

  useEffect(() => {
    async function fetchaud() {
      const response = await fetch(`${BASE_URL}/audlastget`, {
        credentials: "include",
      });
      const json = await response.json();
      setAUDbal(json.al);
    }
    fetchaud();
    async function fetchcompset() {
      const response2 = await fetch(`${BASE_URL}/complastsetget`, {
        credentials: "include",
      });
      const json2 = await response2.json();
      setcompSet(json2.csl);
    }
    fetchcompset();
  }, []);
  if (!audbal.length || !compSet.length) {
    return <Loading />;
  }

  return (
    <div className="xnarates">
      <h6 className="xnarateh6">{t("Buy And Sell Order Rates")}</h6>
      <p className="xnaratep">
        {t("Buy And Sell Order Rates For Different Currencies")}
      </p>
      <Scrollbars className="scroller" style={{ height: 400 }}>
        <Table responsive style={{ fontSize: "small" }}>
          <thead style={{ fontWeight: "bold" }}>
            <tr>
              <td>{t("Currencies")}</td>
              <td>{t("Buy Rate")}</td>
              <td>{t("Sell Rate")}</td>
            </tr>
          </thead>
          <tbody>
            {arr.map((item) =>
              item === "AUD" ? (
                <tr>
                  <td>
                    <ReactCountryFlag countryCode="AU" svg style={myStyle} />{" "}
                    AUD
                  </td>

                  <td>
                    {(
                      parseFloat(audbal[0].xnaaud) *
                      parseFloat(compSet[0].ExRate)
                    ).toFixed(9)}
                  </td>
                  <td>
                    {(
                      parseFloat(audbal[0].xnaaud) /
                      parseFloat(compSet[0].ExRate)
                    ).toFixed(9)}
                  </td>
                </tr>
              ) : (
                ""
              )
            )}
            {arr.map((item) =>
              item === "CAD" ? (
                <tr>
                  <td>
                    <ReactCountryFlag countryCode="CA" svg style={myStyle} />{" "}
                    CAD
                  </td>
                  <td>
                    {(
                      parseFloat(
                        parseFloat(audbal[0].xnaaud) *
                          parseFloat(compSet[0].ExRate)
                      ) * cRates[0].data.CAD
                    ).toFixed(9)}
                  </td>
                  <td>
                    {(
                      (parseFloat(audbal[0].xnaaud) /
                        parseFloat(compSet[0].ExRate)) *
                      cRates[0].data.CAD
                    ).toFixed(9)}
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
                    <ReactCountryFlag
                      countryCode="LI"
                      svg
                      style={myStyle}
                    />{" "}
                    CHF
                  </td>
                  <td>
                    {(
                      parseFloat(
                        parseFloat(audbal[0].xnaaud) *
                          parseFloat(compSet[0].ExRate)
                      ) * cRates[0].data.CHF
                    ).toFixed(9)}
                  </td>
                  <td>
                    {(
                      (parseFloat(audbal[0].xnaaud) /
                        parseFloat(compSet[0].ExRate)) *
                      cRates[0].data.CHF
                    ).toFixed(9)}
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
                    <ReactCountryFlag countryCode="CN" svg style={myStyle} />{" "}
                    CNY
                  </td>
                  <td>
                    {(
                      parseFloat(audbal[0].xnaaud) *
                      parseFloat(compSet[0].ExRate) *
                      cRates[0].data.CNY
                    ).toFixed(9)}
                  </td>
                  <td>
                    {(
                      (parseFloat(audbal[0].xnaaud) /
                        parseFloat(compSet[0].ExRate)) *
                      cRates[0].data.CNY
                    ).toFixed(9)}
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
                    <ReactCountryFlag countryCode="DK" svg style={myStyle} />{" "}
                    DKK
                  </td>
                  <td>
                    {(
                      parseFloat(audbal[0].xnaaud) *
                      parseFloat(compSet[0].ExRate) *
                      cRates[0].data.DKK
                    ).toFixed(9)}
                  </td>
                  <td>
                    {(
                      (parseFloat(audbal[0].xnaaud) /
                        parseFloat(compSet[0].ExRate)) *
                      cRates[0].data.DKK
                    ).toFixed(9)}
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
                    <ReactCountryFlag countryCode="EE" svg style={myStyle} />{" "}
                    EUR
                  </td>
                  <td>
                    {(
                      parseFloat(audbal[0].xnaaud) *
                      parseFloat(compSet[0].ExRate) *
                      cRates[0].data.EUR
                    ).toFixed(9)}
                  </td>
                  <td>
                    {(
                      (parseFloat(audbal[0].xnaaud) /
                        parseFloat(compSet[0].ExRate)) *
                      cRates[0].data.EUR
                    ).toFixed(9)}
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
                    <ReactCountryFlag countryCode="GG" svg style={myStyle} />{" "}
                    GBP
                  </td>
                  <td>
                    {(
                      parseFloat(audbal[0].xnaaud) *
                      parseFloat(compSet[0].ExRate) *
                      cRates[0].data.GBP
                    ).toFixed(9)}
                  </td>
                  <td>
                    {(
                      (parseFloat(audbal[0].xnaaud) /
                        parseFloat(compSet[0].ExRate)) *
                      cRates[0].data.GBP
                    ).toFixed(9)}
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
                    <ReactCountryFlag
                      countryCode="IN"
                      svg
                      style={myStyle}
                    />{" "}
                    INR
                  </td>
                  <td>
                    {(
                      parseFloat(audbal[0].xnaaud) *
                      parseFloat(compSet[0].ExRate) *
                      cRates[0].data.INR
                    ).toFixed(9)}
                  </td>
                  <td>
                    {(
                      (parseFloat(audbal[0].xnaaud) /
                        parseFloat(compSet[0].ExRate)) *
                      cRates[0].data.INR
                    ).toFixed(9)}
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
                    <ReactCountryFlag countryCode="JP" svg style={myStyle} />{" "}
                    JPY
                  </td>
                  <td>
                    {(
                      parseFloat(audbal[0].xnaaud) *
                      parseFloat(compSet[0].ExRate) *
                      cRates[0].data.JPY
                    ).toFixed(9)}
                  </td>
                  <td>
                    {(
                      (parseFloat(audbal[0].xnaaud) /
                        parseFloat(compSet[0].ExRate)) *
                      cRates[0].data.JPY
                    ).toFixed(9)}
                  </td>
                </tr>
              ) : (
                ""
              )
            )}
            {/* { arr.map((item) => item === "KWD"?  */}
            {/* <tr>
            <td><ReactCountryFlag countryCode="KW" svg style={myStyle}/> KWD</td>
            <td>{((parseFloat(audbal[0].xnaaud)*parseFloat(compSet[0].ExRate))*cRates[0].data.KWD).toFixed(9)}</td>
            <td>{(parseFloat(audbal[0].xnaaud)/parseFloat(compSet[0].ExRate)*cRates[0].data.KWD).toFixed(9)}</td>
        </tr> */}
            {/* :"")} */}
            {arr.map((item) =>
              item === "MYR" ? (
                <tr>
                  <td>
                    <ReactCountryFlag countryCode="MY" svg style={myStyle} />{" "}
                    MYR
                  </td>
                  <td>
                    {(
                      parseFloat(audbal[0].xnaaud) *
                      parseFloat(compSet[0].ExRate) *
                      cRates[0].data.MYR
                    ).toFixed(9)}
                  </td>
                  <td>
                    {(
                      (parseFloat(audbal[0].xnaaud) /
                        parseFloat(compSet[0].ExRate)) *
                      cRates[0].data.MYR
                    ).toFixed(9)}
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
                    <ReactCountryFlag countryCode="NO" svg style={myStyle} />{" "}
                    NOK
                  </td>
                  <td>
                    {(
                      parseFloat(audbal[0].xnaaud) *
                      parseFloat(compSet[0].ExRate) *
                      cRates[0].data.NOK
                    ).toFixed(9)}
                  </td>
                  <td>
                    {(
                      (parseFloat(audbal[0].xnaaud) /
                        parseFloat(compSet[0].ExRate)) *
                      cRates[0].data.NOK
                    ).toFixed(9)}
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
                    <ReactCountryFlag
                      countryCode="PK"
                      svg
                      style={myStyle}
                    />{" "}
                    PKR
                  </td>
                  <td>
                    {(
                      parseFloat(audbal[0].xnaaud) *
                      parseFloat(compSet[0].ExRate) *
                      cRates[0].data.PKR
                    ).toFixed(9)}
                  </td>
                  <td>
                    {(
                      (parseFloat(audbal[0].xnaaud) /
                        parseFloat(compSet[0].ExRate)) *
                      cRates[0].data.PKR
                    ).toFixed(9)}
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
                    <ReactCountryFlag countryCode="QA" svg style={myStyle} />{" "}
                    QAR
                  </td>
                  <td>
                    {(
                      parseFloat(audbal[0].xnaaud) *
                      parseFloat(compSet[0].ExRate) *
                      cRates[0].data.QAR
                    ).toFixed(9)}
                  </td>
                  <td>
                    {(
                      (parseFloat(audbal[0].xnaaud) /
                        parseFloat(compSet[0].ExRate)) *
                      cRates[0].data.QAR
                    ).toFixed(9)}
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
                    <ReactCountryFlag countryCode="RU" svg style={myStyle} />{" "}
                    RUB
                  </td>
                  <td>
                    {(
                      parseFloat(audbal[0].xnaaud) *
                      parseFloat(compSet[0].ExRate) *
                      cRates[0].data.RUB
                    ).toFixed(9)}
                  </td>
                  <td>
                    {(
                      (parseFloat(audbal[0].xnaaud) /
                        parseFloat(compSet[0].ExRate)) *
                      cRates[0].data.RUB
                    ).toFixed(9)}
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
                    <ReactCountryFlag countryCode="SE" svg style={myStyle} />{" "}
                    SEK
                  </td>
                  <td>
                    {(
                      parseFloat(audbal[0].xnaaud) *
                      parseFloat(compSet[0].ExRate) *
                      cRates[0].data.SEK
                    ).toFixed(9)}
                  </td>
                  <td>
                    {(
                      (parseFloat(audbal[0].xnaaud) /
                        parseFloat(compSet[0].ExRate)) *
                      cRates[0].data.SEK
                    ).toFixed(9)}
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
                    <ReactCountryFlag countryCode="SG" svg style={myStyle} />{" "}
                    SGD
                  </td>
                  <td>
                    {(
                      parseFloat(audbal[0].xnaaud) *
                      parseFloat(compSet[0].ExRate) *
                      cRates[0].data.SGD
                    ).toFixed(9)}
                  </td>
                  <td>
                    {(
                      (parseFloat(audbal[0].xnaaud) /
                        parseFloat(compSet[0].ExRate)) *
                      cRates[0].data.SGD
                    ).toFixed(9)}
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
                    <ReactCountryFlag countryCode="TR" svg style={myStyle} />{" "}
                    TRY
                  </td>
                  <td>
                    {(
                      parseFloat(audbal[0].xnaaud) *
                      parseFloat(compSet[0].ExRate) *
                      cRates[0].data.TRY
                    ).toFixed(9)}
                  </td>
                  <td>
                    {(
                      (parseFloat(audbal[0].xnaaud) /
                        parseFloat(compSet[0].ExRate)) *
                      cRates[0].data.TRY
                    ).toFixed(9)}
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
                    <ReactCountryFlag countryCode="US" svg style={myStyle} />{" "}
                    USD
                  </td>
                  <td>
                    {(
                      parseFloat(audbal[0].xnaaud) *
                      parseFloat(compSet[0].ExRate) *
                      cRates[0].data.USD
                    ).toFixed(9)}
                  </td>
                  <td>
                    {(
                      (parseFloat(audbal[0].xnaaud) /
                        parseFloat(compSet[0].ExRate)) *
                      cRates[0].data.USD
                    ).toFixed(9)}
                  </td>
                </tr>
              ) : (
                ""
              )
            )}
          </tbody>
        </Table>
      </Scrollbars>
    </div>
  );
}
