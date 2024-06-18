import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button, Modal, Form, Row, Col, Table } from "react-bootstrap";
import { Scrollbars } from "rc-scrollbars";
import "../stylesheets/XNARates.css";
import { useTranslation } from "react-i18next";
import moment from "moment";
import BASE_URL from "../config.js";

const myStyle = {
  fontSize: "2em",
  lineHeight: "2em",
};

export default function MemberInformation() {
  const { t } = useTranslation();

  const [show, setShow] = useState(false);
  const [memberData, setMemberData] = useState(null);
  const [member, setMember] = useState({
    _id: "",
    refmno: "",
    name: "",
    surname: "",
    email: "",
    phone: "",
    address: "",
    postcode: "",
    state: "",
    country: "",
    bankaccinfo: "",
    memberno: "",
    payAud: "",
    password: "",
    date: "",
  });

  var name, valueV;
  const handleInputs = (e) => {
    console.log("Updated ", member);
    name = e.target.name;
    valueV = e.target.value;
    setMember({ ...member, [name]: valueV });
  };
  const postData = () => {
    setMemberData({ ...memberData, ...member });
    const {
      _id,
      refmno,
      name,
      surname,
      email,
      phone,
      address,
      postcode,
      state,
      country,
      bankaccinfo,
      memberno,
      password,
      payAud,
      date,
      prefCurrency,
    } = member;
    var UpdatedMemInfo = {
      _id,
      refmno,
      name,
      surname,
      email,
      phone,
      address,
      postcode,
      state,
      country,
      bankaccinfo,
      memberno,
      password,
      payAud,
      date,
      prefCurrency,
    };
    axios
      .put(`${BASE_URL}/memberInfoUpdate`, UpdatedMemInfo)
      .then((res) => {
        alert("Updated successfully!");
      })
      .catch((err) => {
        console.log(err.response);
        alert("An error occurred! Try submitting the form again.");
      });
  };

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch(`${BASE_URL}/memberinfo`, {
          credentials: "include",
          cache: "no-cache",
        });
        const json = await response.json();
        setMemberData(json.memberLogin);
        setMember(json.memberLogin);
        console.log(json.memberLogin);
      } catch (error) {
        console.error("Error fetching member information:", error);
      }
    }
    fetchBooks();
  }, []);

  return memberData != null ? (
    <div className="xnarates">
      <h6 className="xnarateh6">{t("Member Information")}</h6>
      <p className="xnaratep">
        {memberData.name}'s {t("Personal Information")}
      </p>
      <div className="xnaratediv2">
        <p>{t("Edit Member Information")}</p>
        <i
          className="fa fa-pencil-square"
          onClick={() => setShow(true)}
          style={{ fontSize: "1.75em" }}
        />
      </div>
      <Scrollbars className="scroller" style={{ height: 400 }}>
        <Table responsive style={{ fontSize: "small" }}>
          <tbody>
            <tr>
              <td>{t("Membership No.")}</td>
              <td>{memberData.memberno}</td>
            </tr>
            <tr>
              <td>{t("Name")}</td>
              <td>{memberData.name}</td>
            </tr>
            <tr>
              <td>{t("Surname")}</td>
              <td>{memberData.surname}</td>
            </tr>
            <tr>
              <td>{t("Email")}</td>
              <td>{memberData.email}</td>
            </tr>
            <tr>
              <td>{t("Member Role")}</td>
              <td>{memberData.category}</td>
            </tr>
            <tr>
              <td>{t("Phone No.")}</td>
              <td>{memberData.phone}</td>
            </tr>
            <tr>
              <td>{t("Address")}</td>
              <td>{memberData.address}</td>
            </tr>
            <tr>
              <td>{t("Postcode")}</td>
              <td>{memberData.postcode}</td>
            </tr>
            <tr>
              <td>{t("State")}</td>
              <td>{memberData.state}</td>
            </tr>
            <tr>
              <td>{t("Country")}</td>
              <td>{memberData.country}</td>
            </tr>
            <tr>
              <td>{t("Bank Account")}</td>
              <td>{memberData.bankaccinfo}</td>
            </tr>
            <tr>
              <td>{t("Password")}</td>
              <td>{memberData.password}</td>
            </tr>
            <tr>
              <td>{t("Referance No.")}</td>
              <td>{memberData.refmno}</td>
            </tr>
            <tr>
              <td>{t("Membership Date")}</td>
              <td>{moment(memberData.date).format("D-MMM-YYYY, h:mm:ss a")}</td>
            </tr>
            <tr>
              <td>{t("Payment AUD")}</td>
              <td>{memberData.payAud}</td>
            </tr>
          </tbody>
        </Table>
      </Scrollbars>
      {show == true ? (
        <Modal show={show}>
          <Modal.Header>
            <Modal.Title>Edit Member Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col>
                  <Form.Text className="text-muted">
                    {t("Membership No.")}
                  </Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="memberno"
                    placeholder="Enter Member No"
                    value={member.memberno}
                    disabled
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Text className="text-muted">{t("Name")}</Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={member.name}
                    onChange={(e) => handleInputs(e)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Text className="text-muted">{t("Surname")}</Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="surname"
                    placeholder="Enter Surname"
                    value={member.surname}
                    onChange={(e) => handleInputs(e)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Text className="text-muted">{t("Email")}</Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={member.email}
                    onChange={(e) => handleInputs(e)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Text className="text-muted">
                    {t("Member Role")}
                  </Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="role"
                    placeholder="Enter "
                    value="Admin"
                    disabled
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Text className="text-muted">{t("Phone No.")}</Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="number"
                    name="phone"
                    placeholder="Enter Phone No."
                    value={member.phone}
                    onChange={(e) => handleInputs(e)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Text className="text-muted">{t("Address")}</Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="address"
                    placeholder="Enter Address"
                    value={member.address}
                    onChange={(e) => handleInputs(e)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Text className="text-muted">{t("Postcode")}</Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="postcode"
                    placeholder="Enter Postcode"
                    value={member.postcode}
                    onChange={(e) => handleInputs(e)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Text className="text-muted">{t("State")}</Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="state"
                    placeholder="Enter State"
                    value={member.state}
                    onChange={(e) => handleInputs(e)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Text className="text-muted">{t("Country")}</Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="country"
                    placeholder="Enter Country"
                    value={member.country}
                    onChange={(e) => handleInputs(e)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Text className="text-muted">
                    {t("Bank Account")}
                  </Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="bankaccinfo"
                    placeholder="Enter Bank Account"
                    value={member.bankaccinfo}
                    onChange={(e) => handleInputs(e)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Text className="text-muted">{t("Password")}</Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="password"
                    placeholder="Enter New Password"
                    value={member.password}
                    onChange={(e) => handleInputs(e)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Text className="text-muted">
                    {t("Referance No.")}
                  </Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="refmno"
                    placeholder="Enter Referance No."
                    value={member.refmno}
                    disabled
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Text className="text-muted">
                    {t("Membership Date")}
                  </Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="date"
                    placeholder="Enter Membership Date"
                    value={member.date}
                    disabled
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Text className="text-muted">
                    {t("Payment AUD")}
                  </Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="number"
                    name="payAud"
                    placeholder="Enter Payment AUD"
                    value={member.payAud}
                    disabled
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
  ) : (
    ""
  );
}
