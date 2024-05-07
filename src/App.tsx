import { Reset } from "./GlobalStyle";
import Router from "./Router";
import { ReactQueryDevtools} from "react-query/devtools";

function App() {
  return (
    <>
    <Reset/>
    <Router/>
    <ReactQueryDevtools/>
    </>
  );
}

export default App;
