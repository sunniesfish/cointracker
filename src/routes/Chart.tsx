import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IChartProps {
    coinId:string;
}

interface IHistorical {
    time_open: number;
    time_close: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

function Chart({coinId}:IChartProps){
    const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv",coinId],()=>fetchCoinHistory(coinId),{refetchInterval:3000});
    return(
        <div>
            {isLoading ? 
            "Loading chart..." 
            : 
            <ApexChart 
                type="line"
                options={{
                    chart:{
                        height:500, 
                        width:500,
                        toolbar: {
                            show:false,
                        },
                    },
                    fill:{
                        type:"gradient",
                    },
                    tooltip:{
                        y:{
                            formatter:(value) => `$${value.toFixed(3)}`,
                        }
                    }
                }}
                series={[
                    {
                        name:"Price",
                        data:data?.map(price => price.close) as number[],
                    },
                ]}
            />}
        </div>
    );
}

export default Chart;