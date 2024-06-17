import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import "../stylesheets/Signup.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import BASE_URL from "../config";

export default function Signup() {
  const { t } = useTranslation();
  let navigate = useNavigate();
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  // const [cont,setCont]=useState(false)
  const [genId, setgenId] = useState(0);
  const [member, setMember] = useState({
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
    password: "",
    payAud: "",
  });

  var name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setMember({ ...member, [name]: value });
  };

  var g = parseInt(1 + Math.random() * (1000000000000 - 1));
  const idGen = () => {
    console.log(g);
    member.memberno = genId;
    setgenId(g);
    member.memberno = g;
  };
  const loginAfterSignup = async (e) => {
    e.preventDefault();
    const { memberno, password } = member;
    const res = await fetch(`${BASE_URL}/memberlogin`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ memberno, password }),
    });
    const data = await res.json();
    if (res.status == 400) {
      alert("Member not found");
    } else if (res.status == 401) {
      alert("Password is Invalid");
    }
    //  else if(res.status == 422) {  alert("All field Are Required."); }
    else {
      Cookies.set("member_userr", memberno);
      navigate("/dashboard/member");
    }
  };

  const postData = async (e) => {
    alert("working1");
    e.preventDefault();
    console.log(member);
    var refmno = Cookies.get("refmno");
    var memberno = genId;
    var {
      name,
      surname,
      email,
      phone,
      address,
      postcode,
      state,
      country,
      bankaccinfo,
      password,
      payAud,
    } = member;
    payAud = parseFloat(payAud) + parseFloat(data.AUD);
    if (parseFloat(payAud) < parseFloat(data.NewMembershipInvest)) {
      alert(
        "Investment of Membership Fee should be equal to or greater than $" +
          data.NewMembershipInvest +
          ".00"
      );
    } else {
      const res = await fetch(`${BASE_URL}/membersignup`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
        }),
      });
      const data = await res.json();
      if (res.status === 422 || !data) {
        window.alert("Invalid Registration");
      } else if (res.status === 423) {
        window.alert("No such Referral Member Exist");
      } else {
        window.alert("Successfully Registration");
        loginAfterSignup();
        // navigate("/dashboard/member");
      }
    }
  };

  useEffect(() => {
    async function fetchBooks() {
      const response = await fetch(`${BASE_URL}/membersfeelastget`, {
        credentials: "include",
      });
      const json = await response.json();
      setData(json.ml);
      const response2 = await fetch(`${BASE_URL}/memberlastget`, {
        credentials: "include",
      });
      const json2 = await response2.json();
      setData2(json2.ml);
    }
    fetchBooks();
  }, [data2, data]);

  return (
    <div className="signup">
      <div className="signup-header">
        <h5>{t("Signup")}</h5>
      </div>
      <br />
      <Form style={{ textAlign: "left" }}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>{t("Referral Member No.")}</Form.Label>
          <Form.Control
            type="text"
            name="refmno"
            placeholder="100245678231"
            value={Cookies.get("refmno")}
            disabled
          />
          <Form.Label>{t("Member No.")}</Form.Label>
          {genId === 0 ? idGen() : ""}
          <Form.Control
            type="text"
            name="memberno"
            placeholder="100785351231"
            value={genId}
            disabled
          />
          <Form.Label>{t("Name")}</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder=""
            value={member.name}
            onChange={handleInputs}
            required
          />
          <Form.Label>{t("Surname")}</Form.Label>
          <Form.Control
            type="text"
            name="surname"
            placeholder=""
            value={member.surname}
            onChange={handleInputs}
            required
          />
          <Form.Label>{t("Email")}</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="xyz@gmail.com"
            value={member.email}
            onChange={handleInputs}
            required
          />
          <Form.Label>{t("Phone No.")}</Form.Label>
          <Form.Control
            type="number"
            name="phone"
            placeholder="1234-1234-1234"
            value={member.phone}
            onChange={handleInputs}
            required
          />
          <Form.Label>{t("Address")}</Form.Label>
          <Form.Control
            type="text"
            name="address"
            placeholder=""
            value={member.address}
            onChange={handleInputs}
            required
          />
          <Form.Label>{t("Postcode")}</Form.Label>
          <Form.Control
            type="text"
            name="postcode"
            placeholder=""
            value={member.postcode}
            onChange={handleInputs}
            required
          />
          <Form.Label>{t("State")}</Form.Label>
          <Form.Control
            type="text"
            name="state"
            placeholder=""
            value={member.state}
            onChange={handleInputs}
            required
          />
          <Form.Label>{t("Country")}</Form.Label>
          <Form.Control
            type="text"
            name="country"
            placeholder=""
            value={member.country}
            onChange={handleInputs}
            required
          />
          <Form.Label>{t("Bank Account")}</Form.Label>
          <Form.Control
            type="text"
            name="bankaccinfo"
            placeholder=""
            value={member.bankaccinfo}
            onChange={handleInputs}
            required
          />
          <Form.Label>{t("Membership Fee AUD")}</Form.Label>
          <Form.Control
            type="text"
            name="memfeeAUD"
            placeholder=""
            value={data.AUD}
            disabled
          />
          <Form.Label>{t("Investment Amount AUD")}</Form.Label>
          <Form.Control
            type="number"
            name="payAud"
            placeholder=""
            value={member.payAud}
            onChange={handleInputs}
            required
          />
          {/* <Form.Text className="text-muted">
    Enter 12 digits Member Number
    </Form.Text> */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>{t("Password")}</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={member.password}
            onChange={handleInputs}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          {/* <Form.Check type="checkbox" label="Check me out" /> */}
        </Form.Group>
        <Button
          variant="success"
          style={{ width: "100%" }}
          onClick={postData}
          type="submit"
        >
          {t("Signup")}
        </Button>
        <hr />
        <Link to="/login">
          <Button variant="secondary" style={{ width: "100%" }}>
            {t("Login")}
          </Button>
        </Link>
      </Form>
    </div>
  );
}
