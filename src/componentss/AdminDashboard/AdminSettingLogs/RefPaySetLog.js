import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import "../../../stylesheets/Statement.css";
import { useTranslation } from "react-i18next";

export default function RefPaySetLog() {
  const { t } = useTranslation();
  const [data, setData] = useState([]); //table data
  var columns = [
    { title: "id", field: "_id", hidden: true },
    { title: "Date", field: "date" },
    { title: "Admin No", field: "adminno" },
    { title: "Admin Name", field: "adminname" },
    { title: "Referance Level 1", field: "RefPerLVL1" },
    { title: "Referance Level 2", field: "RefPerLVL2" },
    { title: "Referance Level 3", field: "RefPerLVL3" },
    { title: "Referance Level 4", field: "RefPerLVL4" },
    { title: "Referance Level 5", field: "RefPerLVL5" },
    { title: "Referance Level 6", field: "RefPerLVL6" },
    { title: "Referance Level 7", field: "RefPerLVL7" },
    { title: "Referance Level 8", field: "RefPerLVL8" },
    { title: "Referance Level 9", field: "RefPerLVL9" },
    { title: "Referance Level 10", field: "RefPerLVL10" },
    { title: "Referance Level 11", field: "RefPerLVL11" },
    { title: "Referance Level 12", field: "RefPerLVL12" },
  ];

  useEffect(() => {
    async function fetchBooks() {
      const response = await fetch("/refpaylogsetget", {
        credentials: "include",
      });
      const json = await response.json();
      setData(json.rl);
      console.log(json.rl);
    }
    fetchBooks();
  }, []);

  return (
    <div className="statement">
      <h6 className="stath6">{t("Referral Payment Setting Log")}</h6>
      <div className="MT">
        <MaterialTable
          title="Referral Payment Setting Log"
          columns={columns}
          // icons={tableIcons}
          data={data}
        />
      </div>
    </div>
  );
}
