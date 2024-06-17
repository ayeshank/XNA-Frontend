import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../stylesheets/Login.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import BASE_URL from "../../config";

export default function ForgotPassword() {
  const { t } = useTranslation();
  let navigate = useNavigate();
  const [vOtpCode, setvOtpCode] = useState(0);
  const [vPswd, setvPswd] = useState("");

  const postData = async (e) => {
    e.preventDefault();
    const res = await fetch(`${BASE_URL}/checkOtpCode`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ vOtpCode, vPswd }),
    });
    const data = await res.json();
    if (res.status === 500 || !data) {
      window.alert("Code Not Verified");
    } else if (res.status === 501 || !data) {
      window.alert("OTP code expired. Kindly regenrate it.");
    } else {
      window.alert("Successfully Changed Password");
      navigate("/login");
    }
  };
  return (
    <div className="login">
      <div className="login-header">
        <h5>{t("Reset Password")} </h5>
      </div>
      <br />
      <Form style={{ textAlign: "left" }}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>{t("Code Verification")}</Form.Label>
          <Form.Control
            type="text"
            name="otpcode"
            placeholder="e.g. 4257"
            value={vOtpCode}
            onChange={(e) => setvOtpCode(e.target.value)}
          />
          <Form.Text className="text-muted">
            {t("Enter 4 digit verification code sent at your email")}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>{t("New Password")}</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter New Password"
            value={vPswd}
            onChange={(e) => setvPswd(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
        <Button
          variant="success"
          style={{ width: "100%" }}
          type="submit"
          onClick={postData}
        >
          {" "}
          {t("Change Password")}
        </Button>

        {/* <Form.Text className="text-muted"><Link to="/forgotpassword">{t('Forgot Password')}</Link></Form.Text> */}
        <hr />
        <Button
          variant="secondary"
          onClick={() => navigate("/login")}
          style={{ width: "100%" }}
        >
          {t("Login")}
        </Button>
      </Form>
    </div>
  );
}
