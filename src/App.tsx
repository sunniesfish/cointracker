import { Reset } from "./GlobalStyle";
import Router from "./Router";
import { ReactQueryDevtools} from "react-query/devtools";
import { ThemeProvider } from 'styled-components';
import { darkTheme,lightTheme } from "./theme";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons'; // 올바른 아이콘 가져오기
import styled from "styled-components";

const ToggleBtn = styled.button`
  background-color: transparent;
  color: ${props=>props.theme.innerColor};
  border: none;
  position: fixed;
  left: 20px;
  top: 10px;
`

function App() {
  const [isDark, setIsDark] = useState(false);
  const toggleDark = () => {setIsDark(current => !current)};
  return (
    <>
    <ThemeProvider theme={isDark? darkTheme : lightTheme}>
      <ToggleBtn onClick={toggleDark}>
        <FontAwesomeIcon icon={faCircleHalfStroke} size="2x"/>
      </ToggleBtn>
      <Reset/>
      <Router/>
      <ReactQueryDevtools/>
    </ThemeProvider>
    </>
  );
}

export default App;
