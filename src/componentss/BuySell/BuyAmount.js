import React, { useState, useEffect } from "react";
import { InputGroup, FormControl, Button, Form, Table } from "react-bootstrap";
import "../../stylesheets/AdminSettingDashboard.css";
import { useTranslation } from "react-i18next";
import Loading from "../Loading";
import { CrossRatesContext } from "../../ContextAPI/CrossRates.js";
import PrefCurrBuyRates from "./PrefCurrBuyRates";
import BASE_URL from "../../config.js";

export default function BuyAmount() {
  const { t } = useTranslation();

  const [data, setData] = useState([]);
  const [memberData, setMemberData] = useState([]);
  const [buyxna, setBuyxna] = useState(0);
  const [buyaud, setBuyaud] = useState(0);
  const [prefCurValue, setprefCurValue] = useState(0);
  const [summary, setSummary] = useState([]);
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
    value = e.target.value;
    console.log(data[0].xnaaud);
    setBuyaud(value);
    console.log(buyaud);
    setBuyxna(parseFloat(value) / parseFloat(data[0].xnaaud));
    console.log(buyxna);
    setprefCurValue(1);
  };

  const postData = async (e) => {
    e.preventDefault();
    if (
      parseFloat(buyaud) >
      (
        (parseFloat(totdeposit) - parseFloat(totwithdraw)) *
        parseFloat(data[0].xnaaud) *
        (parseFloat(databs[0].BLP) / 100)
      ).toFixed(2)
    ) {
      console.log(" INPUT BUY MAX LIMIT ", parseFloat(buyaud));
      console.log(
        "BUY MAX LIMIT ",
        (
          (parseFloat(totdeposit) - parseFloat(totwithdraw)) *
          parseFloat(data[0].xnaaud) *
          (parseFloat(databs[0].BLP) / 100)
        ).toFixed(2)
      );
      alert("Buy Limit exceeded");
      alert(
        (
          (parseFloat(totdeposit) - parseFloat(totwithdraw)) *
          parseFloat(data[0].xnaaud) *
          (parseFloat(databs[0].BLP) / 100)
        ).toFixed(2)
      );
    } else if (parseFloat(buyaud) < parseFloat(databs[0].MBL).toFixed(2)) {
      alert("Buy Limit cannot be less than ", databs[0].MBL);
    } else {
      var description = "buy";
      var MemBuyInAud = parseFloat(buyaud);
      var MemSellInXna = parseFloat(0);
      const res = await fetch(`${BASE_URL}/buysellroute`, {
        method: "POST",
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
        window.alert("Buying Not Done");
      } else {
        window.alert("Buying Done");
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
        {t("Buy XNA")}
      </h6>
      <p className="xnaratep">{t("Buy Amount Details")}</p>
      <Table responsive style={{ fontSize: "small" }}>
        <tbody>
          <tr>
            <td>{t("Maximum Buy Amount")}</td>
            <td>
              ${" "}
              {(
                (parseFloat(totdeposit) - parseFloat(totwithdraw)) *
                parseFloat(data[0].xnaaud) *
                (parseFloat(databs[0].BLP) / 100)
              ).toFixed(2)}
            </td>
          </tr>
          <tr>
            <td>{t("Minimum Buy Amount")}</td>
            <td>$ {parseFloat(databs[0].MBL).toFixed(2)}</td>
          </tr>
        </tbody>
      </Table>
      <p className="xnaratep">{t("Enter Buy Amount In AUD Below")}</p>
      <Form.Label htmlFor="basic-url">{t("Buy Amount In AUD")}</Form.Label>
      <InputGroup className="mb-3">
        <FormControl
          placeholder={t("Buy Amount (AUD)")}
          aria-label="Buy Amount (AUD)"
          aria-describedby="basic-addon2"
          type="number"
          name="buyaud"
          value={buyaud}
          onChange={handleInputs}
        />
        <Button
          style={{ backgroundColor: "rgb(8, 143, 114)", border: "none" }}
          id="button-addon2"
          type="submit"
          onClick={postData}
        >
          {t("BUY")}
        </Button>
        <br />
      </InputGroup>
      <Form.Label htmlFor="basic-url">
        = {t("Equivalent Buy Amount In XNA")}
      </Form.Label>
      <InputGroup className="mb-3">
        <FormControl
          placeholder={t("Buy Amount (XNA)")}
          aria-label="Buy Amount (XNA)"
          aria-describedby="basic-addon2"
          disabled
          type="number"
          name="buyxna"
          value={buyxna}
        />
      </InputGroup>
      {prefCurValue == 1 || prefCurValue == 0 ? (
        buyaud == 0 || buyaud == null ? (
          <PrefCurrBuyRates buyamt={0} />
        ) : (
          <PrefCurrBuyRates buyamt={buyaud} />
        )
      ) : (
        ""
      )}
    </div>
  );
}
