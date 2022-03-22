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
export default function SectorsSection() {
    const [showModal, setShowModal] = React.useState(false);
    return (
        <section className="pt-20 pb-48">
            <div className="container max-w-md mx-auto px-8">
                <div className="container">
                    <Button className="flex justify-end" onClick={(e) => setShowModal(true)}>Create Sector</Button></div>

                <Modal size="lg" active={showModal} toggler={() => setShowModal(false)}>
                    <ModalHeader toggler={() => setShowModal(false)}>
                        Create Sector
                    </ModalHeader>
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
                <Title heading="Here are our Sectors">
                    In the City of Adiss Ababa there are planty of service providers from which Four of them are registerd in this system.
                </Title>

                <div className="flex flex-wrap">
                    <TeamCard
                        img={Image1}
                        name="Ethio Telecom"
                        position="Telecom Service Provider"
                    />
                    <TeamCard
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
                    />
                </div>
            </div>
        </section>
    );
}