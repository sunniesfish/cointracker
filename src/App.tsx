import { Reset } from "./GlobalStyle";
import Router from "./Router";
import { ReactQueryDevtools} from "react-query/devtools";
import { ThemeProvider } from 'styled-components';
import { darkTheme,lightTheme } from "./theme";
import { useState } from "react";




function App() {
  const toggleDark = () => {setIsDark(current => !current)};
  return (
    <>
    <ThemeProvider theme={isDark? darkTheme : lightTheme}>
      <Reset/>
      <Router/>
      <ReactQueryDevtools/>
    </ThemeProvider>
    </>
  );
}

export default App;
