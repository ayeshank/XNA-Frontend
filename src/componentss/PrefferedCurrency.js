import React, { useState } from 'react';
import { InputGroup, FormControl, DropdownButton,Dropdown} from 'react-bootstrap';
import ReactCountryFlag from "react-country-flag";
import '../stylesheets/PrefferedCurrency.css';

const myStyle={
    fontSize: '2em',
    lineHeight: '2em',
  }

export default function PrefferedCurrency() {
    const[currency,setCurrency]=useState("AUD");
  return (
    <div className="prefferedcurrency">
     <InputGroup className="mb-5" style={{fontSize:"small"}}>
   
    <FormControl aria-label="Text input with dropdown button" placeholder="Select Currency for Transactions" value={currency} disabled/>
    <DropdownButton
    variant="dark"
      title="Select Currency"
      style={{backgroundColor:"rgb(8, 143, 114)",border:"none"}}
    >
      <Dropdown.Item onClick={()=>setCurrency("AUD")} ><ReactCountryFlag countryCode="AU" svg style={myStyle}/> AUD</Dropdown.Item>
      <Dropdown.Item onClick={()=>setCurrency("CAD")} ><ReactCountryFlag countryCode="CA" svg style={myStyle}/> CAD</Dropdown.Item>
      <Dropdown.Item onClick={()=>setCurrency("CHF")}><ReactCountryFlag countryCode="LI" svg style={myStyle}/> CHF</Dropdown.Item>
      <Dropdown.Item onClick={()=>setCurrency("TR")}><ReactCountryFlag countryCode="Cn" svg style={myStyle}/> TRY</Dropdown.Item>
      {/* <Dropdown.Divider /> */}
      {/* <Dropdown.Item href="#">Separated link</Dropdown.Item> */}
    </DropdownButton>
  </InputGroup>
    </div>
  )
}