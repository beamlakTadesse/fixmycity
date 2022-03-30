import Title from '../landing/Title';
import TeamCard from '../landing/TeamCard';
import Image1 from '../../assets/img/tele.png';
import Image2 from '../../assets/img/elpha.png';
import Image3 from '../../assets/img/aawsa.png';
import Image4 from '../../assets/img/aara.jpg';
import { Button } from '@material-tailwind/react';
import React, { useState } from "react";
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
    return (
        <section className="pt-20 pb-48">
            <div className="container max-w-md mx-auto px-8">
                <div className="container">
                    <div className='grid grid-cols-4 gap-4  content-end'>
                        <div></div>
                        <div></div>
                        <div></div>
                        <Button className="flex justify-center" onClick={(e) => setShowModal(true)}>Create Sector</Button></div>

                </div>

                <Modal size="lg" active={showModal} toggler={() => setShowModal(false)}>

                    <ModalBody>

                        <AddSectorForm />
                    </ModalBody>
                    {/* <ModalFooter>
                        <Button
                            color="red"
                            buttonType="link"
                            onClick={(e) => setShowModal(false)}
                            ripple="dark"
                        >
                            Close
                        </Button>

                        <Button
                            color="green"
                            onClick={(e) => setShowModal(false)}
                            ripple="light"
                        >
                            ADD
                        </Button>
                    </ModalFooter> */}
                </Modal>
                {/* <Title heading="Here are our Sectors">
                    In the City of Adiss Ababa there are planty of service providers from which Four of them are registerd in this system.
                </Title> */}

                <div className="flex flex-wrap">

                    <div className="px-4 mb-10">
                        <Card>
                            <CardRow>
                                <CardHeader iconOnly className="mb-0">
                                    <img src={Image1}
                                    />
                                </CardHeader>

                                <CardStatus title='Tele' amount="Ethio Telecom" />
                            </CardRow>

                            <CardStatusFooter
                                amount="Telecom Service Provider"
                                date="date"
                            >
                                {/* <Icon  name={percentageIcon} /> */}
                            </CardStatusFooter>
                        </Card>
                    </div>
                    <div className="px-4 mb-10">
                        <Card>
                            <CardRow>
                                <CardHeader iconOnly className="mb-0">
                                    <img src={Image2}
                                    />
                                </CardHeader>

                                <CardStatus title='ELPHA' amount="Ethiopian Electric Utility" />
                            </CardRow>

                            <CardStatusFooter
                                amount="Electric Power Provider"
                                date="date"
                            >
                                {/* <Icon  name={percentageIcon} /> */}
                            </CardStatusFooter>
                        </Card>
                    </div>
                    <div className="px-4 mb-10">
                        <Card>
                            <CardRow>
                                <CardHeader iconOnly className="mb-0">
                                    <img src={Image3}
                                    />
                                </CardHeader>

                                <CardStatus title='AAWSA' amount="Addis Ababa Water and Sewage Authority" />
                            </CardRow>

                            <CardStatusFooter
                                amount="Water Service Provider "
                                date="date"
                            >
                                {/* <Icon  name={percentageIcon} /> */}
                            </CardStatusFooter>
                        </Card>
                    </div>
                    <div className="px-4 mb-10">
                        <Card>
                            <CardRow>
                                <CardHeader iconOnly className="mb-0">
                                    <img src={Image4}
                                    />
                                </CardHeader>

                                <CardStatus title='AARA' amount="Addis Ababa City Roads Authority " />
                            </CardRow>

                            <CardStatusFooter
                                amount="Providing quality and standardized roads and transport infrastructure"
                                date="date"
                            >
                                {/* <Icon  name={percentageIcon} /> */}
                            </CardStatusFooter>
                        </Card>
                    </div>
                    {/* <TeamCard
                        img={Image2}
                        name="Ethiopian Electric Utility"
                        position="Electric Power Provider"
                    />
                    <TeamCard
                        img={Image3}
                        name="Addis Ababa Water and Sewage Authority "
                        position="Water Service Provider "
                    />
                    <TeamCard
                        img={Image4}
                        name="Addis Ababa City Roads Authority "
                        position="Providing quality and standardized roads and transport infrastructure"
                    /> */}
                </div>
                <SectorTable />
            </div>
        </section>
    );
}