import React, { useEffect, useState } from "react";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Image from "@material-tailwind/react/Image";
import Progress from "@material-tailwind/react/Progress";
import Team1 from "assets/img/team-1-800x800.jpg";
import Team2 from "assets/img/team-2-800x800.jpg";
import Team3 from "assets/img/team-3-800x800.jpg";
import Team4 from "assets/img/team-4-470x470.png";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../actions";
import { Button, Heading5, ModalFooter } from "@material-tailwind/react";
import DeleteDialog from "../confirmDeleteModal";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalTitle from "@material-tailwind/react/ModalHeader";
import Modal from "@material-tailwind/react/Modal";
import RegisterPage from "./register";
import Loader from "components/sector/shared/loader";
import ErrorPage2 from "components/sector/shared/errorPage2";
import { url } from "helpers/strings";

export default function UserTable() {
  // const users = useSelector(state => state.users);

  // const user = useSelector(state => state.authentication.user);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [isError, setError] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // mounted.current = true;
    const url1 = `${url}/v1/admins/users/`;

    const fetchData = async () => {
      setIsLoading(true);
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      try {
        const response = await fetch(url1, requestOptions);

        const json = await response.json();
        console.log(json.user);
        setUsers(json.user);

        if (users.length > 0) {
          setIsEmpty(false);
        } else {
          setIsEmpty(true);
        }

        // console.log("Sectors: ", json.sectors[0].district_name);
      } catch (error) {
        console.log("error", error);
        setError(true);
      }
    };

    fetchData();
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);
  const activateUser = async (id) => {
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    const response = await fetch(
      // TODO change url
      `${url}/customUser/removeban/${id}`,
      requestOptions
    );
    const json = await response.json();
    console.log(json);
    console.log(response);
  };
  const [msg, setMsg] = useState("");
  async function handleDeleteUser(id) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    console.log(id);
    const response = await fetch(
      `${url}/v1/admins/custom_users/${id}`,
      requestOptions
    );
    const json = await response.json();
    setMsg(json.message);
    // dispatch(userActions.delete(id));
    setSubmitted(false);
  }
  function handleDeleteCancel() {
    setSubmitted(false);
  }
  const [submitted, setSubmitted] = useState(false);
  const [register, setRegister] = useState(false);
  return isLoading ? (
    <div class="flex justify-center items-center h-screen">
      <Loader />
    </div>
  ) : isError ? (
    <ErrorPage2 />
  ) : (
    <Card>
      <CardHeader color="brown" contentPosition="left">
        <h2 className="text-white text-2xl">Users</h2>
        {/* <Button onClick={() => setRegister(true)}>Register</Button> */}
      </CardHeader>
      <CardBody>
        {!users.length > 0 ? (
          <div>
            <div
              data-cy="txt-user-nodata"
              className="flex justify-center items-center mt-10"
            >
              <h3>No Data to Display</h3>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            {users && (
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-2 text-brown align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                      First Name
                    </th>
                    <th className="px-2 text-brown align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                      Last Name
                    </th>
                    <th className="px-2 text-brown align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                      Phone
                    </th>
                    <th className="px-2 text-brown align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                      User State
                    </th>
                  </tr>
                </thead>
                {Object.keys(users).map((oneKey, i) => {
                  return (
                    <tbody data-cy="tbl-user">
                      <tr>
                        {users[oneKey].first_name && users[oneKey].last_name && (
                          <>
                            <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                              {users[oneKey].first_name}
                            </th>
                            <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                              {users[oneKey].last_name}
                            </th>
                            <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                              <i className="fas fa-circle fa-sm text-orange-500 mr-2"></i>{" "}
                              {users[oneKey].phone_number}
                            </th>
                            <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                              <i className="fas fa-circle fa-sm text-orange-500 mr-2"></i>{" "}
                              {users[oneKey].is_banned ? (
                                <>
                                  <Button
                                    color="green"
                                    onClick={() => {
                                      activateUser(users[oneKey].id);
                                    }}
                                  >
                                    Activate
                                  </Button>
                                </>
                              ) : (
                                <p>Active</p>
                              )}
                            </th>
                          </>
                        )}
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            )}
          </div>
        )}
        <Modal size="lg" active={register} toggler={() => setRegister(false)}>
          <ModalBody>
            <RegisterPage></RegisterPage>
          </ModalBody>
        </Modal>
      </CardBody>
    </Card>
  );
}
