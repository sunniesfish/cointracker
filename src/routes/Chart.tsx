import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useState } from "react";
import {useTheme} from "styled-components";

interface IChartProps {
    coinId:string;
}

interface IHistorical {
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: number;
}

function Chart({coinId}:IChartProps){
    const theme = useTheme();
    const seiresData = (data:IHistorical[]|undefined) => data?.map((price)=>({
        x:new Date(price.time_open).toLocaleDateString('en-US', {month: '2-digit',day: '2-digit',hour: "2-digit",minute:"2-digit"}),
        y:[parseFloat(price.open), parseFloat(price.high), parseFloat(price.low), parseFloat(price.close)]
    }))||[];


    const {isLoading, data} = useQuery<IHistorical[]>(
            ["ohlcv",coinId],
            ()=>fetchCoinHistory(coinId)
        );
    return(
        <div>
            {isLoading ? 
            "Loading chart..." 
            : 

            <ApexChart 
                type="candlestick"
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
                    },
                    xaxis:{
                        labels:{
                            style:{
                                colors:theme.textColor
                            }
                        }
                    },
                    yaxis:{
                        labels:{
                            style:{
                                colors:theme.textColor
                            }
                        }
                    }
                }}
                series={[
                    {
                        name:"price",
                        data: seiresData(data)
                    }
                ]}
            />}
        </div>
    );
}

export default Chart;