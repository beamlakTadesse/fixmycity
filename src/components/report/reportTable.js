import React, { useEffect } from 'react';
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Image from '@material-tailwind/react/Image';

import { useDispatch, useSelector } from 'react-redux';
import { reportActions } from '../../actions';
import { Button } from '@material-tailwind/react';
import { NavLink } from 'react-router-dom';
import Table from 'components/sector/Table2';
import ReportTableChart from 'components/sector/ReportTable';


export default function ReportTable() {

    const report = useSelector(state => state.report);

    // const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(reportActions.getAll());

        function toJSONLocal(date) {
            var local = new Date(date);
            local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
            return local.toJSON().slice(0, 10);
        }
    }, []);

    function toDate(date) {
        return new Date(date).toDateString();
    }
    return (
        <Card>
            <CardHeader color="purple" contentPosition="left">
                <div className="flex flex-row items-end">

                    <div className='items-end'>
                        <NavLink to="/maps" exact> <Button >View in Map</Button></NavLink>
                    </div>

                </div>
            </CardHeader>
            <CardBody>
                <div className="overflow-x-auto">
                    <ReportTableChart />
                    {/* {report.items &&
                        // <div>
                        //     {
                        //         report.items.map((rep, index) =>
                        //             <p key={index}>{rep.id}</p>)}
                        // </div>}

                        <table className="items-center w-full bg-transparent border-collapse">
                            <thead>
                                <tr>
                                    <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                        Image
                                    </th>
                                    <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                        Description
                                    </th>
                                    <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                        Tags
                                    </th>
                                    <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                        No of Likes
                                    </th>
                                    <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                        Status
                                    </th>
                                    <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                        Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    report.items.map((rep, index) =>

                                        <tr key={index}>
                                            <th key={rep.description} className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                <Image
                                                    src={rep.image}
                                                    rounded
                                                    alt="..."
                                                />
                                            </th>
                                            <th key={rep.like_count} className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                {rep.description}
                                            </th>
                                            <th key={rep.id} className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                {rep.id}
                                            </th>
                                            <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                {rep.like_count}
                                            </th>
                                            <th key={rep.postedAt} className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                { }
                                            </th>

                                            <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                <i className="fas fa-circle fa-sm text-orange-500 mr-2"></i>{' '}
                                                {toDate(rep.postedAt)}
                                            </th>


                                        </tr>

                                    )}
                            </tbody>
                        </table>
                    } */}
                </div>
            </CardBody>
        </Card>
    );
}
