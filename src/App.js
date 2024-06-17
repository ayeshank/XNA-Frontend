import "./App.css";
import { useState, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./componentss/Header";
import RoutesNav from "./componentss/Routes";
// import { client } from "./ApolloClient/client";
// import { ApolloProvider } from '@apollo/client';
import LocaleContext from "./LocaleContext";
import Loading from "./componentss/Loading";
// import { withNamespaces } from 'react-i18next';
import i18n from "./i18n";
import { DataProvider } from "./ContextAPI/CurrencyRates.js";
import { CrossRatesProvider } from "./ContextAPI/CrossRates.js";
// import ExchangeRatePage from './components/ExchangeRatesPage';
// import { ThemeProvider } from "@material-ui/core/styles";
// import { createTheme as CreateTheme } from "@material-ui/core/styles";

// const Theme = CreateTheme({
//   breakpoints: {
//     values: {
//       lg: 1024,
//       md: 768,
//       sm: 480,
//       xl: 1280,
//       xs: 0,
//     },
//   },
// });

function App() {
  const [locale, setLocale] = useState(i18n.language);

  i18n.on("languageChanged", (lng) => setLocale(i18n.language)); // i18n.on('languageChanged', (lng) => setLocale(i18n.language));
  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <Suspense fallback={<Loading />}>
        {/* <ApolloProvider client={client}> */}
        <DataProvider>
          <CrossRatesProvider>
            {/* <ThemeProvider theme={Theme}> */}
            <div className="App">
              <BrowserRouter>
                <RoutesNav />
                <Header />
              </BrowserRouter>
            </div>
            {/* </ThemeProvider> */}
          </CrossRatesProvider>
        </DataProvider>
        {/* </ApolloProvider> */}
      </Suspense>
    </LocaleContext.Provider>
  );
}

export default App;
