import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import "../../../stylesheets/Statement.css";
import { useTranslation } from "react-i18next";

export default function CompInpSetLog() {
  const { t } = useTranslation();
  const [data, setData] = useState([]); //table data
  var columns = [
    { title: "id", field: "_id", hidden: true },
    { title: "Date", field: "date" },
    { title: "Admin No", field: "adminno" },
    { title: "Admin Name", field: "adminname" },
    { title: "Interest Income AUD", field: "InIncA" },
    { title: "Company Outgoings AUD", field: "CompOutA" },
    { title: "Company Investment Amount AUD", field: "CompInvestAmA" },
    {
      title: "Company Investment Return Capital AUD",
      field: "CompInvestRetCapA",
    },
    { title: "Company Investment Profit AUD", field: "CompInvestProA" },
  ];

  useEffect(() => {
    async function fetchBooks() {
      const response = await fetch("/compInpSetLogget", {
        credentials: "include",
      });
      const json = await response.json();
      setData(json.cs2);
      console.log(json.cs2);
    }
    fetchBooks();
  }, []);

  return (
    <div className="statement">
      <h6 className="stath6">{t("Company Input Setting Log")}</h6>
      <div className="MT">
        <MaterialTable
          title="Company Input Setting Log"
          columns={columns}
          data={data}
        />
      </div>
    </div>
  );
}
