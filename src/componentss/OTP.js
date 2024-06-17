import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../stylesheets/Signup.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import BASE_URL from "../config";

export default function OTP() {
  const { t } = useTranslation();
  let navigate = useNavigate();
  const [vOtpCode, setvOtpCode] = useState(0);

  const postData = async (e) => {
    e.preventDefault();
    const res = await fetch(`${BASE_URL}/checkinviteOtpCode`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ vOtpCode }),
    });
    const data = await res.json();
    console.log(data);
    alert(data.ie_memberno);
    //  if(res.status === 500 || !data) {  window.alert("Code Not Verified"); }
    if (res.status === 501 || !data) {
      window.alert("OTP code expired, Kindly regenerate it.");
    } else {
      Cookies.set("refmno", data.ie_memberno);
      window.alert("OTP code verified");

      navigate("/signup");
    }
  };
  return (
    <div className="signup">
      <div className="signup-header">
        <h5>{t("OTP Verification")}</h5>
      </div>
      <br />
      <Form style={{ textAlign: "left" }}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>{t("OTP No.")}</Form.Label>
          <Form.Control
            type="text"
            placeholder="123456"
            value={vOtpCode}
            onChange={(e) => setvOtpCode(e.target.value)}
          />
          <Form.Text className="text-muted">
            {t("Enter 4 digits OTP Number")}
          </Form.Text>
        </Form.Group>
        <Button
          variant="success"
          style={{ width: "100%" }}
          type="submit"
          onClick={postData}
        >
          {t("Verify OTP")}
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
