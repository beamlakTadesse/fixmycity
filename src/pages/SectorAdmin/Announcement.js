import React from 'react';
import { Button } from '@material-tailwind/react';

import StatusCard from 'components/StatusCard';
import ChartLine from 'components/sector/ChartLine';
// import ChartBar from 'components/ChartBar';
import PageVisitsCard from 'components/sector/PageVisitsCard';
// import TrafficCard from 'components/TrafficCard';
import CardTable from 'components/sector/Announcement/TableCard';
// import Button from 'components/LargeButton';
import LargeButton from 'components/sector/Announcement/LargeButton';
import AnnouncementCard from 'components/sector/Announcement/mycard';
import AnnouncementList from 'components/sector/Announcement/AnnouncementList';
import AddAnnouncement from 'components/sector/Announcement/AddAnnouncement';


import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import AddSectorForm from 'components/sector/addSectorForm';
export default function Announcement() {



    const products = ['Custom users', 'Banned Users', 'Sectors'];

    const list = products.map(product => <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14 mr-8">
       <AnnouncementCard />
    
</div>)
      const [showModal, setShowModal] = React.useState(false);
     
    return (
        <>

            <div className="bg-light-blue-500 px-3 md:px-8 h-10" />
            <div className="container mt-10 max-w-full ">

            <div className="grid grid-cols-1 xl:grid-cols-1">
                <div className="xl:col-start-2 xl:col-end-2 px-3 mb-14 mr-8">
                <Button className="flex justify-center" onClick={(e) => setShowModal(true)}>Post Announcement</Button>


                
                </div> 
                    {/* {list} */}
                    <Modal size="lg-full" active={showModal} toggler={() => setShowModal(false)}>

                <ModalBody>

                <AddAnnouncement />
            </ModalBody>
            </Modal>
                    {/* <AddSectorForm showModal={showModal} setShowModal={setShowModal}/> */}
                    <AnnouncementList />

                </div> 
            </div>


        </>
    );
}
