import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Scrollbars } from "rc-scrollbars";
import "../../stylesheets/XNARates.css";
import { useTranslation } from "react-i18next";
import BASE_URL from "../../config";

export default function AccountSummary() {
  const { t } = useTranslation();
  const [xnabal, setXNAbal] = useState({});
  const [audbal, setAUDbal] = useState({});
  const [compbal, setCOMPbal] = useState({});
  const [compsetbal, setCOMPsetbal] = useState({});

  useEffect(() => {
    async function fetchxna() {
      const response = await fetch(`${BASE_URL}/xnalastget`, {
        credentials: "include",
      });
      const json = await response.json();
      setXNAbal(json.xl);
    }
    async function fetchaud() {
      const response = await fetch(`${BASE_URL}/audlastget`, {
        credentials: "include",
      });
      const json = await response.json();
      setAUDbal(json.al);
    }
    async function fetchcomp() {
      const response = await fetch(`${BASE_URL}/companylastget`, {
        credentials: "include",
      });
      const json = await response.json();
      setCOMPbal(json.cl);
    }
    async function fetchcompset() {
      const response = await fetch(`${BASE_URL}/complastsetget`, {
        credentials: "include",
      });
      const json = await response.json();
      setCOMPsetbal(json.csl);
    }
    fetchxna();
    fetchaud();
    fetchcomp();
    fetchcompset();
  }, []);
  if (
    !compsetbal.length ||
    !xnabal.length ||
    !audbal.length ||
    !compbal.length
  ) {
    return null;
  }
  return (
    <div className="xnarates">
      <h6 className="xnarateh6">{t("Accounts Summary")}</h6>
      <p className="xnaratep">{t("All Account Summary")}</p>
      <div className="xnaratediv2">
        <p>{t("Final Amount Details of Accounts")}</p>
      </div>
      <Scrollbars className="scroller" style={{ height: 400 }}>
        <Table responsive style={{ fontSize: "small" }}>
          <tbody>
            <tr>
              <td>XNA Balance</td>
              <td>{xnabal[0].balance}</td>
            </tr>
            <tr>
              <td>Company Account Balance</td>
              <td>$ {compbal[0].CB}</td>
            </tr>
            <tr>
              <td>Members Account/AUD Balance</td>
              <td>$ {audbal[0].audnet}</td>
            </tr>
            <tr>
              <td>Total AUD</td>
              <td>
                ${" "}
                {(
                  parseFloat(compbal[0].CB) + parseFloat(audbal[0].audnet)
                ).toFixed(2)}
              </td>
            </tr>
            <tr>
              <td>XNA/AUD</td>
              <td>$ {audbal[0].xnaaud}</td>
            </tr>
            <tr>
              <td>Buy Rate</td>
              <td>
                {(
                  parseFloat(audbal[0].xnaaud) *
                  (1 + parseFloat(compsetbal[0].ExRate))
                ).toFixed(10)}
              </td>
            </tr>
            <tr>
              <td>Sell Rate</td>
              <td>
                {(
                  parseFloat(audbal[0].xnaaud) /
                  (1 + parseFloat(compsetbal[0].ExRate))
                ).toFixed(10)}
              </td>
            </tr>
          </tbody>
        </Table>
      </Scrollbars>
    </div>
  );
}
