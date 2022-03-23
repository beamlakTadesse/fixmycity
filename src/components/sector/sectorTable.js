import React, { useEffect } from 'react';
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Image from '@material-tailwind/react/Image';
import Progress from '@material-tailwind/react/Progress';
import Team1 from 'assets/img/team-1-800x800.jpg';
import Team2 from 'assets/img/team-2-800x800.jpg';
import Team3 from 'assets/img/team-3-800x800.jpg';
import Team4 from 'assets/img/team-4-470x470.png';
import { useDispatch, useSelector } from 'react-redux';
import { sectorActions } from '../../actions';


export default function SectorTable() {
    const sectors = useSelector(state => state.sectors);
    // const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(sectorActions.getAll());
    }, []);

    function handleDeleteUser(id) {
        console.log(id)
        dispatch(sectorActions.delete(id));
    }
    return (
        <Card>
            <CardHeader color="purple" contentPosition="left">
                <h2 className="text-white text-2xl">Sectors</h2>
            </CardHeader>
            <CardBody>
                <div className="overflow-x-auto">
                    {sectors.items &&

                        <table className="items-center w-full bg-transparent border-collapse">
                            <thead>
                                <tr>
                                    <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                        District Name
                                    </th>
                                    <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                        Email
                                    </th>
                                    <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                        Phone
                                    </th>

                                </tr>
                            </thead>
                            {
                                sectors.items.map((sector, index) =>
                                    <tbody>

                                        <tr>
                                            <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                {sector.districtName}
                                            </th>
                                            <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                {sector.email}
                                            </th>
                                            <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                <i className="fas fa-circle fa-sm text-orange-500 mr-2"></i>{' '}
                                                {sector.phone}
                                            </th>


                                        </tr>



                                    </tbody>
                                )}
                        </table>}
                </div>
            </CardBody>
        </Card>
    );
}
