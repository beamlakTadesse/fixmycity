import React, { useEffect, useState } from 'react';
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Image from '@material-tailwind/react/Image';
import Progress from '@material-tailwind/react/Progress';
import Team1 from 'assets/img/team-1-800x800.jpg';
import Team2 from 'assets/img/team-2-800x800.jpg';
import Team3 from 'assets/img/team-3-800x800.jpg';
import Team4 from 'assets/img/team-4-470x470.png';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../actions';
import { Button, Heading5, ModalFooter } from '@material-tailwind/react';
import DeleteDialog from '../confirmDeleteModal'
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalTitle from "@material-tailwind/react/ModalHeader"
import Modal from "@material-tailwind/react/Modal";
import RegisterPage from './register'

export default function UserTable() {
    const users = useSelector(state => state.users);

    // const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);

    function handleDeleteUser(id) {
        console.log(id)

        dispatch(userActions.delete(id));
        setSubmitted(false)
    }
    function handleDeleteCancel() {

        setSubmitted(false)

    }
    const [submitted, setSubmitted] = useState(false);
    const [register, setRegister] = useState(false);
    return (
        <Card>
            <CardHeader color="purple" contentPosition="left">
                <h2 className="text-white text-2xl">Users</h2>
                {/* <Button onClick={() => setRegister(true)}>Register</Button> */}
            </CardHeader>
            <CardBody>
                <div className="overflow-x-auto">
                    {users.items &&

                        <table className="items-center w-full bg-transparent border-collapse">
                            <thead>
                                <tr>
                                    <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                        First  Name
                                    </th>
                                    <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                        Last Name
                                    </th>
                                    <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                        Phone
                                    </th>

                                </tr>
                            </thead>
                            {
                                users.items.map((user, index) =>
                                    <tbody>

                                        <tr>
                                            <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                {user.firstName}
                                            </th>
                                            <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                {user.lastName}
                                            </th>
                                            <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                <i className="fas fa-circle fa-sm text-orange-500 mr-2"></i>{' '}
                                                {user.phone}
                                            </th>

                                            <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                <Button onClick={() =>
                                                    setSubmitted(!submitted)}
                                                > Ban </Button>
                                            </th>
                                            <Modal size="lg" active={submitted} toggler={() => setSubmitted(false)}>
                                                <ModalTitle>
                                                    <Heading5>
                                                        Confirm Delete
                                                    </Heading5>
                                                </ModalTitle>
                                                <ModalBody>
                                                    <p>
                                                        Are you sure you want to ban {user.firstName}  {user.lastName}
                                                    </p>
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button onClick={() => handleDeleteUser(user.id)
                                                    }
                                                    >Confirm</Button>
                                                    <Button onClick={() => handleDeleteCancel()}> Cancel</Button>
                                                </ModalFooter>

                                            </Modal>
                                        </tr>
                                    </tbody>

                                )}
                        </table>}

                </div>
                <Modal size="lg" active={register} toggler={() => setRegister(false)}>
                    <ModalBody>
                        <RegisterPage></RegisterPage>
                    </ModalBody>
                </Modal>
            </CardBody>
        </Card >
    );
}
