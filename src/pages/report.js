import StatusCard from 'components/StatusCard';
import MapExample from 'components/MapExample';
import UserTable from 'components/user/userTable';
import TabsRender from 'components/tabs'
export default function Report() {
    return (
        <>
            <TabsRender />
            <MapExample />
            {/* <div className="bg-light-blue-500 pt-14 pb-28 px-3 md:px-8 h-auto">
                <div className="px-3 md:px-8 h-auto pt-14 -mt-28 mb-16">
                    <div className="container mx-auto max-w-full">
                        <div className="grid grid-cols-1 px-4 h-[600px]">
                            <MapExample />
                        </div>
                    </div>
                </div>
            </div>
            <UserTable /> */}
        </>
    );
}
