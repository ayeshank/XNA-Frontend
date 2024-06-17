import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import "../../../stylesheets/Statement.css";
import { useTranslation } from "react-i18next";
import BASE_URL from "../../../config";

export default function XNALog() {
  const { t } = useTranslation();
  const [data, setData] = useState([]); //table data
  var columns = [
    { title: "id", field: "_id", hidden: true },
    { title: "Date", field: "date" },
    { title: "Member No", field: "memberno" },
    { title: "Name", field: "name" },
    { title: "Surname", field: "surname" },
    { title: "XNA Description", field: "description" },
    { title: "XNA Withdraw", field: "xnawithdraw" },
    { title: "XNA Deposit", field: "xnadeposit" },
    { title: "XNA Balance", field: "balance" },
  ];

  useEffect(() => {
    async function fetchBooks() {
      const response = await fetch(`${BASE_URL}/xnalogget`, {
        credentials: "include",
      });
      const json = await response.json();
      setData(json.xl);
      console.log(json.xl);
    }
    fetchBooks();
  }, []);

  return (
    <div className="statement">
      <h6 className="stath6">{t("XNA Account Description")}</h6>
      <div className="MT">
        <MaterialTable title="XNA Account Log" columns={columns} data={data} />
      </div>
    </div>
  );
}
