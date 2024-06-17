import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Row, Col, Table } from "react-bootstrap";
import Loading from "../../Loading";
import { Scrollbars } from "rc-scrollbars";
import "../../../stylesheets/AdminSettingDashboard.css";
import { useTranslation } from "react-i18next";
import BASE_URL from "../../../config";

export default function BuySellSet() {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [member, setMember] = useState({
    BLFAAUD: 0,
    BLP: 0,
    SLP: 0,
    MBL: 0,
    MSL: 0,
  });

  async function fetchBooks() {
    const response = await fetch(`${BASE_URL}/buysellSetget`, {
      credentials: "include",
    });
    const json = await response.json();
    setData(json.bs2[0]);
    setMember(json.bs2[0]);
    console.log(json.bs2);
  }
  var name, value;
  const handleInputs = (e) => {
    console.log("Updated ", member);
    name = e.target.name;
    value = e.target.value;
    setMember({ ...member, [name]: value });
  };

  const postData = async (e) => {
    setData({ ...data, ...member });
    const { BLFAAUD, BLP, SLP, MBL, MSL } = member;
    const res = await fetch(`${BASE_URL}/buysellSetpost`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        BLFAAUD,
        BLP,
        SLP,
        MBL,
        MSL,
      }),
    });
    const data = await res.json();
    if (res.status === 500 || !data) {
      window.alert("Invalid Input");
    } else {
      window.alert("Buy and Sell Setting Updated");
      //  window.location.reload()
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // if (!data.length) {
  //   return <Loading/>;
  // }

  return (
    <div className="xnarates">
      <h6 className="xnarateh6">{t("Buy and Sell Setting")}</h6>
      <p className="xnaratep">{t("Edit Buy and Sell Details")}</p>
      <div className="xnaratediv2">
        <p>{t("Edit Buy And Sell Setting")}</p>
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
              <td>Buy Limit Fixed Amount AUD</td>
              <td>$ {data.BLFAAUD}</td>
            </tr>

            <tr>
              <td>Buy Limit Percentage</td>
              <td>{data.BLP} %</td>
            </tr>
            <tr>
              <td>Sell Limit Percentage</td>
              <td>{data.SLP} %</td>
            </tr>

            <tr>
              <td>Minimum Buy Limit</td>
              <td>$ {data.MBL}</td>
            </tr>
            <tr>
              <td>Minimum Sell Limit</td>
              <td>$ {data.MSL}</td>
            </tr>
          </tbody>
        </Table>
      </Scrollbars>
      {show == true ? (
        <Modal show={show}>
          <Modal.Header>
            <Modal.Title>Edit Buy And Sell Setting</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col>
                  <Form.Text className="text-muted">
                    Buy Limit Fixed Amount AUD
                  </Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="BLFAAUD"
                    placeholder="Enter Amount"
                    value={member.BLFAAUD}
                    onChange={(e) => handleInputs(e)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Text className="text-muted">
                    Buy Limit Percentage
                  </Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="BLP"
                    placeholder="Enter Amount"
                    value={member.BLP}
                    onChange={(e) => handleInputs(e)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Text className="text-muted">
                    Sell Limit Percentage
                  </Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="SLP"
                    placeholder="Enter Amount"
                    value={member.SLP}
                    onChange={(e) => handleInputs(e)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Text className="text-muted">
                    Minimum Buy Limit
                  </Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="MBL"
                    placeholder="Enter Amount"
                    value={member.MBL}
                    onChange={(e) => handleInputs(e)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Text className="text-muted">
                    Minimum Sell Limit
                  </Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="MSL"
                    placeholder="Enter Amount"
                    value={member.MSL}
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
