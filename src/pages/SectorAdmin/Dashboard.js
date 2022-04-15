import React, {useState, useEffect} from 'react';
import StatusCard from 'components/StatusCard';
import ChartLine from 'components/sector/ChartLine';
import ReportChart from 'components/sector/ReportChart';
// import ChartBar from 'components/ChartBar';

import PageVisitsCard from 'components/sector/PageVisitsCard';
// import TrafficCard from 'components/TrafficCard';
import CardTable from 'components/sector/TableCard';

export default function Dashboard() {
    const [sectors , setSectors] = useState({});
    const [sectorsInfo , setSectorsInfo] = useState({});

    useEffect(() => {
        // mounted.current = true;
        var id = 4;
        // const url = `http://localhost:8000/v1/report_status/${id}/`;
        const url = `http://localhost:8000/v1/report_status/4/`;

        const fetchData = async () => {
          try {
            const response = await fetch(url);
           
            const json = await response.json();
            
            setSectors(json.count);
        //    
            setSectorsInfo(json.sectors);
            console.log("Sectors: ", json.count);
          } catch (error) {
            console.log("error", error);
          }
        };

          fetchData();
      
    }, []);
    const iconName = ["trending_up","groups","poll","groups"]
    const iconColor = ["pink","blue","green","red"]
    return (
        <>
            <div className="bg-light-blue-500 px-3 md:px-8 h-40" />

            <div className="px-3 md:px-8 -mt-24">
            
            <div className="px-3 md:px-8">
                <div className="container mx-auto max-w-full">
                  {sectors && 
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 mb-4">
                    {Object.keys(sectors).map((oneKey, i) => {
                                    return (
                        <StatusCard  
                            color={iconColor[i]}
                            icon={iconName[i]}
                            title={sectors[oneKey][1]}
                            amount={sectors[oneKey][0]}
                            percentage="3.48"
                            percentageIcon="arrow_upward"
                            percentageColor="green"
                            date="Since last month"
                        />
                                    )})}
                       
                    </div>
}
                </div>
            </div>


                <div className="container mx-auto max-w-full">


                    <div className="grid grid-cols-1 xl:grid-cols-5">
                        <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14">
                            {/* <ChartLine /> */}
                            <ReportChart />
                        </div>
                        {/* <div className="xl:col-start-4 xl:col-end-6 px-4 mb-14">
                            <PageVisitsCard />
                        </div> */}
                    </div>
                </div>
            </div>

            {sectorsInfo &&
      <div className="px-3 md:px-8 h-auto">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 xl:grid-cols-1">
                        
                            <CardTable sectors= {sectorsInfo}/>
                        
                    </div>
                </div>
            </div>
}
        </>
    );
}
