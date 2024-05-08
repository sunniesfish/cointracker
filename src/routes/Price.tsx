import { useQuery } from "react-query";
import { fetchCoinTickers } from "../api";

interface IPriceProps {
    coinId:string;
}



function Price({coinId}:IPriceProps){
    console.log(fetchCoinTickers(coinId))
    // const [isLoading, data] = useQuery<>(
    //     ["ticker",coinId],
    //     () => fetchCoinTickers(coinId)
    // );
    // console.log(data)
    return(
        <div>

        </div>
    );
}

export default Price;