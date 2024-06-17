import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Row, Col, Table } from "react-bootstrap";
import { Scrollbars } from "rc-scrollbars";
import Loading from "../../Loading";
import "../../../stylesheets/AdminSettingDashboard.css";
import { useTranslation } from "react-i18next";
import BASE_URL from "../../../config";

const myStyle = {
  fontSize: "2em",
  lineHeight: "2em",
};

export default function RefPaySet() {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [member, setMember] = useState({
    RefPerLVL1: 0,
    RefPerLVL2: 0,
    RefPerLVL3: 0,
    RefPerLVL4: 0,
    RefPerLVL5: 0,
    RefPerLVL6: 0,
    RefPerLVL7: 0,
    RefPerLVL8: 0,
    RefPerLVL9: 0,
    RefPerLVL10: 0,
    RefPerLVL11: 0,
    RefPerLVL12: 0,
  });

  async function fetchBooks() {
    const response = await fetch(`${BASE_URL}/refpayget`, {
      credentials: "include",
    });
    const json = await response.json();
    setData(json.rf2[0]);
    setMember(json.rf2[0]);
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
    const {
      RefPerLVL1,
      RefPerLVL2,
      RefPerLVL3,
      RefPerLVL4,
      RefPerLVL5,
      RefPerLVL6,
      RefPerLVL7,
      RefPerLVL8,
      RefPerLVL9,
      RefPerLVL10,
      RefPerLVL11,
      RefPerLVL12,
    } = member;
    const res = await fetch(`${BASE_URL}/refpaypost`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        RefPerLVL1,
        RefPerLVL2,
        RefPerLVL3,
        RefPerLVL4,
        RefPerLVL5,
        RefPerLVL6,
        RefPerLVL7,
        RefPerLVL8,
        RefPerLVL9,
        RefPerLVL10,
        RefPerLVL11,
        RefPerLVL12,
      }),
    });
    const data = await res.json();
    if (res.status === 500 || !data) {
      window.alert("Invalid Registration");
    } else {
      window.alert("Referance Setting Updated");
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
      <h6 className="xnarateh6">{t("Referral Payment Setting")}</h6>
      <p className="xnaratep">{t("Edit Referral Payment Details")}</p>
      <div className="xnaratediv2">
        <p>{t("Edit Referance Payments")}</p>
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
              <td>Referance LVL1</td>
              <td>{data.RefPerLVL1}%</td>
            </tr>
            <tr>
              <td>Referance LVL2</td>
              <td>{data.RefPerLVL2}%</td>
            </tr>
            <tr>
              <td>Referance LVL3</td>
              <td>{data.RefPerLVL3}%</td>
            </tr>
            <tr>
              <td>Referance LVL4</td>
              <td>{data.RefPerLVL4}%</td>
            </tr>
            <tr>
              <td>Referance LVL5</td>
              <td>{data.RefPerLVL5}%</td>
            </tr>
            <tr>
              <td>Referance LVL6</td>
              <td>{data.RefPerLVL6}%</td>
            </tr>
            <tr>
              <td>Referance LVL7</td>
              <td>{data.RefPerLVL7}%</td>
            </tr>
            <tr>
              <td>Referance LVL8</td>
              <td>{data.RefPerLVL8}%</td>
            </tr>
            <tr>
              <td>Referance LVL9</td>
              <td>{data.RefPerLVL9}%</td>
            </tr>
            <tr>
              <td>Referance LVL10</td>
              <td>{data.RefPerLVL10}%</td>
            </tr>
            <tr>
              <td>Referance LVL11</td>
              <td>{data.RefPerLVL11}%</td>
            </tr>
            <tr>
              <td>Referance LVL12</td>
              <td>{data.RefPerLVL12}%</td>
            </tr>
            <tr style={{ backgroundColor: "black", color: "white" }}>
              <td style={{ backgroundColor: "black", color: "white" }}>
                Total
              </td>
              <td style={{ backgroundColor: "black", color: "white" }}>
                {data.TotRef}%
              </td>
            </tr>
          </tbody>
        </Table>
      </Scrollbars>
      {show == true ? (
        <Modal show={show}>
          <Modal.Header>
            <Modal.Title>Edit Referance Payments</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col>
                  <Form.Text className="text-muted">
                    LVL1 Payment Percentage
                  </Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="number"
                    name="RefPerLVL1"
                    placeholder="Enter Amount"
                    autoFocus
                    value={member.RefPerLVL1}
                    onChange={(e) => handleInputs(e)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Text className="text-muted">
                    LVL2 Payment Percentage
                  </Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="number"
                    name="RefPerLVL2"
                    placeholder="Enter Amount"
                    value={member.RefPerLVL2}
                    onChange={(e) => handleInputs(e)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Text className="text-muted">
                    LVL3 Payment Percentage
                  </Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="number"
                    name="RefPerLVL3"
                    placeholder="Enter Amount"
                    value={member.RefPerLVL3}
                    onChange={(e) => handleInputs(e)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Text className="text-muted">
                    LVL4 Payment Percentage
                  </Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="number"
                    name="RefPerLVL4"
                    placeholder="Enter Amount"
                    value={member.RefPerLVL4}
                    onChange={(e) => handleInputs(e)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Text className="text-muted">
                    LVL5 Payment Percentage
                  </Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="number"
                    name="RefPerLVL5"
                    placeholder="Enter Amount"
                    value={member.RefPerLVL5}
                    onChange={(e) => handleInputs(e)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Text className="text-muted">
                    LVL6 Payment Percentage
                  </Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="number"
                    name="RefPerLVL6"
                    placeholder="Enter Amount"
                    value={member.RefPerLVL6}
                    onChange={(e) => handleInputs(e)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Text className="text-muted">
                    LVL7 Payment Percentage
                  </Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="number"
                    name="RefPerLVL7"
                    placeholder="Enter Amount"
                    value={member.RefPerLVL7}
                    onChange={(e) => handleInputs(e)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Text className="text-muted">
                    LVL8 Payment Percentage
                  </Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="number"
                    name="RefPerLVL8"
                    placeholder="Enter Amount"
                    value={member.RefPerLVL8}
                    onChange={(e) => handleInputs(e)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Text className="text-muted">
                    LVL9 Payment Percentage
                  </Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="number"
                    name="RefPerLVL9"
                    placeholder="Enter Amount"
                    value={member.RefPerLVL9}
                    onChange={(e) => handleInputs(e)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Text className="text-muted">
                    LVL10 Payment Percentage
                  </Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="number"
                    name="RefPerLVL10"
                    placeholder="Enter Amount"
                    value={member.RefPerLVL10}
                    onChange={(e) => handleInputs(e)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Text className="text-muted">
                    LVL11 Payment Percentage
                  </Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="number"
                    name="RefPerLVL11"
                    placeholder="Enter Amount"
                    value={member.RefPerLVL11}
                    onChange={(e) => handleInputs(e)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Text className="text-muted">
                    LVL12 Payment Percentage
                  </Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="number"
                    name="RefPerLVL12"
                    placeholder="Enter Amount"
                    value={member.RefPerLVL12}
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
