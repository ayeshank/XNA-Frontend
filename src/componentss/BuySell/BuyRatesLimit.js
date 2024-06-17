import React, { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Scrollbars } from "rc-scrollbars";
import ReactCountryFlag from "react-country-flag";
import "../../stylesheets/XNARates.css";
import { useTranslation } from "react-i18next";
import { DataContext } from "../../ContextAPI/CurrencyRates";
import { CrossRatesContext } from "../../ContextAPI/CrossRates.js";
import Loading from "../Loading";
import BASE_URL from "../../config.js";

const myStyle = {
  fontSize: "2em",
  lineHeight: "2em",
};

export default function BuyRatesLimit() {
  const valueA = useContext(DataContext);
  const value = useContext(CrossRatesContext);
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState([]);
  const [databs, setDatabs] = useState([]);
  const [totdeposit, setTotdeposit] = useState(0);
  const [totwithdraw, setTotwithdraw] = useState(0);
  const [arr] = valueA.arr;
  const [cRates] = value.cRates;
  const { t } = useTranslation();

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
    const fetchAud = async () => {
      const response = await fetch(`${BASE_URL}/audlastget`, {
        credentials: "include",
      });
      const json = await response.json();
      setData(json.al);
      const response3 = await fetch(`${BASE_URL}/statement`, {
        credentials: "include",
      });
      const json3 = await response3.json();
      setSummary(json3.stat);
      const response4 = await fetch(`${BASE_URL}/buysellSetget`, {
        credentials: "include",
      });
      const json4 = await response4.json();
      setDatabs(json4.bs2);
    };
    fetchAud();
    calwithdraw();
    caldeposit();
  }, [summary]);

  if (!data.length || !summary.length || !databs.length) {
    return <Loading />;
  }

  return (
    <div className="xnarates">
      <h6 className="xnarateh6">{t("Buy Order Limit Rates")}</h6>
      <p className="xnaratep">
        {t("Buy Order Limit Rates For Different Currencies")}
      </p>

      <Scrollbars className="scroller" style={{ height: 400 }}>
        <Table responsive style={{ fontSize: "small" }}>
          <thead style={{ fontWeight: "bold" }}>
            <tr>
              <td>{t("Currencies")}</td>
              <td>{t("Min Buy Limit")}</td>
              <td>{t("Max Buy Limit")}</td>
            </tr>
          </thead>
          <tbody>
            {/* <tr>
        <td> XNA</td>
        <td>539.179419268</td>
        <td>25019.948399510</td>
    </tr> */}
            {arr.map((item) =>
              item === "AUD" ? (
                <tr>
                  <td>
                    <ReactCountryFlag countryCode="AU" svg style={myStyle} />{" "}
                    AUD
                  </td>
                  <td>
                    {(parseFloat(databs[0].MBL) * cRates[0].data.AUD).toFixed(
                      9
                    )}
                  </td>
                  <td>
                    {(
                      (parseFloat(totdeposit) - parseFloat(totwithdraw)) *
                      parseFloat(data[0].xnaaud) *
                      (parseFloat(databs[0].BLP) / 100) *
                      cRates[0].data.AUD
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
                    {(parseFloat(databs[0].MBL) * cRates[0].data.CAD).toFixed(
                      9
                    )}
                  </td>
                  <td>
                    {(
                      (parseFloat(totdeposit) - parseFloat(totwithdraw)) *
                      parseFloat(data[0].xnaaud) *
                      (parseFloat(databs[0].BLP) / 100) *
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
                    {(parseFloat(databs[0].MBL) * cRates[0].data.CHF).toFixed(
                      9
                    )}
                  </td>
                  <td>
                    {(
                      (parseFloat(totdeposit) - parseFloat(totwithdraw)) *
                      parseFloat(data[0].xnaaud) *
                      (parseFloat(databs[0].BLP) / 100) *
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
                    {(parseFloat(databs[0].MBL) * cRates[0].data.CNY).toFixed(
                      9
                    )}
                  </td>
                  <td>
                    {(
                      (parseFloat(totdeposit) - parseFloat(totwithdraw)) *
                      parseFloat(data[0].xnaaud) *
                      (parseFloat(databs[0].BLP) / 100) *
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
                    {(parseFloat(databs[0].MBL) * cRates[0].data.DKK).toFixed(
                      9
                    )}
                  </td>
                  <td>
                    {(
                      (parseFloat(totdeposit) - parseFloat(totwithdraw)) *
                      parseFloat(data[0].xnaaud) *
                      (parseFloat(databs[0].BLP) / 100) *
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
                    {(parseFloat(databs[0].MBL) * cRates[0].data.EUR).toFixed(
                      9
                    )}
                  </td>
                  <td>
                    {(
                      (parseFloat(totdeposit) - parseFloat(totwithdraw)) *
                      parseFloat(data[0].xnaaud) *
                      (parseFloat(databs[0].BLP) / 100) *
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
                    {(parseFloat(databs[0].MBL) * cRates[0].data.GBP).toFixed(
                      9
                    )}
                  </td>
                  <td>
                    {(
                      (parseFloat(totdeposit) - parseFloat(totwithdraw)) *
                      parseFloat(data[0].xnaaud) *
                      (parseFloat(databs[0].BLP) / 100) *
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
                    {(parseFloat(databs[0].MBL) * cRates[0].data.INR).toFixed(
                      9
                    )}
                  </td>
                  <td>
                    {(
                      (parseFloat(totdeposit) - parseFloat(totwithdraw)) *
                      parseFloat(data[0].xnaaud) *
                      (parseFloat(databs[0].BLP) / 100) *
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
                    {(parseFloat(databs[0].MBL) * cRates[0].data.JPY).toFixed(
                      9
                    )}
                  </td>
                  <td>
                    {(
                      (parseFloat(totdeposit) - parseFloat(totwithdraw)) *
                      parseFloat(data[0].xnaaud) *
                      (parseFloat(databs[0].BLP) / 100) *
                      cRates[0].data.JPY
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
                    {(parseFloat(databs[0].MBL) * cRates[0].data.KWD).toFixed(
                      9
                    )}
                  </td>
                  <td>
                    {(
                      (parseFloat(totdeposit) - parseFloat(totwithdraw)) *
                      parseFloat(data[0].xnaaud) *
                      (parseFloat(databs[0].BLP) / 100) *
                      cRates[0].data.KWD
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
                    {(parseFloat(databs[0].MBL) * cRates[0].data.MYR).toFixed(
                      9
                    )}
                  </td>
                  <td>
                    {(
                      (parseFloat(totdeposit) - parseFloat(totwithdraw)) *
                      parseFloat(data[0].xnaaud) *
                      (parseFloat(databs[0].BLP) / 100) *
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
                    {(parseFloat(databs[0].MBL) * cRates[0].data.NOK).toFixed(
                      9
                    )}
                  </td>
                  <td>
                    {(
                      (parseFloat(totdeposit) - parseFloat(totwithdraw)) *
                      parseFloat(data[0].xnaaud) *
                      (parseFloat(databs[0].BLP) / 100) *
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
                    {(parseFloat(databs[0].MBL) * cRates[0].data.PKR).toFixed(
                      9
                    )}
                  </td>
                  <td>
                    {(
                      (parseFloat(totdeposit) - parseFloat(totwithdraw)) *
                      parseFloat(data[0].xnaaud) *
                      (parseFloat(databs[0].BLP) / 100) *
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
                    {(parseFloat(databs[0].MBL) * cRates[0].data.QAR).toFixed(
                      9
                    )}
                  </td>
                  <td>
                    {(
                      (parseFloat(totdeposit) - parseFloat(totwithdraw)) *
                      parseFloat(data[0].xnaaud) *
                      (parseFloat(databs[0].BLP) / 100) *
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
                    {(parseFloat(databs[0].MBL) * cRates[0].data.RUB).toFixed(
                      9
                    )}
                  </td>
                  <td>
                    {(
                      (parseFloat(totdeposit) - parseFloat(totwithdraw)) *
                      parseFloat(data[0].xnaaud) *
                      (parseFloat(databs[0].BLP) / 100) *
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
                    {(parseFloat(databs[0].MBL) * cRates[0].data.SEK).toFixed(
                      9
                    )}
                  </td>
                  <td>
                    {(
                      (parseFloat(totdeposit) - parseFloat(totwithdraw)) *
                      parseFloat(data[0].xnaaud) *
                      (parseFloat(databs[0].BLP) / 100) *
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
                    {(parseFloat(databs[0].MBL) * cRates[0].data.SGD).toFixed(
                      9
                    )}
                  </td>
                  <td>
                    {(
                      (parseFloat(totdeposit) - parseFloat(totwithdraw)) *
                      parseFloat(data[0].xnaaud) *
                      (parseFloat(databs[0].BLP) / 100) *
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
                    {(parseFloat(databs[0].MBL) * cRates[0].data.TRY).toFixed(
                      9
                    )}
                  </td>
                  <td>
                    {(
                      (parseFloat(totdeposit) - parseFloat(totwithdraw)) *
                      parseFloat(data[0].xnaaud) *
                      (parseFloat(databs[0].BLP) / 100) *
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
                    {(parseFloat(databs[0].MBL) * cRates[0].data.USD).toFixed(
                      9
                    )}
                  </td>
                  <td>
                    {(
                      (parseFloat(totdeposit) - parseFloat(totwithdraw)) *
                      parseFloat(data[0].xnaaud) *
                      (parseFloat(databs[0].BLP) / 100) *
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
