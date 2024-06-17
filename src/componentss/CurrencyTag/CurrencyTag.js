import React, { useState ,useContext} from 'react'
import Select from 'react-select';
import {DataContext} from '../../ContextAPI/CurrencyRates';
import '../../stylesheets/PrefferedCurrency.css';


const options = [
  { value: 'AUD', label: 'AUD' },
  { value: 'CAD', label: 'CAD' },
  { value: 'CHF', label: 'CHF' },
  { value: 'CNY', label: 'CNY' },
  { value: 'DKK', label: 'DKK' },
  { value: 'EUR', label: 'EUR' },
  { value: 'GBP', label: 'GBP' },
  { value: 'INR', label: 'INR' },
  { value: 'JPY', label: 'JPY' },
  { value: 'KWD', label: 'KWD' },
  { value: 'MYR', label: 'MYR' },
  { value: 'NOK', label: 'NOK' },
  { value: 'PKR', label: 'PKR' },
  { value: 'QAR', label: 'QAR' },
  { value: 'RUB', label: 'RUB' },
  { value: 'SEK', label: 'SEK' },
  { value: 'SGD', label: 'SGD' },
  { value: 'TRY', label: 'TRY' },
  { value: 'USD', label: 'USD' }
]

export default function CurrencyTag() {
  const value = useContext(DataContext);
  const [currency, setCurrency] = value.currency;
  const[favcur,setFavCur]=useState([]);

  const handleInput =(e)=>{
    setFavCur(e);
    setCurrency(e);
    alert(favcur);
    alert(currency);
    console.log(currency);
    console.log(favcur);
  } 

//   useEffect(() =>{
//     // setCurrency(favcur);
//     // alert(currency['value'])
//     localStorage.setItem('selectcurrency', JSON.stringify(favcur))
// },[favcur])

  return (
    <div className="prefferedcurrency">
      <h5>Change Preffered Currency</h5>
       <Select 
       options={options} 
       placeholder="Select Currencies" 
       isMulti
       onChange={handleInput}
       />
      {/* {favcur === null ? "" : favcur.map((v) => <h4>{v.label}</h4>)} */}
    </div>
  )
}
