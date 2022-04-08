import { useEffect, useState } from 'react';
import Chart from 'chart.js';
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';

export default function ChartBar() {

    const [mydata , setData] = useState({});
    const url = `http://localhost:8000/v1/admins/sector_count/`;
    
   

    const chartdesign=(({mydata})=>{
        if(mydata){
        let config = {
            type: 'bar',
            data: {
                labels: [
                    'Tele',
                    'Water and Sewage',
                    'Roads Authority',
                    'ELPA'
                ],
                datasets: [
                    {
                        label: new Date().getFullYear(),
                        backgroundColor: '#03a9f4',
                        borderColor: '#03a9f4',
                        // data:[0,2,0,0],
                        data: [mydata.tele[0], mydata.water[0], mydata.roads[0], mydata.elpa[0]],
                        fill: false,
                        barThickness: 50,
                    },
                 
                ],
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                title: {
                    display: true,
                    text: 'Main Sectors',
                },
                // tooltips: {
                    // mode: 'index',
                    // intersect: true,
                // },
                hover: {
                    mode: 'nearest',
                    intersect: true,
                },
                legend: {
                    labels: {
                        fontColor: 'rgba(17,17,17,.7)',
                    },
                    align: 'end',
                    position: 'bottom',
                },
                scales: {
                    xAxes: [
                        {
                            display: false,
                            scaleLabel: {
                                display: true,
                                labelString: 'Main Sector',
                            },
                            gridLines: {
                                borderDash: [2],
                                borderDashOffset: [2],
                                color: 'rgba(33, 37, 41, 0.3)',
                                zeroLineColor: 'rgba(33, 37, 41, 0.3)',
                                zeroLineBorderDash: [2],
                                zeroLineBorderDashOffset: [2],
                            },
                        },
                    ],
                    yAxes: [
                        {
                            display: true,
                            scaleLabel: {
                                display: false,
                                labelString: 'Number of branchs',
                            },
                            gridLines: {
                                borderDash: [2],
                                drawBorder: false,
                                borderDashOffset: [2],
                                color: 'rgba(33, 37, 41, 0.2)',
                                zeroLineColor: 'rgba(33, 37, 41, 0.15)',
                                zeroLineBorderDash: [2],
                                zeroLineBorderDashOffset: [2],
                            },
                        },
                    ],
                },
            },
        };
        let ctx = document.getElementById('bar-chart').getContext('2d');
        window.myBar = new Chart(ctx, config);

    }
})


  
    useEffect(() => {
        var mdata = null;
        const fetchData = async () => {
            try {
              const response = await fetch(url);
              const json = await response.json();
              setData(json);
              mdata = json;
              console.log("Waterrrr: ",mdata.water);
            } catch (error) {
              console.log("error", error);
            }
          };
          fetchData();
        chartdesign({mydata});
    }, [ setData]);

    // {data &&
    //     //   <div>


    //     Object.keys(data).map((oneKey, i) => {
    //         return (
    //             <StatusCard
    //                     color="blue"
    //                     icon="group"
    //                     title = {data[oneKey][1]}
    //                     amount={data[oneKey][0]}
    //                     percentage="1.10"
    //                     percentageIcon="arrow_downward"
    //                     percentageColor="orange"
    //                     date="Since yesterday"
    //                 />

    //         )
    //     })

    // }


    return (
        <>
        

        <Card>
            <CardHeader color="blue" contentPosition="left">
                <h6 className="uppercase text-gray-200 text-xs font-medium">
                    {/* {mydata.tele[1]} */}
                </h6>
                <h2 className="text-white text-2xl">Number of Sectors' Branch</h2>
            </CardHeader>
            <CardBody>
                <div className="relative h-96">
                    <canvas id="bar-chart"></canvas>
                </div>
            </CardBody>
        </Card>
        

        </>
    );
}
