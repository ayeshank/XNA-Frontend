import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../stylesheets/Signup.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import emailjs from "emailjs-com";
import { init } from "emailjs-com";
import BASE_URL from "../config";
// init("user_ctTO3wf4auf2drAPyOGXb");
init("gMeDMBQIfO6M7t6Qw");

export default function ForgotPass() {
  const { t } = useTranslation();
  let navigate = useNavigate();

  const [findEmail, setfindEmail] = useState("");
  var code;
  const sendEmail = () => {
    let templateParams = {
      email: findEmail,
      otpcode: code,
      myemail: "taimurkhan1850@gmail.com",
    };
    emailjs
      .send("gmail", "template_m4huz5c", templateParams, "gMeDMBQIfO6M7t6Qw")
      .then(
        (response) => {
          alert(
            "Check your Registered Email For Code Verification",
            response.status,
            response.text
          );
        },
        (err) => {
          alert("Unsuccessful", err);
        }
      );
  };

  const postData = async (e) => {
    e.preventDefault();
    code = parseInt(1 + Math.random() * (10000 - 1));
    alert(findEmail);
    const res = await fetch(`${BASE_URL}/findemail`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ findEmail, code }),
    });
    const data = await res.json();
    if (res.status === 500 || !data) {
      window.alert("Email Not Found");
    } else {
      sendEmail();
      //  window.alert("Successfully ");
      navigate("/forgotpassword/resetpassword");
    }
  };
  return (
    <div className="signup">
      <div className="signup-header">
        <h5>{t("Forgot Password")}</h5>
      </div>
      <br />
      <Form style={{ textAlign: "left" }}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>{t("Email Address")}</Form.Label>
          <Form.Control
            type="text"
            placeholder="xyz@gmail.com"
            value={findEmail}
            onChange={(e) => setfindEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            {t("Enter Registered Email Address")}
          </Form.Text>
        </Form.Group>
        <Button
          variant="success"
          style={{ width: "100%" }}
          type="submit"
          onClick={postData}
        >
          {t("Continue")}
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
