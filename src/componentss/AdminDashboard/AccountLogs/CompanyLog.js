import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import "../../../stylesheets/Statement.css";
import { useTranslation } from "react-i18next";
import BASE_URL from "../../../config";

export default function CompanyLog() {
  const { t } = useTranslation();
  const [data, setData] = useState([]); //table data
  var columns = [
    { title: "id", field: "_id", hidden: true },
    { title: "Date", field: "date" },
    { title: "Company Membership Income AUD", field: "CMI" },
    { title: "Company Referance Share AUD", field: "CRS" },
    { title: "Company Exchange Income AUD", field: "CEI" },
    { title: "Company Interest Income AUD", field: "CII" },
    { title: "Company Outgoings AUD", field: "CO" },
    { title: "Company Investment Amount AUD", field: "CIA" },
    { title: "Company Investment Return Capital AUD", field: "CIRC" },
    { title: "Company Investment Profit AUD", field: "CIP" },
    { title: "Company Profit Share Percentage", field: "CPSP" },
    { title: "Company Gross Before Share AUD", field: "CGBS" },
    { title: "Company Profit Share AUD", field: "CPS" },
    { title: "Company Net AUD", field: "CN" },
    { title: "Company Balance AUD", field: "CB" },
  ];

  useEffect(() => {
    async function fetchBooks() {
      const response = await fetch(`${BASE_URL}/companylogget`, {
        credentials: "include",
      });
      const json = await response.json();
      setData(json.cl);
      console.log(json.cl);
    }
    fetchBooks();
  }, []);

  return (
    <div className="statement">
      <h6 className="stath6">{t("Company Account Description")}</h6>
      <div className="MT">
        <MaterialTable
          title="Company Account Log"
          columns={columns}
          // icons={tableIcons}
          data={data}
        />
      </div>
    </div>
  );
}
