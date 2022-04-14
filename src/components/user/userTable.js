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
    // const users = useSelector(state => state.users);

    // const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    const [users , setUsers] = useState({});
    useEffect(() => {
        // mounted.current = true;
        const url = `http://localhost:8000/v1/admins/custom_users/`;


        const fetchData = async () => {
          try {
            const response = await fetch(url);
           
            const json = await response.json();
            
            setUsers(json.users);
           
            // console.log("Sectors: ", json.sectors[0].district_name);
          } catch (error) {
            console.log("error", error);
          }
        };

          fetchData();
      
    }, [users]);
    const [msg, setMsg] = useState('');
    async function handleDeleteUser(id) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }
        };
        console.log(id)
        const response = await fetch(`http://localhost:8000/v1/admins/custom_users/${id}`,requestOptions);
        const json = await response.json();
        setMsg(json.message);
        // dispatch(userActions.delete(id));
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
                    {users &&

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
                                 Object.keys(users).map((oneKey, i) => {
                                    return (
                                    <tbody>

                                        <tr>
                                            <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                {users[oneKey].first_name}
                                            </th>
                                            <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                {users[oneKey].last_name}
                                            </th>
                                            <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                <i className="fas fa-circle fa-sm text-orange-500 mr-2"></i>{' '}
                                                {users[oneKey].phone_number}
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
                                                        Are you sure you want to ban {users[oneKey].first_name}  {users[oneKey].last_name}
                                                    </p>
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button onClick={() => handleDeleteUser(users[oneKey].id)
                                                    }
                                                    >Confirm</Button>
                                                    <Button onClick={() => handleDeleteCancel()}> Cancel</Button>
                                                </ModalFooter>

                                            </Modal>
                                        </tr>
                                    </tbody>
                                    )}
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
