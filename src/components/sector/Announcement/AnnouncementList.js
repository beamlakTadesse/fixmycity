
import React, { useEffect, useState } from 'react';
import { Button } from '@material-tailwind/react';
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
// import Button from '@material-tailwind/react/Button';
import AnnouncementCard from './mycard';
import { useDispatch, useSelector } from 'react-redux';
import { announcementActions } from 'actions';
import Loader from '../shared/loader';
export default function AnnouncementList({announcements}) {



    const [isLoading, setIsLoading]= useState(false);
    const [isError, setError] = useState(false);
    const dispatch = useDispatch();
    // const announcements = useSelector(state => state.announcement);

   
    // useEffect(() => {
    //     dispatch(announcementActions.getAll());
    // }, [])
    // console.log("announcement2", announcements['items']);

    return (
        (isLoading)? <div class="flex justify-center items-center h-screen">
        <Loader/>   
        
    </div>:<>


            {announcements && 
                //   <div>


                Object.keys(announcements).map((oneKey, i) => {
                    return (
                        <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14 mr-8">
                            {/* <AnnouncementCard /> */}
                            {
                                announcements[oneKey]  &&
                            
                            <AnnouncementCard image={announcements[oneKey].image} title={announcements[oneKey].title} description={announcements[oneKey].description} date={announcements[oneKey].createdAt} id={announcements[oneKey].id} sector="Arada Subcity" address="Arada"/>
                            // {announcements.items[oneKey].sector.district_name} address={announcements.items[oneKey].sector.address}/>
                            }
                        </div>

                    )
                })

            }

        </>

    )
}