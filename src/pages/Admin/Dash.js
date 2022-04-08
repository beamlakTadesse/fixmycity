// import PageVisitsCard from 'components/PageVisitsCard';
// import StatusCard from 'components/StatusCard';
// import TableCard from 'components/TableCard';



import StatusCard from 'components/StatusCard';
// import ChartLine from 'components/ChartLine';
import ChartBar from 'components/admin/ChartBar';
// import PageVisitsCard from 'components/PageVisitsCard';
// import TrafficCard from 'components/TrafficCard';
import SectorManage from 'components/SectorManage';
import React, { useEffect, useState} from 'react';

export default function Dashboard() {


  
    const [data ,setData] = useState({});

    useEffect(() => {
        const url = `http://localhost:8000/v1/admins/user_count/`;
    
        const fetchData = async () => {
          try {
            const response = await fetch(url);
            const json = await response.json();
            setData(json);
            console.log(json.banned);
          } catch (error) {
            console.log("error", error);
          }
        };
    
        fetchData();
    }, []);

   
  
    return (
        <>
            <div className="bg-light-blue-500 px-3 md:px-8 h-40" />

            <div className="px-3 md:px-8 -mt-24">
                <div className="container mx-auto max-w-full">
                    

                <div className="px-3 md:px-8">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mb-4">
                       

            {data &&
                //   <div>


                Object.keys(data).map((oneKey, i) => {
                    return (
                        <StatusCard
                                color="blue"
                                icon="group"
                                title = {data[oneKey][1]}
                                amount={data[oneKey][0]}
                                percentage="1.10"
                                percentageIcon="arrow_downward"
                                percentageColor="orange"
                                date="Since yesterday"
                            />

                    )
                })

            }

                        {/* {list} */}
                  
                    </div>
                </div>
            </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 px-4 mb-14">
                            {/* <ChartLine /> */}
                            <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14">
                            <ChartBar />
                        </div>
                        <div className="xl:col-start-4 xl:col-end-6 px-4 mb-14">
                            <SectorManage />
                        </div>
                            {/* <ChartBar /> */}
                      
                    </div>
                </div>
            </div>

        </>
    );
}

