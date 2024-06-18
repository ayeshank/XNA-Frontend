import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { ListGroup } from "react-bootstrap";
import "../../stylesheets/Statement.css";
import { useTranslation } from "react-i18next";
import BASE_URL from "../../config";

export default function Statement() {
  const { t } = useTranslation();
  const [statement, setStatement] = useState([]);
  const [totdeposit, setTotdeposit] = useState(0);
  const [totwithdraw, setTotwithdraw] = useState(0);

  const caldeposit = () => {
    var sum = statement.reduce(function (prev, current) {
      return parseFloat(prev) + parseFloat(current.xnadeposit);
    }, 0);
    setTotdeposit(sum);
  };

  const calwithdraw = () => {
    var sum = statement.reduce(function (prev, current) {
      return parseFloat(prev) + parseFloat(current.xnawithdraw);
    }, 0);
    setTotwithdraw(sum);
  };
  var columns = [
    { title: "id", field: "_id", hidden: true },
    {
      title: "Date",
      field: "date",
      type: "date",
      dateSetting: { locale: "en-GB" },
    },
    // {title: "Name", field: "name"},
    // {title: "Surname", field: "surname"},
    { title: "Description", field: "description" },
    { title: "Deposit", field: "xnadeposit" },
    { title: "Withdrawn", field: "xnawithdraw" },
    { title: "Balance", field: "balance" },
  ];
  useEffect(() => {
    async function fetchBooks() {
      const response = await fetch(`${BASE_URL}/statement`, {
        credentials: "include",
      });
      const json = await response.json();
      if (json.stat.length == 1) {
        setStatement(json[0].stat);
      } else {
        setStatement(json.stat);
      }
      console.log(json.stat);
    }
    fetchBooks();
    caldeposit();
    calwithdraw();
  }, []);
  if (!statement.length) {
    return null;
  }
  return (
    <div className="statement">
      <h6 className="stath6">{t("Member Statement")}</h6>
      <div className="LG1">
        <ListGroup horizontal>
          <ListGroup.Item>Member No : {statement[1].memberno}</ListGroup.Item>
          <ListGroup.Item>
            Name : {statement[1].name} {statement[1].surname}
          </ListGroup.Item>
        </ListGroup>
      </div>
      <div className="LG2">
        <ListGroup horizontal>
          <ListGroup.Item variant="success">
            Deposit :{" "}
            {(Math.floor(totdeposit * 1000000000) / 1000000000).toFixed(10)}
          </ListGroup.Item>
          <ListGroup.Item variant="danger">
            Withdrawn :{" "}
            {(Math.floor(totwithdraw * 1000000000) / 1000000000).toFixed(10)}
          </ListGroup.Item>
          <ListGroup.Item variant="info">
            Total :{" "}
            {(
              (Math.floor(parseFloat(totdeposit) - parseFloat(totwithdraw)) *
                1000000000) /
              1000000000
            ).toFixed(10)}
          </ListGroup.Item>
        </ListGroup>
      </div>
      {/* <h6 className="stath6" >{t('Member Statement')}</h6>
          <div className="LG1" >
          <ListGroup horizontal>
            <ListGroup.Item>Member No : 100000000000</ListGroup.Item>
            <ListGroup.Item>Name : Ayesha Noor Khan</ListGroup.Item>
          </ListGroup>
          </div>
          <div className="LG2">
          <ListGroup horizontal>
          <ListGroup.Item variant="danger">Withdrawn : 7439.0000000000</ListGroup.Item>
            <ListGroup.Item variant="success">Deposit : 7439.6706840360</ListGroup.Item>
            <ListGroup.Item variant="info">Total : 0.0000000000</ListGroup.Item>
          </ListGroup>
          </div> */}
      <div className="MT">
        <MaterialTable
          title="Member Statement Log"
          columns={columns}
          options={{
            rowStyle: {
              fontSize: 11,
            },
          }}
          //   icons={tableIcons}
          data={statement}
          //   options={{
          //     headerStyle:
          //     {
          //       backgroundColor: 'black',
          //       color: 'white'
          //     },
          //     rowStyle:{
          //       backgroundColor: 'white',
          //       color: 'black' ,
          //     },
          //   }}
        />
      </div>
    </div>
  );
}
