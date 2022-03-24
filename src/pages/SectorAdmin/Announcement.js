import StatusCard from 'components/StatusCard';
import ChartLine from 'components/sector/ChartLine';
// import ChartBar from 'components/ChartBar';
import PageVisitsCard from 'components/sector/PageVisitsCard';
// import TrafficCard from 'components/TrafficCard';
import CardTable from 'components/sector/Announcement/TableCard';
import Button from 'components/LargeButton';
import LargeButton from 'components/LargeButton';
import Announcement_Card from 'components/sector/Announcement/mycard';

export default function Announcement() {
    return (
        <>
            <div className="bg-light-blue-500 px-3 md:px-8 h-10" />

            {/* <div className="px-3 md:px-8 -mt-24"> */}
            {/* <div className="px-3 md:px-8 -mt-24"> */}

{/* 

            <div className="px-3 md:px-8">
                <div className="container mx-auto max-w-full">
                    
                </div>
            </div> */}


                <div className="container mt-10 max-w-full ">


                    <div className="grid grid-cols-1 xl:grid-cols-1">
                    <div className="xl:col-start-2 xl:col-end-2 px-3 mb-14 mr-8">

                             <LargeButton />
                        </div> 
                        {/* <div className="xl:col-start-2 xl:col-end-2 px-3 mb-14 mr-8"> */}
                        <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14 mr-8">

                            {/* <PageVisitsCard /> */}
                            <Announcement_Card />
                        </div>
                    </div>
                </div>
            {/* </div> */}
      <div className="px-3 md:px-8 h-auto">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 xl:grid-cols-1">
                        
                            <CardTable/>
                        
                    </div>
                </div>
            </div>
        </>
    );
}
