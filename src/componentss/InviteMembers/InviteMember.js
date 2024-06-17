import React, { useState, useEffect } from "react";
import { InputGroup, FormControl, Button, Form } from "react-bootstrap";
import "../../stylesheets/XNARates.css";
import { useTranslation } from "react-i18next";
import Loading from "../Loading.js";
import emailjs from "emailjs-com";
import Cookies from "js-cookie";
import { init } from "emailjs-com";
import BASE_URL from "../../config.js";
init("gMeDMBQIfO6M7t6Qw");

export default function InviteMember() {
  const { t } = useTranslation();
  // let navigate = useNavigate();
  const [memberData, setMemberData] = useState([]);
  const [newMemberEmail, setnewMemberEmail] = useState("");

  var code = parseInt(1 + Math.random() * (10000 - 1));
  const sendEmail = () => {
    let templateParams = {
      email: newMemberEmail,
      otpcode: code,
      myemail: memberData.email,
    };
    emailjs
      .send("gmail", "template_ydjxhwm", templateParams, "gMeDMBQIfO6M7t6Qw")
      .then(
        (response) => {
          alert("Member Invited", response.status, response.text);
          setnewMemberEmail("");
        },
        (err) => {
          alert("Fail to Invite Member", err);
        }
      );
  };

  const postData = async (e) => {
    e.preventDefault();
    var memberEmail = memberData.email;
    alert(memberEmail);
    alert(newMemberEmail);
    alert(code);
    const res = await fetch(`${BASE_URL}/InviteMemberReq`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newMemberEmail, code, memberEmail }),
    });
    const data = await res.json();
    if (res.status === 500 || !data) {
      window.alert("Fail to send email to invited member");
    } else {
      sendEmail();
      // alert("Email sent");
    }
  };
  useEffect(() => {
    async function fetchBooks() {
      const response = await fetch(`${BASE_URL}/memberinfo`, {
        credentials: "include",
      });
      const json = await response.json();
      setMemberData(json.memberLogin);
    }
    fetchBooks();
  }, []);
  if (!memberData) {
    return <Loading />;
  }
  return (
    <div className="xnarates">
      <h6 className="xnarateh6" style={{ backgroundColor: "rgb(8, 143, 114)" }}>
        {t("Invite Members")}
      </h6>
      <p className="xnaratep">{t("Invite New Members to Nashimium")}</p>
      <Form.Label htmlFor="basic-url">{t("Your Email Address")}</Form.Label>
      <InputGroup className="mb-3">
        <FormControl
          placeholder={t("")}
          value={memberData.email}
          aria-describedby="basic-addon2"
          disabled
        />
      </InputGroup>
      <Form.Label htmlFor="basic-url">
        {t("Enter Email Address of Invited Member")}
      </Form.Label>
      <InputGroup className="mb-3">
        <FormControl
          placeholder={t("Enter Email Address")}
          aria-describedby="basic-addon2"
          type="email"
          name="rec"
          value={newMemberEmail}
          onChange={(e) => setnewMemberEmail(e.target.value)}
        />
        {/* <Button style={{backgroundColor:"rgb(8, 143, 114)",border:"none"}} 
onClick={()=>alert("Thi feature unable right now")} 
id="button-addon2">{t('Invite Member')}</Button><br/> */}

        <Button
          style={{ backgroundColor: "rgb(8, 143, 114)", border: "none" }}
          onClick={postData}
          id="button-addon2"
        >
          {t("Invite Member")}
        </Button>
        <br />
      </InputGroup>
      <br />
    </div>
  );
}
