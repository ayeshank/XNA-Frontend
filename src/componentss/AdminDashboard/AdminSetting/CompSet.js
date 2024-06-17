import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Row, Col, Table } from "react-bootstrap";
import { Scrollbars } from "rc-scrollbars";
import "../../../stylesheets/AdminSettingDashboard.css";
import { useTranslation } from "react-i18next";
import BASE_URL from "../../../config";

export default function CompSet() {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [member, setMember] = useState({ CompPSP: 0, ExRate: 0 });

  async function fetchBooks() {
    const response = await fetch(`${BASE_URL}/compSetget`, {
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
    setData({ ...data, ...member });
    const { CompPSP, ExRate } = member;
    const res = await fetch(`${BASE_URL}/compSetpost`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        CompPSP,
        ExRate,
      }),
    });
    const data = await res.json();
    if (res.status === 500 || !data) {
      window.alert("Invalid Input");
    } else {
      window.alert("Company Setting Updated");
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
      <h6 className="xnarateh6">{t("Company Setting")}</h6>
      <p className="xnaratep">{t("Edit Company Setting Details")}</p>
      <div className="xnaratediv2">
        <p>{t("Edit Company Setting")}</p>
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
              <td>Company Profit Share Percentage</td>
              <td>{data.CompPSP}%</td>
            </tr>
            <tr>
              <td>Exchange Rate</td>
              <td>{data.ExRate}%</td>
            </tr>
          </tbody>
        </Table>
      </Scrollbars>
      {show == true ? (
        <Modal show={show}>
          <Modal.Header>
            <Modal.Title>Edit Company Setting</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col>
                  <Form.Text className="text-muted">
                    Company Profit Share Percentage
                  </Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="CompPSP"
                    placeholder="Enter Amount"
                    value={member.CompPSP}
                    onChange={(e) => handleInputs(e)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Text className="text-muted">Exchange Rate</Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="ExRate"
                    placeholder="Enter Amount"
                    value={member.ExRate}
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
