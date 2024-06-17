import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Row, Col, Table } from "react-bootstrap";
import Loading from "../../Loading";
import { Scrollbars } from "rc-scrollbars";
import "../../../stylesheets/AdminSettingDashboard.css";
import { useTranslation } from "react-i18next";
import BASE_URL from "../../../config";

const myStyle = {
  fontSize: "2em",
  lineHeight: "2em",
};

export default function MemberInformation() {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [memberData, setMemberData] = useState([]);
  const [member, setMember] = useState({
    adminname: "",
    adminno: "",
    AUD: "",
    CAD: "",
    CHF: "",
    EUR: "",
    GBP: "",
    KWD: "",
    TRY: "",
    USD: "",
    XNA: "",
    NewMembershipInvest: "",
    MonthlyMembershipFee: "",
  });

  async function fetchBooks() {
    const response = await fetch(`${BASE_URL}/memfeeget`, {
      credentials: "include",
    });
    const json = await response.json();
    setMemberData(json.mf2[0]);
    setMember(json.mf2[0]);
  }
  var name, valueV;
  const handleInputs = (e) => {
    console.log("Updated ", member);
    name = e.target.name;
    valueV = e.target.value;
    setMember({ ...member, [name]: valueV });
  };
  const postData = async (e) => {
    setMemberData({ ...memberData, ...member });
    const { AUD, NewMembershipInvest, MonthlyMembershipFee } = member;
    const res = await fetch(`${BASE_URL}/memfee`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        AUD,
        NewMembershipInvest,
        MonthlyMembershipFee,
      }),
    });
    const data = await res.json();
    if (res.status === 500 || !data) {
      window.alert("Failed To Updated Membership Fee Setting");
    } else {
      window.alert("Updated Membership Fee Setting");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="xnarates">
      <h6 className="xnarateh6">{t("Membership Fees Setting")}</h6>
      <p className="xnaratep">{t("Edit Membership Fees Details")}</p>
      <div className="xnaratediv2">
        <p>{t("Edit Membership Fees")}</p>
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
              <td>Membership Fee AUD</td>
              <td>{memberData.AUD}</td>
            </tr>
            <tr>
              <td>Membership Fee CAD</td>
              <td>{memberData.CAD}</td>
            </tr>
            <tr>
              <td>Membership Fee CHF</td>
              <td>{memberData.CHF}</td>
            </tr>
            <tr>
              <td>Membership Fee EUR</td>
              <td>{memberData.EUR}</td>
            </tr>
            <tr>
              <td>Membership Fee GBP</td>
              <td>{memberData.GBP}</td>
            </tr>
            <tr>
              <td>Membership Fee KWD</td>
              <td>{memberData.KWD}</td>
            </tr>
            <tr>
              <td>Membership Fee TRY</td>
              <td>{memberData.TRY}</td>
            </tr>
            <tr>
              <td>Membership Fee USD</td>
              <td>{memberData.USD}</td>
            </tr>
            <tr>
              <td>Membership Fee XNA</td>
              <td>{memberData.XNA}</td>
            </tr>
            <tr>
              <td>New Membership Investment AUD</td>
              <td>{memberData.NewMembershipInvest}</td>
            </tr>
            <tr>
              <td>Monthly Membership Fee AUD</td>
              <td>{memberData.MonthlyMembershipFee}</td>
            </tr>
          </tbody>
        </Table>
      </Scrollbars>
      {show == true ? (
        <Modal show={show}>
          <Modal.Header>
            <Modal.Title>Edit Membership Fee Setting</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col>
                  <Form.Text className="text-muted">
                    {t("Membership Amount In AUD")}
                  </Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="AUD"
                    placeholder="Enter Membership Amount In AUD"
                    value={member.AUD}
                    onChange={(e) => handleInputs(e)}
                  />
                </Col>
              </Row>
              {/* <Row >
                  <Col ><Form.Text className="text-muted">{t('Membership Amount In CAD')}</Form.Text></Col>
                  <Col><Form.Control size="sm" type="text" name="CAD" placeholder="" value={member.CAD} disabled/></Col>
              </Row>
              <Row >
                  <Col ><Form.Text className="text-muted">{t('Membership Amount In CHF')}</Form.Text></Col>
                  <Col><Form.Control size="sm" type="text" name="CHF" placeholder="" value={member.CHF} disabled/></Col>
              </Row>
              <Row >
                  <Col ><Form.Text className="text-muted">{t('Membership Amount In EUR')}</Form.Text></Col>
                  <Col><Form.Control size="sm" type="text" name="EUR" placeholder="" value={member.EUR} disabled/></Col>
              </Row>
              <Row >
                  <Col ><Form.Text className="text-muted">{t('Membership Amount In GBP')}</Form.Text></Col>
                  <Col><Form.Control size="sm" type="text" name="GBP" placeholder="" value={member.GBP} disabled/></Col>
              </Row>
              <Row >
                  <Col ><Form.Text className="text-muted">{t('Membership Amount In KWD')}</Form.Text></Col>
                  <Col><Form.Control size="sm" type="text" name="KWD" placeholder="" value={member.KWD} disabled/></Col>
              </Row>
              <Row >
                  <Col ><Form.Text className="text-muted">{t('Membership Amount In TRY')}</Form.Text></Col>
                  <Col><Form.Control size="sm" type="text" name="TRY" placeholder="" value={member.TRY} disabled/></Col>
              </Row>
              <Row >
                  <Col ><Form.Text className="text-muted">{t('Membership Amount In USD')}</Form.Text></Col>
                  <Col><Form.Control size="sm" type="text" name="USD" placeholder="" value={member.USD} disabled/></Col>
              </Row>
              <Row >
                  <Col ><Form.Text className="text-muted">{t('Membership Amount In XNA')}</Form.Text></Col>
                  <Col><Form.Control size="sm" type="text" name="XNA" placeholder="" value={member.XNA} disabled/></Col>
              </Row> */}
              <Row>
                <Col>
                  <Form.Text className="text-muted">
                    {t("New Membership Investment In AUD")}
                  </Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="NewMembershipInvest"
                    placeholder=""
                    value={member.NewMembershipInvest}
                    onChange={(e) => handleInputs(e)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Text className="text-muted">
                    {t("Monthly Membership Fee In AUD")}
                  </Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="MonthlyMembershipFee"
                    placeholder=""
                    value={member.MonthlyMembershipFee}
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
