import StatusCard from 'components/StatusCard';
import MapExample from 'components/MapExample';

export default function Dashboard() {
    return (
        <>
            <div className="bg-light-blue-500 pt-14 pb-28 px-3 md:px-8 h-auto">
              
            </div>

            <div className="px-3 md:px-8 h-auto -mt-28 mb-16">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 px-4 h-[600px]">
                        <MapExample />
                    </div>
                </div>
            </div>
        </>
    );
}
