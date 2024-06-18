import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../stylesheets/Login.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import BASE_URL from "../config";
// import Theme from "../index.js";

// const Styles = {
//   [Theme.breakpoints.up("xs")]: {
//     "& .login-header": {
//       display: "none",
//     },
//   },
// };

export default function Login() {
  const { t } = useTranslation();
  let navigate = useNavigate();
  const [member, setMember] = useState({ memberno: "", password: "" });
  var name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setMember({ ...member, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    const { memberno, password } = member;
    const res = await fetch(`${BASE_URL}/memberlogin`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify({ memberno, password }),
    });
    const data = await res.json();
    if (res.status == 200) {
      Cookies.set("member_userr", memberno);
      window.alert("Successfully Login");
      navigate("/dashboard/member");
    } else {
      if (res.status == 400) {
        alert("Member not found");
      } else if (res.status == 401) {
        alert("Password is Invalid");
      } else {
        alert("Some Error Occured");
      }
    }
  };
  return (
    <div className="login">
      <div className="login-header">
        <h5>{t("Login")} </h5>
      </div>
      <br />
      <Form style={{ textAlign: "left" }} onSubmit={postData}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>{t("Member No")}</Form.Label>
          <Form.Control
            type="text"
            name="memberno"
            placeholder="100245678231"
            value={member.memberno}
            onChange={handleInputs}
            required
          />
          <Form.Text className="text-muted">
            {t("Enter 12 digits Member Number")}
          </Form.Text>
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
        {/* <Link to="/dashboard/member"><Button variant="success" style={{width:"100%"}} type="submit" onClick={postData}>{t('Login')}</Button></Link> */}
        <Button
          variant="success"
          style={{ width: "100%" }}
          type="submit"
          onClick={postData}
        >
          {t("Login")}
        </Button>

        <Form.Text className="text-muted">
          <Link to="/forgotpassword">{t("Forgot Password")}</Link>
        </Form.Text>
        <hr />
        <Button
          variant="secondary"
          onClick={() => navigate("/otp")}
          style={{ width: "100%" }}
        >
          {t("Create an Account")}
        </Button>
      </Form>
    </div>
  );
}
