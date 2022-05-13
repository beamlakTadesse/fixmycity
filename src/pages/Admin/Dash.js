
import StatusCard from 'components/StatusCard';
import ChartBar from 'components/admin/ChartBar';
import SectorManage from 'components/admin/SectorManage';
import React, { useEffect, useState, useRef} from 'react';
import Loader from 'components/sector/shared/loader';
import ErrorPage2 from 'components/sector/shared/errorPage2';

export default function Dashboard() {


    const mounted = useRef(false);

    const [data ,setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [sectors, setSectors] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [isEmpty, setIsEmpty] = useState(true);
    const [isError , setError] = useState(false);
    useEffect(() => {
        mounted.current = true;

        const url = `http://localhost:8000/v1/admins/user_count/`;
        const url2 = `http://localhost:8000/v1/admins/sector_count/`;
        const url3 = `http://localhost:8000/v1/admins/active_sectors/`;


        const fetchData = async () => {
            setIsLoading(true)
          try {
            const response = await fetch(url);
            const response2 = await fetch(url2);
            const response3 = await fetch(url3);

            const json = await response.json();
            const json2 = await response2.json();
            const json3 = await response3.json();

            setData(json);
            setData2(json2);
            setSectors(json3);

            console.log(json.banned);
            console.log(json2.water);
            console.log(json3[1])

          } catch (error) {
            console.log("error", error);
            setError(true);
          }
          setTimeout(() => {
            setIsLoading(false);            
        }, 1500);
        };

          fetchData();
      
    }, []);

    var list2 = <ChartBar medata = {data2}/> 
  
    return (
        (isLoading)?  <div class="flex justify-center items-center h-screen">
                    <Loader/>   
                </div>
                :
        (isError)?<ErrorPage2/>:
        (!data.length>0 && !data2.length>0 && !sectors.length >0)? <div class="flex justify-center items-center h-screen">
        <h2>No Record Found!!!!!!</h2>   
    </div>:
        <>
            <div className="bg-light-blue-500 px-3 md:px-8 h-40" />

            <div className="px-3 md:px-8 -mt-24">
                <div className="container mx-auto max-w-full">
                    

                <div className="px-3 md:px-8">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mb-4">
                       

            {data &&
                Object.keys(data).map((oneKey, i) => {
                    return (
                        <StatusCard
                                color="blue"
                                icon="group"
                                title = {data[oneKey][1]}
                                amount={data[oneKey][0]}
                                date="Since yesterday"
                            />
                    )
                }) 
                

            }                  
                    </div>
                </div>
            
            
            </div>

            
            
                    <div className="grid grid-cols-1 xl:grid-cols-2 px-4 mb-14">
                        {data2.length>0 &&
                            <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14">
                              <ChartBar medata = {data2}/>
                           
                        </div>
}
                        {(data2.length>0 && sectors.length>0)?  
                        <div className="xl:col-start-4 xl:col-end-6 px-4 mb-14">
                            <SectorManage sectorsCount = {sectors}/>
                        </div>: <>
                        {(sectors.length>0) && 
                            <div className=" px-4 mb-14">
                                <SectorManage sectorsCount = {sectors}/>
                             </div>
                            }
                        </>
                             
                        }
                     
                    </div>
                    
                </div>
            </div>

        </>
    );
}

