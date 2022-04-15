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

    // const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();


const [mydata ,setData]= useState([]);

// useEffect(() => {
//   // mounted.current = true;
//   const url = `http://localhost:8000/v1/report/`;


//   const fetchData = async () => {
//     try {
//       const response = await fetch(url);
     
//       const json = await response.json();
//       const lela = []
//         setData(json);
       
//       console.log("Sectors: ", json[0].id);
//     } catch (error) {
//       console.log("error", error);
//     }
//   };

//     fetchData();

// }, [mydata]);

    // useEffect(() => {

    //     dispatch(reportActions.getAll());

    //     function toJSONLocal(date) {
    //         var local = new Date(date);
    //         local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    //         return local.toJSON().slice(0, 10);
    //     }
    // }, []);

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
                    <ReportShow />
                   
                </div>
            </CardBody>
        </Card>
    );
}
