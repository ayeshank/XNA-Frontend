import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Nav,
  NavDropdown,
  NavItem,
  Navbar,
  Offcanvas,
} from "react-bootstrap";
import xnalogo from "./xnalogo.jpeg";
import i18n from "../i18n";
import LocaleContext from "../LocaleContext";
import { useTranslation } from "react-i18next";
import "../stylesheets/Header.css";
import Cookies from "js-cookie";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../config";

export default function HeaderLogin() {
  const [memberData, setMemberData] = useState([]);
  const [expand, setExpand] = useState("xxl");
  const { t } = useTranslation();
  const { locale } = useContext(LocaleContext);
  let navigate = useNavigate();
  function changeLocale(l) {
    if (locale !== l) {
      i18n.changeLanguage(l);
    }
  }
  const userLogout = () => {
    Cookies.set("member_userr", "");
    let amsg = "Logout User";
    axios
      .post(`${BASE_URL}/logout`, amsg)
      .then((res) => {
        alert("Logout Successfully");
      })
      .catch((err) => {
        alert("An error occurred while logging out");
      });
    navigate("/login");
  };

  useEffect(() => {
    async function fetchMemInfo() {
      const response = await fetch(`${BASE_URL}/memberinfo`, {
        credentials: "include",
      });
      const json = await response.json();
      setMemberData(json.memberLogin);
    }
    fetchMemInfo();
  }, []);

  return (
    <div>
      <Navbar
        key={expand}
        bg="black"
        variant="dark"
        expand={expand}
        className="mb-3"
        fixed="top"
      >
        <Container fluid>
          <Navbar.Brand
            style={{
              color: "rgb(182, 175, 76)",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
            href="/dashboard/member"
          >
            <img
              alt=""
              src={xnalogo}
              width="40"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            NASHIMIUM
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <img
                alt=""
                src={xnalogo}
                width="40"
                height="30"
                className="d-inline-block align-top"
              />
              <Offcanvas.Title
                id={`offcanvasNavbarLabel-expand-${expand}`}
                style={{
                  color: "rgb(182, 175, 76)",
                  fontFamily: "Arial, Helvetica, sans-serif",
                }}
              >
                NASHIMIUM
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body
              style={{ backgroundColor: "black", textDecoration: "none" }}
            >
              <Nav
                className="justify-content-end flex-grow-1 pe-3"
                bg="dark"
                variant="dark"
              >
                <Nav.Link eventKey="/dashboard/member">
                  <Link className="navTextColor" to="/dashboard/member">
                    {t("Home")}
                  </Link>
                </Nav.Link>
                <NavDropdown
                  title={t("Buy Sell Orders")}
                  id={`offcanvasNavbarDropdown-expand-${expand}`}
                  className="navdropdowntitle"
                >
                  <NavDropdown.Item>
                    <Link className="navdropdownTextColor" to="/dashboard/buy">
                      {t("Buy Orders")}{" "}
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link className="navdropdownTextColor" to="/dashboard/sell">
                      {t("Sell Orders")}
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link>
                  <Link className="navTextColor" to="/dashboard/transfer">
                    {t("Transfer XNA")}
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link
                    className="navTextColor"
                    to="/dashboard/memberstatement"
                  >
                    {t("Member Statement")}
                  </Link>
                </Nav.Link>

                {memberData ? (
                  memberData.category == "Admin"
                ) : "Admin" == "Admin" ? (
                  <>
                    <Nav.Link>
                      <Link
                        className="navTextColor"
                        to="/dashboard/admin/adminsetting"
                      >
                        {t("Admin Setting")}
                      </Link>
                    </Nav.Link>

                    <NavDropdown
                      title={t("Account Logs")}
                      id={`offcanvasNavbarDropdown-expand-${expand}`}
                      className="navdropdowntitle"
                    >
                      <NavDropdown.Item>
                        <Link
                          className="navdropdownTextColor"
                          to="/dashboard/admin/accountsummary"
                        >
                          Account Summary
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link
                          className="navdropdownTextColor"
                          to="/dashboard/admin/xnalog"
                        >
                          XNA Log
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link
                          className="navdropdownTextColor"
                          to="/dashboard/admin/memberlog"
                        >
                          Member Log
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link
                          className="navdropdownTextColor"
                          to="/dashboard/admin/companylog"
                        >
                          Company Log
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link
                          className="navdropdownTextColor"
                          to="/dashboard/admin/audlog"
                        >
                          AUD Log
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link
                          className="navdropdownTextColor"
                          to="/dashboard/admin/rateslog"
                        >
                          Rates Log
                        </Link>
                      </NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown
                      title={t("Admin Logs")}
                      id={`offcanvasNavbarDropdown-expand-${expand}`}
                      className="navdropdowntitle"
                    >
                      <NavDropdown.Item>
                        <Link
                          className="navdropdownTextColor"
                          to="/dashboard/admin/memberfeesettinglog"
                        >
                          Membership Fee Setting Log
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link
                          className="navdropdownTextColor"
                          to="/dashboard/admin/referralpaysettinglog"
                        >
                          Referral Payment Setting Log
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link
                          className="navdropdownTextColor"
                          to="/dashboard/admin/companysettinglog"
                        >
                          Company Setting Log
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link
                          className="navdropdownTextColor"
                          to="/dashboard/admin/buysellsettinglog"
                        >
                          Buy/Sell Setting Log
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link
                          className="navdropdownTextColor"
                          to="/dashboard/admin/companyinputsettinglog"
                        >
                          Company Inputs Setting Log
                        </Link>
                      </NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown
                      title={t("Buy Sell Requests")}
                      id={`offcanvasNavbarDropdown-expand-${expand}`}
                      className="navdropdowntitle"
                    >
                      <NavDropdown.Item>
                        <Link className="navdropdownTextColor" to="/error">
                          {t("Buy Requests")}
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link className="navdropdownTextColor" to="/error">
                          {t("Sell Requests")}
                        </Link>
                      </NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown
                      title={t("Manage Members")}
                      id={`offcanvasNavbarDropdown-expand-${expand}`}
                      className="navdropdowntitle"
                    >
                      <NavDropdown.Item>
                        <Link
                          className="navdropdownTextColor"
                          to="/dashboard/invitemember"
                        >
                          {t("Invite Members")}
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link
                          className="navdropdownTextColor"
                          to="/dashboard/modifymembersdetails"
                        >
                          {t("Modify Members")}
                        </Link>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                ) : (
                  ""
                )}

                <Nav.Link className="navTextColor logout_button" eventKey="">
                  <Link
                    className="navTextColor logout_button"
                    to="/"
                    onClick={() => userLogout()}
                  >
                    {t("Logout")}
                  </Link>
                </Nav.Link>

                <NavDropdown
                  className="navTextColor"
                  title={"🌏" + t("Language")}
                  id="nav-dropdown"
                >
                  <NavDropdown.Item onClick={() => changeLocale("tur")}>
                    Turkish
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => changeLocale("en")}>
                    English
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}
