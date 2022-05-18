import Title from '../landing/Title';
import TeamCard from '../landing/TeamCard';
import Image1 from '../../assets/img/tele.png';
import Image2 from '../../assets/img/elpha.png';
import Image3 from '../../assets/img/aawsa.png';
import Image4 from '../../assets/img/aara.jpg';
import { Button } from '@material-tailwind/react';
import React, { useState, useEffect } from "react";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import AddSectorForm from './addSectorForm';
import SectorTable from './sectorTable'
import Card from '@material-tailwind/react/Card';
import CardRow from '@material-tailwind/react/CardRow';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardStatus from '@material-tailwind/react/CardStatus';
import CardStatusFooter from '@material-tailwind/react/CardStatusFooter';
import Icon from '@material-tailwind/react/Icon';


export default function SectorsSection() {
    const [showModal, setShowModal] = useState(false);
    const [sectors , setSectors] = useState({});
    useEffect(() => {
        // mounted.current = true;
        const url = `http://localhost:8000/v1/admins/main_sectors/`;


        const fetchData = async () => {
          try {
            const response = await fetch(url);
           
            const json = await response.json();
            
            setSectors(json.sectors);
           
            // console.log("Sectors: ", json.sectors[0].district_name);
          } catch (error) {
            console.log("error", error);
          }
        };

          fetchData();
      
    }, []);
    return (
        <section className="pt-20 pb-48">
            <div className="container max-w-md mx-auto px-8">
                <div className="container">
                    <div className='grid grid-cols-4 gap-4  content-end'>
                        <div></div>
                        <div></div>
                        <div></div>
                        <Button className="flex justify-center bg-purple" color = 'brown' onClick={(e) => setShowModal(true)}>Create Sector</Button></div>

                </div>

                <Modal size="lg" active={showModal} toggler={() => setShowModal(false)}>

                    <ModalBody>

                        <AddSectorForm />
                    </ModalBody>
                   
                </Modal>
                {/* <Title heading="Here are our Sectors">
                    In the City of Adiss Ababa there are planty of service providers from which Four of them are registerd in this system.
                </Title> */}

                {/* <div className="flex "> */}
                <div className="container mx-auto max-w-full">

                <div className="px-4 mb-10 ">
                        <div className="container mx-auto max-w-full">
                        <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 mb-4">
                       
                {
                                        sectors && 
                                        Object.keys(sectors).map((oneKey, i) => {
                                            return (
                   
                        <Card className="xl:col-start-2 xl:col-end-1 px-4 mb-14">
                            <CardRow >
                                <CardHeader iconOnly className="mb-0">
                                    <img src={sectors[oneKey].sector_logo}
                                    />
                                </CardHeader>

                                <CardStatus amount={sectors[oneKey].district_name} title="Ethio Telecom" />
                            </CardRow>

                            <CardStatusFooter
                                // amount="Telecom Service Provider"
                                // date="date"
                            >
                                {/* <Icon  name={percentageIcon} /> */}
                            </CardStatusFooter>
                        </Card>
                  

                            // sectorsCount[oneKey][0]           
                            )
                        }) 
                    }
                    
                    </div>
                    </div>
                    </div>
                </div>
                <SectorTable />
            </div>
        </section>
    );
}