import React, { useState, useEffect } from "react";
import { InputGroup, FormControl, Button, Form } from "react-bootstrap";
import "../../stylesheets/XNARates.css";
import { Table } from "react-bootstrap";
import { Scrollbars } from "rc-scrollbars";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LaptopWindows } from "@material-ui/icons";
import BASE_URL from "../../config";

export default function Transfer() {
  const { t } = useTranslation();
  let navigate = useNavigate();
  const [one, setOne] = useState(0);
  const [rec, setRec] = useState("");
  const [des, setDes] = useState("");
  const [amt, setAmt] = useState(0);
  const [data, setData] = useState([]);
  const [statement, setStatement] = useState([]);
  const [totdeposit, setTotdeposit] = useState(0);
  const [totwithdraw, setTotwithdraw] = useState(0);

  //   const fetchRec2 =async () => {
  //   const response = await fetch('/membersearchget');
  //   const json = await response.json();
  //   setData(json.csl);
  // }

  var value;
  const handleInputs = (e) => {
    value = e.target.value;
    setRec(value);
  };
  const DeshandleInputs = (e) => {
    value = e.target.value;
    setDes(value);
  };
  const AmthandleInputs = (e) => {
    value = e.target.value;
    setAmt(value);
  };

  const postDataTran = async (e) => {
    e.preventDefault();
    setOne(3);
    var SendDesc = des;
    var TxnaWithdraw = parseFloat(amt);
    if (
      TxnaWithdraw >
      (
        (Math.floor(parseFloat(totdeposit) - parseFloat(totwithdraw)) *
          1000000000) /
        1000000000
      ).toFixed(10)
    ) {
      alert("Transfer amount exceeded your current xna balance");
    } else {
      const res = await fetch(`${BASE_URL}/transferpost`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ SendDesc, TxnaWithdraw }),
      });
      const data2 = await res.json();
      if (res.status === 500 || !data2) {
        window.alert("Error in Transfer");
      } else {
        window.alert("Successfully Transfered");
        // setData("");
        setRec("");
        setAmt(0);
        setDes("");

        // navigate('/dashboard/transfer');
      }
    }
  };

  const postData = async (e) => {
    e.preventDefault();
    alert("Searching for Member....");
    var memberno = rec;
    const res = await fetch(`${BASE_URL}/searchmember`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ memberno }),
    });
    const data3 = await res.json();
    if (res.status === 500 || !data3) {
      window.alert("Error in searching rec member");
    } else if (res.status === 401) {
      window.alert("Member Not Found");
    } else {
      alert("Member Found!");
      setData(data3.csl);
      // console.log(data3.csl);
      setOne(1);
    }
  };

  const caldeposit = () => {
    var sum = statement.reduce(function (prev, current) {
      return parseFloat(prev) + parseFloat(current.xnadeposit);
    }, 0);
    setTotdeposit(sum);
  };

  const calwithdraw = () => {
    var sum = statement.reduce(function (prev, current) {
      return parseFloat(prev) + parseFloat(current.xnawithdraw);
    }, 0);
    setTotwithdraw(sum);
  };

  useEffect(() => {
    const fetchRec = async () => {
      const response2 = await fetch(`${BASE_URL}/statement`, {
        credentials: "include",
      });
      const json2 = await response2.json();
      setStatement(json2.stat);
      // console.log(json2.stat);
    };
    fetchRec();
    caldeposit();
    calwithdraw();
  }, []);

  return (
    <div className="xnarates">
      <h6 className="xnarateh6" style={{ backgroundColor: "rgb(8, 143, 114)" }}>
        {t("Transfer XNA")}
      </h6>
      <p className="xnaratep">{t("Enter Transfer Amount In XNA Below")}</p>
      <Scrollbars className="scroller" style={{ height: 400 }}>
        <Form.Label htmlFor="basic-url">
          {t("Search Member by ReferralNo.")}
        </Form.Label>
        <InputGroup className="mb-3">
          <FormControl
            placeholder={t("Enter ReferralNo.")}
            aria-label="Buy Amount (AUD)"
            aria-describedby="basic-addon2"
            name="rec"
            value={rec}
            onChange={handleInputs}
          />
          <Button
            style={{ backgroundColor: "rgb(8, 143, 114)", border: "none" }}
            onClick={postData}
            id="button-addon2"
          >
            {t("Search Member")}
          </Button>
          <br />
        </InputGroup>

        <br />

        {/* <Scrollbars className="scroller" style={{ width:390,height: 100 }}> */}
        <Table responsive style={{ fontSize: "small" }}>
          <tbody>
            <tr>
              <td>{t("Receivers Name")}</td>
              <td>{one == 1 || one == 2 ? data.name : one == 3 ? "" : ""} </td>
            </tr>
            <tr>
              <td>{t("Receivers Surname")}</td>
              <td>
                {one == 1 || one == 2 ? data.surname : one == 3 ? "" : ""}
              </td>
            </tr>
            <tr>
              <td>{t("Receivers Email")}</td>
              <td>{one == 1 || one == 2 ? data.email : one == 3 ? "" : ""}</td>
            </tr>
          </tbody>
        </Table>
        {/* </Scrollbars> */}
        <Button
          style={{
            backgroundColor: "rgb(8, 143, 114)",
            border: "none",
            float: "right",
          }}
          id="button-addon2"
          type="submit"
          onClick={() => setOne(2)}
        >
          {t("Confirm")}
        </Button>
        <br />

        <br />
        {/* <Scrollbars className="scroller" style={{ width:390,height: 100 }}> */}
        <Table responsive style={{ fontSize: "small" }}>
          <tbody>
            <tr>
              <td>{t("Sender No.")}</td>
              <td>
                {one == 2
                  ? statement[statement.length - 1].memberno
                  : one == 3
                  ? ""
                  : ""}{" "}
              </td>
            </tr>
            <tr>
              <td>{t("Receiver No.")}</td>
              <td>{one == 2 ? data.memberno : one == 3 ? "" : ""}</td>
            </tr>
            <tr>
              <td>{t("Maximum Amount")}</td>
              <td>
                {one == 2
                  ? (
                      (Math.floor(
                        parseFloat(totdeposit) - parseFloat(totwithdraw)
                      ) *
                        1000000000) /
                      1000000000
                    ).toFixed(10)
                  : one == 3
                  ? ""
                  : ""}
              </td>
            </tr>
          </tbody>
        </Table>
        {/* </Scrollbars> */}

        <br />
        <Form.Label htmlFor="basic-url">
          {t("Enter Amount to Transfer")}
        </Form.Label>
        <InputGroup className="mb-3">
          <FormControl
            placeholder={t("Enter Transfer Amount")}
            aria-label="Buy Amount (AUD)"
            aria-describedby="basic-addon2"
            name="amt"
            min="1"
            max={(
              (Math.floor(parseFloat(totdeposit) - parseFloat(totwithdraw)) *
                1000000000) /
              1000000000
            ).toFixed(10)}
            value={amt}
            onChange={AmthandleInputs}
          />
        </InputGroup>
        <Form.Label htmlFor="basic-url">
          {t("Enter Description to Transfer")}
        </Form.Label>
        <InputGroup className="mb-3">
          <FormControl
            placeholder={t("Enter Transfer Description")}
            aria-label="Buy Amount (AUD)"
            aria-describedby="basic-addon2"
            name="des"
            value={des}
            onChange={DeshandleInputs}
          />
          <Button
            style={{ backgroundColor: "rgb(8, 143, 114)", border: "none" }}
            id="button-addon2"
            onClick={postDataTran}
          >
            {t("Transfer")}
          </Button>
          <br />
        </InputGroup>
      </Scrollbars>
    </div>
  );
}
