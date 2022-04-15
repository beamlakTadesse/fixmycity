import React, { useEffect , useState} from 'react';
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Image from '@material-tailwind/react/Image';

import { useDispatch, useSelector } from 'react-redux';
import { reportActions } from '../../actions';
import { Button } from '@material-tailwind/react';
import { NavLink } from 'react-router-dom';
import Table from 'components/sector/Table2';
// import ReportTableChart from 'components/sector/ReportTable';
import ReportShow from './ReportShow';


export default function ReportTable() {

    const report = useSelector(state => state.report);

    
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
                    <ReportShow />
                   
                </div>
            </CardBody>
        </Card>
    );
}
