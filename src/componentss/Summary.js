import React, { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Scrollbars } from "rc-scrollbars";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";
import "../stylesheets/XNARates.css";
import { DataContext } from "../ContextAPI/CurrencyRates";
import { CrossRatesContext } from "../ContextAPI/CrossRates";
import Loading from "./Loading.js";
import BASE_URL from "../config.js";

const myStyle = {
  fontSize: "2em",
  lineHeight: "2em",
};

export default function Summary() {
  const { t } = useTranslation();
  const value = useContext(CrossRatesContext);
  const valueA = useContext(DataContext);
  const [arr] = valueA.arr;
  const [audbal, setAUDbal] = useState({});
  var [cRates] = value.cRates;
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState([]);
  const [totdeposit, setTotdeposit] = useState(0);
  const [totwithdraw, setTotwithdraw] = useState(0);

  const caldeposit = () => {
    var sum = summary.reduce(function (prev, current) {
      return parseFloat(prev) + parseFloat(current.xnadeposit);
    }, 0);
    setTotdeposit(sum);
  };

  const calwithdraw = () => {
    var sum = summary.reduce(function (prev, current) {
      return parseFloat(prev) + parseFloat(current.xnawithdraw);
    }, 0);
    setTotwithdraw(sum);
  };

  useEffect(() => {
    async function fetchBooks() {
      const response = await fetch(`${BASE_URL}/statement`, {
        credentials: "include",
        cache: "no-cache",
      });
      const json = await response.json();
      setSummary(json.stat);
      const response2 = await fetch(`${BASE_URL}/audlastget`, {
        credentials: "include",
        cache: "no-cache",
        headers: {
          "Cache-Control": "no-cache",
        },
      });
      const json2 = await response2.json();
      setData(json2.al);
      console.log(json.stat);
    }
    fetchBooks();
    calwithdraw();
    caldeposit();
  }, []);
  if (!summary.length || !data.length) {
    return <Loading />;
  }
  return (
    <div className="xnarates">
      <h6 className="xnarateh6">{t("Summary")}</h6>
      <p className="xnaratep">
        {summary[0].name}'s {t("Account Summary")}
      </p>
      <div className="xnaratediv2">
        <p>{t("View In Detail")}</p>
        <i className="fa fa-location-arrow" style={{ fontSize: "1.75em" }} />
      </div>
      <Scrollbars className="scroller" style={{ height: 400 }}>
        <Table responsive style={{ fontSize: "small" }}>
          <tbody>
            <tr>
              <td>{t("XNA Deposit")}</td>
              <td>
                {(Math.floor(totdeposit * 1000000000) / 1000000000).toFixed(10)}
              </td>
            </tr>
            <tr>
              <td>{t("XNA Withdrawn")}</td>
              <td>
                {(Math.floor(totwithdraw * 1000000000) / 1000000000).toFixed(
                  10
                )}
              </td>
            </tr>
            <tr>
              <td>{t("XNA Balance")}</td>
              <td>
                {(
                  (Math.floor(
                    parseFloat(totdeposit) - parseFloat(totwithdraw)
                  ) *
                    1000000000) /
                  1000000000
                ).toFixed(10)}
              </td>
            </tr>
            <tr>
              <td>{t("Withdrawn Limit")}</td>
              <td>0.0000000000</td>
            </tr>
            {arr.map((item) =>
              item == "AUD" ? (
                <tr>
                  <td>
                    <ReactCountryFlag countryCode="AU" svg style={myStyle} />{" "}
                    AUD
                  </td>
                  <td>
                    ${" "}
                    {(
                      (parseFloat(totdeposit) - parseFloat(totwithdraw)) *
                      parseFloat(data[0].xnaaud)
                    ).toFixed(2)}
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
                      parseFloat(summary[0].balance) *
                      (parseFloat(data[0].xnaaud) * cRates[0].data.CAD)
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
                      parseFloat(summary[0].balance) *
                      (parseFloat(data[0].xnaaud) * cRates[0].data.CHF)
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
                      parseFloat(summary[0].balance) *
                      (parseFloat(data[0].xnaaud) * cRates[0].data.CNY)
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
                      parseFloat(summary[0].balance) *
                      (parseFloat(data[0].xnaaud) * cRates[0].data.DKK)
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
                      parseFloat(summary[0].balance) *
                      (parseFloat(data[0].xnaaud) * cRates[0].data.EUR)
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
                      parseFloat(summary[0].balance) *
                      (parseFloat(data[0].xnaaud) * cRates[0].data.GBP)
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
                      parseFloat(summary[0].balance) *
                      (parseFloat(data[0].xnaaud) * cRates[0].data.INR)
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
                      parseFloat(summary[0].balance) *
                      (parseFloat(data[0].xnaaud) * cRates[0].data.JPY)
                    ).toFixed(9)}
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
                    <ReactCountryFlag countryCode="KW" svg style={myStyle} />{" "}
                    KWD
                  </td>
                  <td>
                    {(
                      parseFloat(summary[0].balance) *
                      (parseFloat(data[0].xnaaud) * cRates[0].data.KWD)
                    ).toFixed(9)}
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
                    <ReactCountryFlag countryCode="MY" svg style={myStyle} />{" "}
                    MYR
                  </td>
                  <td>
                    {(
                      parseFloat(summary[0].balance) *
                      (parseFloat(data[0].xnaaud) * cRates[0].data.MYR)
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
                      parseFloat(summary[0].balance) *
                      (parseFloat(data[0].xnaaud) * cRates[0].data.NOK)
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
                  {/* <td>3.452632295</td> */}
                  <td>
                    {(
                      parseFloat(summary[0].balance) *
                      (parseFloat(data[0].xnaaud) * cRates[0].data.PKR)
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
                      parseFloat(summary[0].balance) *
                      (parseFloat(data[0].xnaaud) * cRates[0].data.QAR)
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
                      parseFloat(summary[0].balance) *
                      (parseFloat(data[0].xnaaud) * cRates[0].data.RUB)
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
                      parseFloat(summary[0].balance) *
                      (parseFloat(data[0].xnaaud) * cRates[0].data.SEK)
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
                      parseFloat(summary[0].balance) *
                      (parseFloat(data[0].xnaaud) * cRates[0].data.SGD)
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
                      parseFloat(summary[0].balance) *
                      (parseFloat(data[0].xnaaud) * cRates[0].data.TRY)
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
                      parseFloat(summary[0].balance) *
                      (parseFloat(data[0].xnaaud) * cRates[0].data.USD)
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
