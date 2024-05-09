import { Reset } from "./GlobalStyle";
import Router from "./Router";
import { ReactQueryDevtools} from "react-query/devtools";
import { ThemeProvider } from 'styled-components';
import { darkTheme,lightTheme } from "./theme";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atom";




function App() {
  const isDark = useRecoilValue(isDarkAtom);
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
