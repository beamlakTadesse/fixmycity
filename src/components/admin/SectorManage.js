import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Button from '@material-tailwind/react/Button';
import Progress from '@material-tailwind/react/Progress';

export default function SectorManage({ sectorsCount}) {
    return (
        <Card>
            <CardHeader color="brown" contentPosition="none">
                <div className="w-full flex items-center justify-between">
                    <h2 className="text-white text-2xl">Active Sectors Admin</h2>
                    <Button
                        color="transparent"
                        buttonType="link"
                        size="lg"
                        style={{ padding: 0 }}
                    >
                        See More
                    </Button>
                </div>
            </CardHeader>
            <CardBody>
                <div className="overflow-x-auto">
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead className="thead-light">
                            <tr>
                                <th className="px-2 text-brown align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                    Sector
                                </th>
                                <th className="px-2 text align-middle-brown border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                    Visitors
                                </th>
                                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left w-56"></th>
                            </tr>
                        </thead>
                        <tbody>
                               {
                                        sectorsCount && 
                                        Object.keys(sectorsCount).map((oneKey, i) => {
                                            return (
                                                <tr>
                                                    
                                                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                {sectorsCount[oneKey][2]}
                                                </th>
                                                <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    {sectorsCount[oneKey][0]}
                                                </td>
                                                <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    <Progress color="blue" value= {sectorsCount[oneKey][1]}/>
                                                </td>
                                            </tr>
                                                // sectorsCount[oneKey][0]           
                                            )
                                        }) 
                                    }
                               
                        </tbody>
                    </table>
                </div>
            </CardBody>
        </Card>
    );
}
