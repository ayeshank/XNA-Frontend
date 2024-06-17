import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import "../../../stylesheets/Statement.css";
import { useTranslation } from "react-i18next";
import BASE_URL from "../../../config";

export default function MemberLog() {
  const { t } = useTranslation();
  const [data, setData] = useState([]); //table data
  var columns = [
    { title: "id", field: "_id", hidden: true },
    { title: "Date", field: "date" },
    { title: "Member No", field: "memberno" },
    { title: "Referral Member No", field: "refmno" },
    { title: "Name", field: "name" },
    { title: "Surname", field: "surname" },
    { title: "Email", field: "email" },
    { title: "Phone No", field: "phone" },
    { title: "Address", field: "address" },
    { title: "Postcode", field: "postcode" },
    { title: "State", field: "state" },
    { title: "Country", field: "country" },
    { title: "Bank Account Details", field: "bankaccinfo" },
    { title: "Fee AUD", field: "feeAUD" },
    { title: "Fee XNA", field: "feeXNA" },
    { title: "Referance Level 1", field: "rlvl1" },
    { title: "Referance Level 2", field: "rlvl2" },
    { title: "Referance Level 3", field: "rlvl3" },
    { title: "Referance Level 4", field: "rlvl4" },
    { title: "Referance Level 5", field: "rlvl5" },
    { title: "Referance Level 6", field: "rlvl6" },
    { title: "Referance Level 7", field: "rlvl7" },
    { title: "Referance Level 8", field: "rlvl8" },
    { title: "Referance Level 9", field: "rlvl9" },
    { title: "Referance Level 10", field: "rlvl10" },
    { title: "Referance Level 11", field: "rlvl11" },
    { title: "Referance Level 12", field: "rlvl12" },
  ];

  useEffect(() => {
    async function fetchBooks() {
      const response = await fetch(`${BASE_URL}/memberslogget`, {
        credentials: "include",
      });
      const json = await response.json();
      setData(json.ml);
      console.log(json.ml);
    }
    fetchBooks();
  }, []);

  return (
    <div className="statement">
      <h6 className="stath6">{t("Member Account Description")}</h6>
      <div className="MT">
        <MaterialTable
          title="Members Account Log"
          columns={columns}
          // icons={tableIcons}
          data={data}
        />
      </div>
    </div>
  );
}
