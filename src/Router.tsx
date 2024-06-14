import { BrowserRouter, Route, Switch } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";



function Router() {
    return(
        <BrowserRouter basename="/cointracker">
            <Switch>
                <Route path="/:coinId">
                    <Coin/>
                </Route>
                <Route path="/">
                    <Coins/>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}
export default Router;