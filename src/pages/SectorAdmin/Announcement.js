import React, { useEffect, useState } from 'react';
import { Button } from '@material-tailwind/react';
import AnnouncementList from 'components/sector/Announcement/AnnouncementList';
import AddAnnouncement from 'components/sector/Announcement/AddAnnouncement';
import Loader from 'components/sector/shared/loader';
import ErrorPage2 from 'components/sector/shared/errorPage2';
import UnAuthorized from 'components/sector/shared/unauthorized';


export default function Announcement() {

      const [showModal, setShowModal] = React.useState(false);
     
    
      const [isLoading, setIsLoading]= useState(false);
      const [isError, setError] = useState(false);
      // const announcements = useSelector(state => state.announcement);
  
      const [announcements, setSectors] = useState([]);
      
      useEffect(() => {
          // mounted.current = true;
          const url = `http://localhost:8000/v1/announcment/`;
  
  
          const fetchData = async () => {
              setIsLoading(true);
            try {
                
              const response = await fetch(url);
             
              const json = await response.json();
              
              // if(json.status===401){
              setSectors(json.results);
              // }
              console.log("Sectors: ", json.results);
            } catch (error) {
              console.log("error", error);
              setError(true);
                     
              console.log("Here");
              // console.log(state);
              console.log("hi");
            };
            setTimeout(() => {
              setIsLoading(false);            
          }, 1500)
  
          };
  
            fetchData();

        
      }, []);

    return (
        (isLoading)? <div class="flex justify-center items-center h-screen">
        <Loader/>   
        
    </div>:(isError)?<>
             <ErrorPage2/>
    </>
   :<>
    {announcements.length===0?<UnAuthorized /> :
    <>
            <div className="bg-light-blue-500 px-3 md:px-8 h-10" />
            <div className="container mt-10 max-w-full ">

            <div className="grid grid-cols-1 xl:grid-cols-1">
                <div className="xl:col-start-2 xl:col-end-2 px-3 mb-14 mr-8">
                <Button className="flex justify-center" onClick={(e) => setShowModal(true)}>Post Announcement</Button>

                </div> 
                <AddAnnouncement isActive={showModal} setIsActive={setShowModal}/>
                   {announcements.length >0 && <AnnouncementList announcements={announcements}/>}
                </div> 
            </div>
            </>
}
        </>
    );
}
