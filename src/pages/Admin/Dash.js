// import PageVisitsCard from 'components/PageVisitsCard';
// import StatusCard from 'components/StatusCard';
// import TableCard from 'components/TableCard';



import StatusCard from 'components/StatusCard';
// import ChartLine from 'components/ChartLine';
import ChartBar from 'components/ChartBar';
// import PageVisitsCard from 'components/PageVisitsCard';
// import TrafficCard from 'components/TrafficCard';
import SectorManage from 'components/SectorManage';

export default function Dashboard() {

    const products = ['Custom users', 'Banned Users', 'Sectors'];

    const list = products.map(product => <StatusCard
        color="blue"
        icon="group"
        title = {product}
        amount="924"
        percentage="1.10"
        percentageIcon="arrow_downward"
        percentageColor="orange"
        date="Since yesterday"
    />)
  
  
    return (
        <>
            <div className="bg-light-blue-500 px-3 md:px-8 h-40" />

            <div className="px-3 md:px-8 -mt-24">
                <div className="container mx-auto max-w-full">
                    

                <div className="px-3 md:px-8">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mb-4">
                        {list}
                  
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

