import { Link, Route, Switch, useLocation, useParams, useRouteMatch } from "react-router-dom";
import { styled } from "styled-components";
import Chart from "./Chart";
import Price from "./Price";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { Helmet } from "react-helmet";


interface RouteParams{
    coinId:string;
}
interface RouteState{
    name:string;
}
interface ITags{
    coin_counter:number;
    ico_counter:number;
    id:string;
    name:string;
}
interface IInfoData{
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    logo: string;
    tags: ITags[];
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_a: string;
}


interface IPriceData{
    id: string;
    name: string;
    symbol: string;
    rank: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD:{
            ath_date:string;
            ath_price : number;
            market_cap : number; 
            market_cap_change_24h : number; 
            percent_change_1h : number; 
            percent_change_1y : number;
            percent_change_6h : number;
            percent_change_7d : number;
            percent_change_12h : number;
            percent_change_15m : number; 
            percent_change_24h : number; 
            percent_change_30d : number;
            percent_change_30m : number;
            percent_from_price_ath : number;
            price : number; 
            volume_24h : number; 
            volume_24h_change_24h : number;
        }
    };
}


const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{isActive:boolean}>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${props=>props.theme.innerColor};
  padding: 7px 0px;
  border-radius: 10px;
  color: ${props => props.isActive ? props.theme.accentColor : props.theme.bgColor};
  a {
    display: block;
  }
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${props=>props.theme.innerColor};
  padding: 10px 20px;
  border-radius: 10px;
  color: ${props=>props.theme.bgColor};
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;


const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;
const Header = styled.header`
    height: 8vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Title = styled.h1`
    font-size: 48px;
    color:${props =>props.theme.accentColor};
`;
const Loader = styled.span`
    text-align: center;
    display: block;
`;



function Coin(){
  const {state} = useLocation<RouteState>();
  const {coinId} = useParams<RouteParams>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");
  const { isLoading : infoLoading, data : infoData } = useQuery<IInfoData>(["info", coinId],() => fetchCoinInfo(coinId));
  const { isLoading : tickersLoading, data : tickersData } = useQuery<IPriceData>(
      ["tikcers", coinId],() => fetchCoinTickers(coinId),{refetchInterval:5000,}
    );
  const loading = infoLoading || tickersLoading;

  return (
      <Container>
        <Helmet>
          <title>{state?.name ? state.name : loading? "Loading...": infoData?.name}</title>
        </Helmet>
        <Link to={{pathname:`/`}}>
          <Header>
              <Title>{state?.name ? state.name : loading? "Loading...": infoData?.name}</Title>
          </Header>
        </Link>
        {loading? 
        <Loader>Loading...</Loader>
        :
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>{`$${tickersData?.quotes?.USD?.price.toFixed(2)}`}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>CHART</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>PRICE</Link>
            </Tab>
          </Tabs>

          <Switch>
              <Route path={`/:coinId/chart`}>
                  <Chart coinId={coinId}/>
              </Route>
              <Route path={`/:coinId/price`}>
                  <Price data={tickersData?.quotes?.USD}/>
              </Route>
          </Switch>
        </>
          }
      </Container>
  );
}

export default Coin;