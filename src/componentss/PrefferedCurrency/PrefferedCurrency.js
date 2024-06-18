import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button, Modal, Form, Row, Col, Table } from "react-bootstrap";
import { Scrollbars } from "rc-scrollbars";
import { Pencil } from "@useblu/ocean-icons-react";
import Select from "react-select";
import "../../stylesheets/XNARates.css";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import ReactCountryFlag from "react-country-flag";
import Loading from "../Loading";
import BASE_URL from "../../config";

const myStyle = {
  fontSize: "2em",
  lineHeight: "2em",
};

export default function PrefferedCurrency() {
  const { t } = useTranslation();
  //const value = useContext(DataContext);
  // const [currency, setCurrency] = value.currency;
  const [show, setShow] = useState(false);
  const [tname, setname] = useState("");
  const [text, settext] = useState("");
  const [tvalue, setvalue] = useState("");
  const [prefCurrData, setprefCurrData] = useState([]);

  var usercookie = Cookies.get("member_userr");

  const handleInputs = (e) => {
    setvalue(e.target.value);
  };

  const postData = () => {
    // const {PCurr_One,PCurr_Two,PCurr_Three,PCurr_Four,PCurr_Five}=pCurr;
    // setCurrency(...currency,...prefCurrData);
    let memberno = usercookie;
    var doc = { memberno, tname, tvalue };
    // console.log("HELLO", doc);

    axios
      .put(`${BASE_URL}/pCurrencyUpdate`, doc)
      .then((res) => {
        alert("Updated successfully!");
      })
      .catch((err) => {
        // console.log(err.response);
        alert("An error occurred! Try submitting the form again.");
      });
    setvalue("");
  };

  useEffect(() => {
    async function fetchBooks() {
      const response = await fetch(`${BASE_URL}/prefferedCurrencyGET`, {
        credentials: "include",
      });
      const json = await response.json();
      setprefCurrData(json.pfg);
      // console.log(json.pfg);
    }
    fetchBooks();
  }, []);

  if (!prefCurrData.length) {
    return <Loading />;
  }

  return (
    <div className="xnarates">
      <h6 className="xnarateh6">{t("Preffered Currencies")}</h6>
      <p className="xnaratep">{t("Select Upto Five Preffered Currencies")}</p>
      <div className="xnaratediv2">
        <p>{t("Edit Preffered Currencies")}</p>
      </div>
      <Table responsive style={{ fontSize: "small" }}>
        <tbody>
          <tr>
            <td>{t("First Preffered Currency")}</td>
            <td>{prefCurrData[0].PCurr_One}</td>
            <td>
              <Button
                variant="light"
                onClick={() => {
                  setShow(true);
                  settext("First Preffered Currency");
                  setname("PCurr_One");
                }}
              >
                <Pencil size={20} />
              </Button>
            </td>
          </tr>
          <tr>
            <td>{t("Second Preffered Currency")}</td>
            <td>{prefCurrData[0].PCurr_Two}</td>
            {prefCurrData[0].PCurr_One == "Null" ? (
              <td></td>
            ) : (
              <td>
                <Button
                  variant="light"
                  onClick={() => {
                    setShow(true);
                    settext("Second Preffered Currency");
                    setname("PCurr_Two");
                  }}
                >
                  <Pencil size={20} />
                </Button>
              </td>
            )}
          </tr>
          <tr>
            <td>{t("Third Preffered Currency")}</td>
            <td>{prefCurrData[0].PCurr_Three}</td>
            {prefCurrData[0].PCurr_Two == "Null" ? (
              <td></td>
            ) : (
              <td>
                <Button
                  variant="light"
                  onClick={() => {
                    setShow(true);
                    settext("Third Preffered Currency");
                    setname("PCurr_Three");
                  }}
                >
                  <Pencil size={20} />
                </Button>
              </td>
            )}
          </tr>
          <tr>
            <td>{t("Fourth Preffered Currency")}</td>
            <td>{prefCurrData[0].PCurr_Four}</td>
            {prefCurrData[0].PCurr_Three == "Null" ? (
              <td></td>
            ) : (
              <td>
                <Button
                  variant="light"
                  onClick={() => {
                    setShow(true);
                    settext("Fourth Preffered Currency");
                    setname("PCurr_Four");
                  }}
                >
                  <Pencil size={20} />
                </Button>
              </td>
            )}
          </tr>
          <tr>
            <td>{t("Fifth Preffered Currency")}</td>
            <td>{prefCurrData[0].PCurr_Five}</td>
            {prefCurrData[0].PCurr_Four == "Null" ? (
              <td></td>
            ) : (
              <td>
                <Button
                  variant="light"
                  onClick={() => {
                    setShow(true);
                    settext("Fifth Preffered Currency");
                    setname("PCurr_Five");
                  }}
                >
                  <Pencil size={20} />
                </Button>
              </td>
            )}
          </tr>
        </tbody>
      </Table>
      {show == true ? (
        <Modal show={show}>
          <Modal.Header>
            <Modal.Title>Edit Preffered Currencies</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col>
                  <Form.Text className="text-muted">{text}</Form.Text>
                </Col>
                {/* <Col><Form.Control size="sm" type="text" name={tname} placeholder="Select Currency" value={tvalue} onChange={e=>handleInputs(e)}/></Col> */}
                <Col>
                  <Form.Select
                    aria-label="Floating label select example"
                    name={tname}
                    value={tvalue}
                    onChange={(e) => handleInputs(e)}
                  >
                    <option value="AUD" name={tname}>
                      AUD
                    </option>
                    <option value="CAD" name={tname}>
                      CAD
                    </option>
                    <option value="CHF" name={tname}>
                      CHF
                    </option>
                    <option value="CNY" name={tname}>
                      CNY
                    </option>
                    <option value="DKK" name={tname}>
                      DKK
                    </option>
                    <option value="EUR" name={tname}>
                      EUR
                    </option>
                    <option value="GBP" name={tname}>
                      GBP
                    </option>
                    <option value="INR" name={tname}>
                      INR
                    </option>
                    <option value="JPY" name={tname}>
                      JPY
                    </option>
                    <option value="KWD" name={tname}>
                      KWD
                    </option>
                    <option value="MYR" name={tname}>
                      MYR
                    </option>
                    <option value="NOK" name={tname}>
                      NOK
                    </option>
                    <option value="PKR" name={tname}>
                      PKR
                    </option>
                    <option value="QAR" name={tname}>
                      QAR
                    </option>
                    <option value="RUB" name={tname}>
                      RUB
                    </option>
                    <option value="SEK" name={tname}>
                      SEK
                    </option>
                    <option value="SGD" name={tname}>
                      SGD
                    </option>
                    <option value="TRY" name={tname}>
                      TRY
                    </option>
                    <option value="USD" name={tname}>
                      USD
                    </option>
                  </Form.Select>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button
              variant="success"
              onClick={() => {
                setShow(false);
                postData();
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
}
