
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

  
    const dispatch = useDispatch();
    // const announcements = useSelector(state => state.announcement);

    const [announcements, setSectors] = useState({});
    useEffect(() => {
        // mounted.current = true;
        const url = `http://localhost:8000/v1/announcment/`;


        const fetchData = async () => {
          try {
            const response = await fetch(url);
           
            const json = await response.json();
            
            setSectors(json.results);
           
            console.log("Sectors: ", json.results);
          } catch (error) {
            console.log("error", error);
          }
        };

          fetchData();
      
    }, []);

    // useEffect(() => {
    //     dispatch(announcementActions.getAll());
    // }, [])
    // console.log("announcement2", announcements['items']);

    return (
        <>


            {announcements && 
                //   <div>


                Object.keys(announcements).map((oneKey, i) => {
                    return (
                        <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14 mr-8">
                            {/* <AnnouncementCard /> */}
                            {
                                announcements[oneKey]  &&
                            
                            <AnnouncementCard image={announcements[oneKey].image} title={announcements[oneKey].title} description={announcements[oneKey].description} date={announcements[oneKey].date} sector="Arada Subcity" address="Arada"/>
                            // {announcements.items[oneKey].sector.district_name} address={announcements.items[oneKey].sector.address}/>
                            }
                        </div>

                    )
                })

            }



            {/* {list}    */}
        </>

    )
}