import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import "../../../stylesheets/Statement.css";
import { useTranslation } from "react-i18next";
import BASE_URL from "../../../config";

export default function AUDLog() {
  const { t } = useTranslation();
  const [data, setData] = useState([]); //table data
  var columns = [
    { title: "id", field: "_id", hidden: true },
    { title: "Date", field: "date" },
    { title: "Company Referance Share AUD", field: "CRSA" },
    { title: "XNA Bought AUD", field: "XBA" },
    { title: "XNA Sold AUD", field: "XSA" },
    { title: "Company Profit Share AUD", field: "CPSA" },
    { title: "AUD Net", field: "audnet" },
    { title: "AUD Balance", field: "audbal" },
    { title: "XNA Balance", field: "xnabal" },
    { title: "XNA/AUD", field: "xnaaud" },
  ];

  useEffect(() => {
    async function fetchBooks() {
      const response = await fetch(`${BASE_URL}/audlogget`, {
        credentials: "include",
      });
      const json = await response.json();
      setData(json.al);
      console.log(json.al);
    }
    fetchBooks();
  }, []);

  return (
    <div className="statement">
      <h6 className="stath6">{t("AUD Account Description")}</h6>
      <div className="MT">
        <MaterialTable
          title="AUD Account Log"
          columns={columns}
          // icons={tableIcons}
          data={data}
        />
      </div>
    </div>
  );
}
