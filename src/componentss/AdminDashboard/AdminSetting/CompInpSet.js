import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Row, Col, Table } from "react-bootstrap";
import axios from "axios";
import { Scrollbars } from "rc-scrollbars";
import { Pencil } from "@useblu/ocean-icons-react";
import BASE_URL from "../../../config";
import "../../../stylesheets/AdminSettingDashboard.css";
import { useTranslation } from "react-i18next";

export default function CompInpSet() {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [member, setMember] = useState({
    InIncA: 0,
    CompOutA: 0,
    CompInvestAmA: 0,
    CompInvestRetCapA: 0,
    CompInvestProA: 0,
  });

  async function fetchBooks() {
    const response = await fetch(`${BASE_URL}/compInpSetget`, {
      credentials: "include",
    });
    const json = await response.json();
    setData(json.cs2[0]);
    setMember(json.cs2[0]);
    console.log(json.cs2);
  }

  var name, value;
  const handleInputs = (e) => {
    console.log("Updated ", member);
    name = e.target.name;
    value = e.target.value;
    setMember({ ...member, [name]: value });
  };

  const postData = async (e) => {
    // setData({...data,...member})
    const {
      InIncA,
      CompOutA,
      CompInvestAmA,
      CompInvestRetCapA,
      CompInvestProA,
    } = member;
    const res = await fetch(`${BASE_URL}/compInpSetpost`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        InIncA,
        CompOutA,
        CompInvestAmA,
        CompInvestRetCapA,
        CompInvestProA,
      }),
    });

    const data = await res.json();
    if (res.status === 500 || !data) {
      window.alert("Invalid Input");
    } else {
      window.alert("Company Input Setting Updated");
      //  window.location.reload()
    }
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  // if (!data.length) {
  //   return null;
  // }
  return (
    <div className="xnarates">
      <h6 className="xnarateh6">{t("Comapny Input Setting")}</h6>
      <p className="xnaratep">{t("Edit Comapny Input Details")}</p>
      <div className="xnaratediv2">
        <p>{t("Edit Company Input Setting")}</p>
        <div>
          <i
            className="fa fa-pencil-square"
            onClick={() => setShow(true)}
            style={{ fontSize: "1.75em", paddingRight: "0.5rem" }}
          />
          <i
            className="fa fa-refresh"
            onClick={() => fetchBooks()}
            style={{ fontSize: "1.75em" }}
          />
        </div>
      </div>
      <Scrollbars className="scroller" style={{ height: 400 }}>
        <Table responsive style={{ fontSize: "small" }}>
          <tbody>
            <tr>
              <td>Interest Income AUD</td>
              <td>{data.InIncA}</td>
            </tr>
            <tr>
              <td>Company Outgoings AUD</td>
              <td>{data.CompOutA}</td>
            </tr>
            <tr>
              <td>Company Investment Amount AUD</td>
              <td>{data.CompInvestAmA}</td>
            </tr>
            <tr>
              <td>Company Investment Return Capital AUD</td>
              <td>{data.CompInvestRetCapA}</td>
            </tr>
            <tr>
              <td>Company Investment Profit AUD</td>
              <td>{data.CompInvestProA}</td>
            </tr>
          </tbody>
        </Table>
      </Scrollbars>
      {show == true ? (
        <Modal show={show}>
          <Modal.Header>
            <Modal.Title>Edit Company Input Setting</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col>
                  <Form.Text className="text-muted">
                    Interest Income AUD
                  </Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="number"
                    name="InIncA"
                    placeholder="Enter Amount"
                    value={member.InIncA}
                    onChange={(e) => handleInputs(e)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Text className="text-muted">
                    Company Outgoings AUD
                  </Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="number"
                    name="CompOutA"
                    placeholder="Enter Amount"
                    value={member.CompOutA}
                    onChange={(e) => handleInputs(e)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Text className="text-muted">
                    Company Investment Amount AUD
                  </Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="number"
                    name="CompInvestAmA"
                    placeholder="Enter Amount"
                    value={member.CompInvestAmA}
                    onChange={(e) => handleInputs(e)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Text className="text-muted">
                    Company Investment Return Capital AUD
                  </Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="number"
                    name="CompInvestRetCapA"
                    placeholder="Enter Amount"
                    value={member.CompInvestRetCapA}
                    onChange={(e) => handleInputs(e)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Text className="text-muted">
                    Company Investment Profit AUD
                  </Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="number"
                    name="CompInvestProA"
                    placeholder="Enter Amount"
                    value={member.CompInvestProA}
                    onChange={(e) => handleInputs(e)}
                  />
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
              Execute
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
}
