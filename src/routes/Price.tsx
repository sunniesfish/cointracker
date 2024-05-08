import styled from "styled-components";

interface IPriceProps {
    data?:{
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
}

const PriceContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    border: none;
    border-radius: 15px;
    margin-bottom: 10px;
    background-color: ${props=>props.theme.innerColor};
    span{
        color: ${props=>props.theme.bgColor};
        display: block;
        margin: 0 30px 0 30px;
    }
`;

function Price({data}:IPriceProps){
    console.log(data)
    return(
        <div>
            {data == null ?
            "Loading chart..." 
            : 
            <>
            {Object.entries(data).map(([key,value]) => 
            <PriceContent key={key}>
                <span>{key}</span>
                <span>{value}</span>
            </PriceContent>
            )}
            </>
            }
        </div>
    );
}

export default Price;