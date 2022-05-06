import React from 'react';
import { Button } from '@material-tailwind/react';
import AnnouncementList from 'components/sector/Announcement/AnnouncementList';
import AddAnnouncement from 'components/sector/Announcement/AddAnnouncement';


export default function Announcement() {

      const [showModal, setShowModal] = React.useState(false);

    return (
        <>
            <div className="bg-light-blue-500 px-3 md:px-8 h-10" />
            <div className="container mt-10 max-w-full ">

            <div className="grid grid-cols-1 xl:grid-cols-1">
                <div className="xl:col-start-2 xl:col-end-2 px-3 mb-14 mr-8">
                <Button className="flex justify-center" onClick={(e) => setShowModal(true)}>Post Announcement</Button>

                </div> 
                <AddAnnouncement isActive={showModal} setIsActive={setShowModal}/>
                    <AnnouncementList />
                </div> 
            </div>

        </>
    );
}
