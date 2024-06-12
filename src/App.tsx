import { Reset } from "./GlobalStyle";
import Router from "./Router";
import { ReactQueryDevtools} from "react-query/devtools";
import { ThemeProvider } from 'styled-components';
import { darkTheme,lightTheme } from "./theme";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atom";




function App() {
  const isDark = useRecoilValue(isDarkAtom);
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
