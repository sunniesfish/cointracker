import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { styled } from "styled-components";

interface RouteParams{
    coinId:string;
}
interface RouteState{
    name:string;
}
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
    const[loading, setLoading] = useState(false);
    const {coinId} = useParams<RouteParams>();
    const {state} = useLocation<RouteState>();
    console.log(state);
    return (
        <Container>
            <Header>
                <Title>{state?.name||"Loading..."}</Title>
            </Header>
            {loading? 
            <Loader>Loading...</Loader>
            :
                null
            }
        </Container>
    );
}

export default Coin;