import React, { useState, useEffect } from "react";
import { InputGroup, FormControl, Button, Form, Table } from "react-bootstrap";
import "../../stylesheets/AdminSettingDashboard.css";
import { useTranslation } from "react-i18next";
import Loading from "../Loading";
import PrefCurrSellRates from "./PrefCurrSellRates";
import BASE_URL from "../../config";
// import {CrossRatesContext} from '../../ContextAPI/CrossRates.js';

export default function SellAmount() {
  const { t } = useTranslation();

  const [data, setData] = useState([]);
  const [memberData, setMemberData] = useState([]);
  const [sellxna, setSellxna] = useState(0);
  const [sellaud, setSellaud] = useState(0);
  const [summary, setSummary] = useState([]);
  const [prefCurValue, setprefCurValue] = useState(0);
  const [databs, setDatabs] = useState([]);
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

  var name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setSellaud(parseFloat(value) * parseFloat(data[0].xnaaud));
    setSellxna(value);
    setprefCurValue(1);
  };

  const postData = async (e) => {
    e.preventDefault();
    if (
      parseFloat(sellxna) >
      parseFloat(
        (
          (Math.floor(
            (parseFloat(totdeposit) - parseFloat(totwithdraw)) *
              (parseFloat(databs[0].SLP) / 100)
          ) *
            1000000000) /
          1000000000
        ).toFixed(10)
      )
    ) {
      console.log(parseFloat(sellxna));
      console.log(
        (
          (Math.floor(
            (parseFloat(totdeposit) - parseFloat(totwithdraw)) *
              (parseFloat(databs[0].SLP) / 100)
          ) *
            1000000000) /
          1000000000
        ).toFixed(10)
      );
      alert("Sell Limit exceeded");
    } else if (
      parseFloat(sellxna) <
      (
        (Math.floor(parseFloat(databs[0].MSL) / parseFloat(data[0].xnaaud)) *
          1000000000) /
        1000000000
      ).toFixed(10)
    ) {
      alert("Sell Limit cannot be less than ", databs[0].MSL);
    } else {
      var description = "sell";
      var MemBuyInAud = parseFloat(0);
      var MemSellInXna = parseFloat(sellxna);
      alert(MemSellInXna);
      alert(typeof MemSellInXna);
      const res = await fetch(`${BASE_URL}/buysellroute`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description,
          MemBuyInAud,
          MemSellInXna,
        }),
      });
      const data = await res.json();
      if (res.status === 500 || !data) {
        window.alert("Selling Not Done");
      } else {
        window.alert("Selling Done");
      }
    }
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
      const response5 = await fetch(`${BASE_URL}/memberinfo`, {
        credentials: "include",
      });
      const json5 = await response5.json();
      setMemberData(json5.memberLogin);
    };
    fetchAud();
    calwithdraw();
    caldeposit();
  }, []);
  if (!data.length || !summary.length || !databs.length) {
    return <Loading />;
  }
  return (
    <div className="xnarates">
      <h6 className="xnarateh6" style={{ backgroundColor: "rgb(8, 143, 114)" }}>
        {t("Sell XNA")}
      </h6>
      <p className="xnaratep">{t("Sell Amount Details")}</p>
      <Table responsive style={{ fontSize: "small" }}>
        <tbody>
          <tr>
            <td>{t("Maximum Sell Amount")}</td>
            <td>
              {(
                (Math.floor(
                  (parseFloat(totdeposit) - parseFloat(totwithdraw)) *
                    (parseFloat(databs[0].SLP) / 100)
                ) *
                  1000000000) /
                1000000000
              ).toFixed(10)}
            </td>
          </tr>
          <tr>
            <td>{t("Minimum Sell Amount")}</td>
            <td>
              {(
                (Math.floor(
                  parseFloat(databs[0].MSL) / parseFloat(data[0].xnaaud)
                ) *
                  1000000000) /
                1000000000
              ).toFixed(10)}
            </td>
          </tr>
        </tbody>
      </Table>
      <p className="xnaratep">{t("Enter Sell Amount In XNA Below")}</p>
      <Form.Label htmlFor="basic-url">{t("Sell Amount In XNA")}</Form.Label>
      <InputGroup className="mb-3">
        <FormControl
          placeholder={t("Sell Amount (XNA)")}
          aria-label="Sell Amount (XNA)"
          aria-describedby="basic-addon2"
          type="number"
          name="sellxna"
          value={sellxna}
          onChange={handleInputs}
          required
        />
        <Button
          style={{ backgroundColor: "rgb(8, 143, 114)", border: "none" }}
          id="button-addon2"
          onClick={postData}
        >
          {t("SELL")}
        </Button>
        <br />
      </InputGroup>
      <Form.Label htmlFor="basic-url">
        = {t("Equivalent Sell Amount In AUD")}
      </Form.Label>
      <InputGroup className="mb-3">
        <FormControl
          placeholder={t("Sell Amount (AUD)")}
          aria-label="Sell Amount (AUD)"
          aria-describedby="basic-addon2"
          disabled
          type="number"
          name="sellaud"
          value={sellaud}
        />
      </InputGroup>
      {prefCurValue == 1 || prefCurValue == 0 ? (
        sellaud == 0 || sellaud == null || sellxna == 0 || sellxna == null ? (
          <PrefCurrSellRates sellamt={0} />
        ) : (
          <PrefCurrSellRates sellamt={sellaud} />
        )
      ) : (
        ""
      )}
    </div>
  );
}
