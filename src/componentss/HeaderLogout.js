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

export default function HeaderLogout() {
  const [expand, setExpand] = useState("xxl");
  const { t } = useTranslation();
  const { locale } = useContext(LocaleContext);
  function changeLocale(l) {
    if (locale !== l) {
      i18n.changeLanguage(l);
    }
  }
  return (
    <Navbar
      fixed="top"
      variant="dark"
      style={{ backgroundColor: "black", fontSize: "small" }}
    >
      <Container fluid>
        <Navbar.Brand
          style={{
            color: "rgb(182, 175, 76)",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
          href="/"
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
        <Nav className="justify-content-end">
          <Nav.Link
            className="justify-content-end navTextColor logout_button"
            eventKey=""
          >
            <Link className="navTextColor logout_button" to="/login">
              {t("Login")}
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
      </Container>
    </Navbar>
  );
}
