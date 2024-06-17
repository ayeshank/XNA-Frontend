// import React, { useState } from "react";
// import { useQuery, gql } from "@apollo/client";

// const EXCHANGE_RATES = gql`
//   query GetExchangeRates($namee: String!) {
//     rates(currency: $namee) {
//       currency
//       rate
//     }
//   }
// `;

// function ExchangeRatePage() {
//   const [name,setName]=useState("AUD")
//   const { data, loading, error } = useQuery(EXCHANGE_RATES, {
//     variables: { namee:"AUD" },
//     // pollInterval: 400,
//     // notifyOnNetworkStatusChange: true,
//   });

//   if (loading) {
//     return <div>loading</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return data.rates.map(({ currency, rate }) => (
//     <div key={currency}>
//       <p>
//         {currency}: {rate}
//       </p>
//     </div>
//   ));
// }
// export default ExchangeRatePage;