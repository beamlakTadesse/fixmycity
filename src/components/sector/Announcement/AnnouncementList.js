
import React, { useEffect, useState } from 'react';
import { Button } from '@material-tailwind/react';
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
// import Button from '@material-tailwind/react/Button';
import AnnouncementCard from './mycard';
import { useDispatch, useSelector } from 'react-redux';
import { announcementActions } from 'actions';
export default function AnnouncementList() {


    const products = ['Custom users', 'Banned Users', 'Sectors'];

    const list = products.map(product => <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14 mr-8">
        <AnnouncementCard />

    </div>)
    const dispatch = useDispatch();
    const announcements = useSelector(state => state.announcement);

    // const [announcement , setAnnouncement] = useState({});
    // const an = useSelector(state => state.announcement.items[0]);

    // const [an1, setAn] = useState(null);
    useEffect(() => {
        dispatch(announcementActions.getAll());
        // setAnnouncement(announcements.items);
        // console.log("announcements", announcement);

    }, [])
    console.log("announcement2", announcements['items']);

    return (
        <>


            {announcements.items &&
                //   <div>


                Object.keys(announcements.items).map((oneKey, i) => {
                    return (
                        <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14 mr-8">
                            {/* <AnnouncementCard /> */}
                            <AnnouncementCard image={announcements.items[oneKey].image} title={announcements.items[oneKey].title} description={announcements.items[oneKey].description} />

                        </div>

                    )
                })



                //   </div>
            }



            {/* {list}    */}
        </>

    )
}