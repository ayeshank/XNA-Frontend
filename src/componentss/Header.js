import React, { useContext, useEffect,useState } from "react";
import {  Container, Nav, NavDropdown, NavItem,Navbar, Offcanvas } from "react-bootstrap";
import xnalogo from "./xnalogo.jpeg";
import i18n from "../i18n";
import LocaleContext from "../LocaleContext";
import { useTranslation } from "react-i18next";
import '../stylesheets/Header.css';
import Cookies from "js-cookie";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import HeaderLogin from "./HeaderLogin";
import HeaderLogout from "./HeaderLogout";


export default function Header() {
  const { t } = useTranslation();
  const { locale } = useContext(LocaleContext);
  let navigate = useNavigate();
  function changeLocale(l) {
    if (locale !== l) {
      i18n.changeLanguage(l);
    }
  }

  if(Cookies.get("member_userr") == undefined || Cookies.get("member_userr") == "" )
  {
    return(<HeaderLogout/>)
  }
  else
  {
    return(<HeaderLogin/>)
  }

}


// if (Cookies.get("member_userr") != undefined && memberData)
// {

// return (
//  <div>
   
//    <Navbar
//    key={expand}
//    bg='black' variant="dark"
//    expand={expand}
//    className="mb-3"
//    fixed="top"
//    >
//      <Container fluid>
//        <Navbar.Brand
//          style={{
//            color: "rgb(182, 175, 76)",
//            fontFamily: "Arial, Helvetica, sans-serif",
//          }}
//          href="/"
//        >
//          <img
//            alt=""
//            src={xnalogo}
//            width="40"
//            height="30"
//            className="d-inline-block align-top"
//          />{" "}
//          NASHIMIUM
//        </Navbar.Brand>
//        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
//        <Navbar.Offcanvas
//          id={`offcanvasNavbar-expand-${expand}`}
//          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
//          placement="start"
//        >
//          <Offcanvas.Header closeButton>
//          <img
//            alt=""
//            src={xnalogo}
//            width="40"
//            height="30"
//            className="d-inline-block align-top"
//          />
//            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}
//             style={{
//              color: "rgb(182, 175, 76)",
//              fontFamily: "Arial, Helvetica, sans-serif",
//            }}
//            >
//              NASHIMIUM
//            </Offcanvas.Title>
//          </Offcanvas.Header>
//          <Offcanvas.Body style={{backgroundColor:'black',textDecoration:'none'}}>
           
//            <Nav className="justify-content-end flex-grow-1 pe-3" bg='dark' variant='dark'>
//              <Nav.Link eventKey="/dashboard/member">
//                  <Link to="/dashboard/member">{t("Home")}</Link>
//              </Nav.Link>
//              <NavDropdown title={t("Buy Sell Orders")} id={`offcanvasNavbarDropdown-expand-${expand}`}>
//                <NavDropdown.Item ><Link className="navdropdownTextColor" to="/dashboard/buy">{t("Buy Orders")} </Link></NavDropdown.Item>
//                <NavDropdown.Item ><Link className="navdropdownTextColor" to="/dashboard/sell">{t("Sell Orders")}</Link></NavDropdown.Item>
//              </NavDropdown>
//              <Nav.Link>
//                  <Link className="navTextColor" to="/dashboard/transfer">{t("Transfer XNA")}</Link>
//              </Nav.Link>
//              <Nav.Link>
//                  <Link className="navTextColor" to="/dashboard/memberstatement">{t("Member Statement")}</Link>
//              </Nav.Link>

//              {memberData.category == "Admin" ? 
//                <>
//                  <Nav.Link>
//                      <Link className="navTextColor" to="/dashboard/admin/adminsetting">
//                        {t("Admin Setting")}
//                      </Link>
//                  </Nav.Link>

//                  <NavDropdown title={t("Account Logs")} id={`offcanvasNavbarDropdown-expand-${expand}`}>
//                    <NavDropdown.Item ><Link className="navdropdownTextColor" to="/dashboard/admin/accountsummary">Account Summary</Link></NavDropdown.Item>
//                    <NavDropdown.Item ><Link className="navdropdownTextColor" to="/dashboard/admin/xnalog">XNA Account Log</Link></NavDropdown.Item>
//                    <NavDropdown.Item ><Link className="navdropdownTextColor" to="/dashboard/admin/memberlog">Member Log</Link></NavDropdown.Item>
//                    <NavDropdown.Item ><Link className="navdropdownTextColor" to="/dashboard/admin/companylog">Company Account Log</Link></NavDropdown.Item>
//                    <NavDropdown.Item ><Link className="navdropdownTextColor" to="/dashboard/admin/audlog">AUD Account Log</Link></NavDropdown.Item>
//                    <NavDropdown.Item ><Link className="navdropdownTextColor" to="/dashboard/admin/rateslog">Rates Log</Link></NavDropdown.Item>
//                  </NavDropdown>

//                  <NavDropdown title={t("Admin Logs")} id={`offcanvasNavbarDropdown-expand-${expand}`}>
//                    <NavDropdown.Item ><Link className="navdropdownTextColor" to="/dashboard/admin/memberfeesettinglog">Membership Fee Setting Log</Link></NavDropdown.Item>
//                    <NavDropdown.Item ><Link className="navdropdownTextColor" to="/dashboard/admin/referralpaysettinglog">Referral Payment Setting Log</Link></NavDropdown.Item>
//                    <NavDropdown.Item ><Link className="navdropdownTextColor" to="/dashboard/admin/companysettinglog">Company Setting Log</Link></NavDropdown.Item>
//                    <NavDropdown.Item ><Link className="navdropdownTextColor" to="/dashboard/admin/buysellsettinglog">Buy/Sell Setting Log</Link></NavDropdown.Item>
//                    <NavDropdown.Item ><Link className="navdropdownTextColor" to="/dashboard/admin/companyinputsettinglog">Company Inputs Setting Log</Link></NavDropdown.Item>
//                  </NavDropdown>

//                  <NavDropdown title={t("Buy Sell Requests")} id={`offcanvasNavbarDropdown-expand-${expand}`}>
//                    <NavDropdown.Item ><Link className="navdropdownTextColor" to="/">{t("Buy Requests")}</Link></NavDropdown.Item>
//                    <NavDropdown.Item ><Link className="navdropdownTextColor" to="/">{t("Sell Requests")}</Link></NavDropdown.Item>
//                  </NavDropdown>

//                  <NavDropdown title={t("Manage Members")} id={`offcanvasNavbarDropdown-expand-${expand}`}>
//                    <NavDropdown.Item ><Link className="navdropdownTextColor" to="/dashboard/invitemember">{t("Invite Members")}</Link></NavDropdown.Item>
//                    <NavDropdown.Item ><Link className="navdropdownTextColor" to="/dashboard/modifymembersdetails">{t("Modify Members")}</Link></NavDropdown.Item>
//                  </NavDropdown>
//                </>
//               : 
//                ""
//              }


//              {Cookies.get("member_userr") == undefined ? 
//                <Nav.Link>
//                  <Link className="navTextColor" to="/login">{t("Login")}</Link>
//                </Nav.Link>
//               : 
//                <Nav.Link className="navTextColor" eventKey="" onClick={() => userLogout()}>{t("Logout")}
//                </Nav.Link>
//              }

//              <NavDropdown className="navTextColor" title={"🌏" + t("Language")} id="nav-dropdown">
//                <NavDropdown.Item onClick={() => changeLocale("tur")}>
//                  Turkish
//                </NavDropdown.Item>
//                <NavDropdown.Item onClick={() => changeLocale("en")}>
//                  English
//                </NavDropdown.Item>
//              </NavDropdown>
//            </Nav>
          
//          </Offcanvas.Body>
//        </Navbar.Offcanvas>
//      </Container>
//    </Navbar>
  
//  </div>
// )
// }
// else
// {
// return(

// <Navbar  fixed="top" variant="dark" style={{backgroundColor:'black',fontSize:"small"}}>
//  <Container>
//    <Navbar.Brand style={{color:"rgb(182, 175, 76)",fontFamily:"Arial, Helvetica, sans-serif"}} href="/">
//      <img
//        alt=""
//        src={xnalogo}
//        width="40"
//        height="30"
//        className="d-inline-block align-top"
//      />{' '}
//    NASHIMIUM
//    </Navbar.Brand>
//    <Nav className="justify-content-end">
 
//  {Cookies.get("member_userr") == undefined || Cookies.get("member_userr") == ""?
//  <Nav.Link><Link className="navTextColor" to="/login">{t("Login")}</Link></Nav.Link>
//  :
//  <Nav.Link className="navTextColor" eventKey="" onClick={() => userLogout()}>{t("Logout")}</Nav.Link>     
// }
 
//  <NavDropdown  className="navTextColor" title={"🌏"+t('Language')} id="nav-dropdown">
//      <NavDropdown.Item  onClick={() => changeLocale('tur')}>Turkish</NavDropdown.Item>
//      <NavDropdown.Item onClick={() => changeLocale('en')}>English</NavDropdown.Item>
//    </NavDropdown>
// </Nav>
//  </Container>
// </Navbar>


// )
// }