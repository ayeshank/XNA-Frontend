import React, { useState, useEffect } from "react";
// import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
// import 'react-pro-sidebar/dist/css/styles.css';
import axios from "axios";
import { Link } from "react-router-dom";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "../stylesheets/Sidebar.css";
import { useNavigate } from "react-router-dom";
// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import BASE_URL from "../config";

export default function Sidebar() {
  const { t } = useTranslation();
  let navigate = useNavigate();
  const [memberData, setMemberData] = useState([]);
  const userLogout = () => {
    Cookies.set("member_userr", "");
    let amsg = "Logout User";
    axios
      .post(`${BASE_URL}logout`, amsg)
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
    <SideNav className="sidebar" style={{ backgroundColor: "black" }}>
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected="home">
        <NavItem eventKey="greet">
          <NavIcon>
            <i className="fa fa-user" style={{ fontSize: "1.5em" }} />
          </NavIcon>
          <NavText>
            {" "}
            {t("Welcome")}, {memberData.name}{" "}
          </NavText>
          <NavItem eventKey="" onClick={() => userLogout()}>
            <NavText>{t("Logout")}</NavText>
          </NavItem>
          {/* <NavItem eventKey=""><NavText>Sell Orders</NavText></NavItem> */}
        </NavItem>
        <NavItem eventKey="/dashboard/member">
          <NavIcon>
            {" "}
            <i className="fa fa-fw fa-home" style={{ fontSize: "1.5em" }} />
          </NavIcon>
          <NavText>
            <Link to="/dashboard/member">{t("Home")}</Link>
          </NavText>
        </NavItem>
        <NavItem eventKey="charts">
          <NavIcon>
            <i className="fa fa-money" style={{ fontSize: "1.5em" }} />
          </NavIcon>
          <NavText> {t("Buy Sell Orders")} </NavText>
          <NavItem eventKey="charts/linechart">
            <NavText>
              <Link to="/dashboard/buy">{t("Buy Orders")} </Link>
            </NavText>
          </NavItem>
          <NavItem eventKey="charts/barchart">
            <NavText>
              <Link to="/dashboard/sell">{t("Sell Orders")}</Link>
            </NavText>
          </NavItem>
        </NavItem>
        <NavItem>
          <NavIcon>
            {" "}
            <i className="fa fa-exchange" style={{ fontSize: "1.5em" }} />
          </NavIcon>
          <NavText>
            <Link to="/dashboard/transfer">{t("Transfer XNA")}</Link>
          </NavText>
        </NavItem>
        <NavItem>
          <NavIcon>
            {" "}
            <i className="fa fa-newspaper-o" style={{ fontSize: "1.5em" }} />
          </NavIcon>
          <NavText>
            <Link to="/dashboard/memberstatement">{t("Member Statement")}</Link>
          </NavText>
        </NavItem>

        {memberData.category == "Admin" ? (
          <NavItem>
            <NavIcon>
              <i
                className="fa fa-cog fa-spin fa-3x fa-fw"
                style={{ fontSize: "1.5em" }}
              />
            </NavIcon>
            <NavText>
              <Link to="/dashboard/admin/adminsetting">
                {t("Admin Setting")}
              </Link>
            </NavText>
          </NavItem>
        ) : (
          ""
        )}
        {/* <NavItem eventKey="adminsetting">
            <NavIcon><i className="fa fa-cog fa-spin fa-3x fa-fw" style={{ fontSize: '1.5em' }} /></NavIcon>
            <NavText>  {t('Admin Setting')}  </NavText>
            <NavItem eventKey="as/mfs"><NavText><Link to="/dashboard/admin/adminsetting">Membership Fee Setting </Link></NavText></NavItem>
            <NavItem eventKey=""><NavText>Referance Payments Setting</NavText></NavItem>
            <NavItem eventKey=""><NavText>Company Setting</NavText></NavItem>
            <NavItem eventKey=""><NavText>Buy And Sell Setting</NavText></NavItem>
            <NavItem eventKey=""><NavText>Company Input Setting</NavText></NavItem>
        </NavItem> */}
        {memberData.category == "Admin" ? (
          <NavItem eventKey="accountlogs">
            <NavIcon>
              <i className="fa fa-book" style={{ fontSize: "1.5em" }} />
            </NavIcon>
            <NavText> {t("Account Logs")} </NavText>
            <NavItem eventKey="">
              <NavText>
                <Link to="/dashboard/admin/accountsummary">
                  Account Summary
                </Link>
              </NavText>
            </NavItem>
            <NavItem eventKey="">
              <NavText>
                <Link to="/dashboard/admin/xnalog">XNA Account Log</Link>
              </NavText>
            </NavItem>
            <NavItem eventKey="">
              <NavText>
                <Link to="/dashboard/admin/memberlog">Member Log</Link>
              </NavText>
            </NavItem>
            <NavItem eventKey="">
              <NavText>
                <Link to="/dashboard/admin/companylog">
                  Company Account Log
                </Link>
              </NavText>
            </NavItem>
            <NavItem eventKey="">
              <NavText>
                <Link to="/dashboard/admin/audlog">AUD Account Log</Link>
              </NavText>
            </NavItem>
            <NavItem eventKey="">
              <NavText>
                <Link to="/dashboard/admin/rateslog">Rates Log</Link>
              </NavText>
            </NavItem>
          </NavItem>
        ) : (
          ""
        )}
        {memberData.category == "Admin" ? (
          <NavItem eventKey="adminlogs">
            <NavIcon>
              <i className="fa fa-book" style={{ fontSize: "1.5em" }} />
            </NavIcon>
            <NavText> {t("Admin Logs")} </NavText>
            <NavItem eventKey="">
              <NavText>
                <Link to="/dashboard/admin/memberfeesettinglog">
                  Membership Fee Setting Log
                </Link>
              </NavText>
            </NavItem>
            <NavItem eventKey="">
              <NavText>
                <Link to="/dashboard/admin/referralpaysettinglog">
                  Referral Payment Setting Log
                </Link>
              </NavText>
            </NavItem>
            <NavItem eventKey="">
              <NavText>
                <Link to="/dashboard/admin/companysettinglog">
                  Company Setting Log
                </Link>
              </NavText>
            </NavItem>
            <NavItem eventKey="">
              <NavText>
                <Link to="/dashboard/admin/buysellsettinglog">
                  Buy/Sell Setting Log
                </Link>
              </NavText>
            </NavItem>
            <NavItem eventKey="">
              <NavText>
                <Link to="/dashboard/admin/companyinputsettinglog">
                  Company Inputs Setting Log
                </Link>
              </NavText>
            </NavItem>
          </NavItem>
        ) : (
          ""
        )}
        {memberData.category == "Admin" ? (
          <NavItem eventKey="buysellrequests">
            <NavIcon>
              <i className="fa fa-tasks" style={{ fontSize: "1.5em" }} />
            </NavIcon>
            <NavText> {t("Buy Sell Requests")} </NavText>
            <NavItem eventKey="">
              <NavText>{t("Buy Requests")}</NavText>
            </NavItem>
            <NavItem eventKey="">
              <NavText>{t("Sell Requests")}</NavText>
            </NavItem>
          </NavItem>
        ) : (
          ""
        )}
        {memberData.category == "Admin" ? (
          <NavItem eventKey="managemembers">
            <NavIcon>
              <i className="fa fa-users" style={{ fontSize: "1.5em" }} />
            </NavIcon>
            <NavText> {t("Manage Members")} </NavText>
            <NavItem eventKey="">
              <NavText>
                <Link to="/dashboard/invitemember">{t("Invite Members")}</Link>
              </NavText>
            </NavItem>
            <NavItem eventKey="">
              <NavText>
                <Link to="/dashboard/modifymembersdetails">
                  {t("Modify Members")}
                </Link>
              </NavText>
            </NavItem>
          </NavItem>
        ) : (
          ""
        )}
      </SideNav.Nav>
    </SideNav>
  );
}
