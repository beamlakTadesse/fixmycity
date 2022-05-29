import Card from "@material-tailwind/react/Card";
import Image from "@material-tailwind/react/Image";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";

import Input from "@material-tailwind/react/Input";
import Textarea from "@material-tailwind/react/Textarea";
import ProfilePicture from "assets/img/team-1-800x800.jpg";
import React, { useState, useEffect, useCallback,useRef,useMemo } from "react";
import { getUserId } from "helpers/utils";
import { getRol } from "helpers/utils";
import { url } from "helpers/strings";
import { isEqual } from 'lodash'
export default function ProfileCard({ editProfile, setEditProfile }) {
  const [users, setUsers] = useState({});
  const [u, setU] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);
  const id = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [image, setImage] = useState("");

  console.log(token);
  const userId = getUserId(token);
  const url1 = `${url}/v1/admins/users/` + userId;
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url1);

      const json = await response.json();

      if (json) {
      //  setU(json.user)
        // if(!isEqual(users,u)){
           setUsers(json.user);
          setImage(
            `http://res.cloudinary.com/shetechs/${json.user.ProfileImage}`
          );
        // }
       
      }
    } catch (error) {
      console.log("error", error);
      setError(true);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    console.log("wert7687oilkcgxfdtrytuyiu");
  };
 
  const loadUserFromServer = useCallback(async () => {
    fetchData();
  }, []); //

  // const person = useMemo(
  //   () => { fetchData();},
  //   [] //no dependencies so the value doesn't change
  // );

  // const { current: user } = useRef(users);
  useEffect(() => {
    // if(users !== u){
    //   setUsers(u)
     loadUserFromServer();

    // }
    // fetchData();
  }, [loadUserFromServer]);
  console.log("Sectors: ", users);
  function EditProfile() {
    setEditProfile(!editProfile);
  }
  return (
    <>
      {users && (
        <Card>
          <div className="flex flex-wrap justify-center">
            <div className="w-48 px-4 -mt-24">
              <Image src={image} rounded raised />
            </div>
          </div>

          <CardBody>
            <form>
              <h6 className="text-brown text-sm mt-9 mb-6 font-bold uppercase">
                personal Information
              </h6>

              <div className="flex flex-wrap text-xs mt-10">
                {users.first_name && users.last_name && (
                  <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                    <h1>Full name </h1>
                    <h1>
                      {users.first_name} {users.last_name}
                    </h1>
                  </div>
                )}
                {users.username && (
                  <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                    <h1>Username : </h1>
                    <h1>{users.username}</h1>
                  </div>
                )}
                {users.email && (
                  <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                    <h1>Email : </h1>
                    <h1>{users.email}</h1>
                  </div>
                )}
                {users.location && (
                  <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                    <h1>Location :</h1>
                    <h1> Addis Ababa / Ethiopia</h1>
                  </div>
                )}
                <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                  <h1>Phone No. : </h1>
                  <h1>{users.phone_number}</h1>
                </div>
              </div>
              {getRol(token) == 2 && users && users.sector && (
                <>
                  <h6 className="text-blue-500 text-sm my-6 font-bold uppercase">
                    Sector Information
                  </h6>
                  <div className="flex flex-wrap text-xs mt-10">
                    <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                      <h1>Sector : {users.sector.district_name}</h1>
                    </div>
                    <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                      <h1>
                        Location : {users.sector.address}, Addis Ababa /
                        Ethiopia
                      </h1>

                      {/* <h1></h1> */}
                    </div>
                    <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                      <h1>Email : {users.sector.email} </h1>
                      {/* <h1> Elpa@gmail.com</h1> */}
                    </div>
                    <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                      <h1>Phone No. : {users.sector.phone_number} </h1>
                      {/* <h1> </h1> */}
                    </div>
                  </div>
                </>
              )}
              {/* <h6 className="text-purple-500 text-sm my-6 font-light uppercase">
                        About Me
                    </h6> */}
              {/* <div className="flex flex-wrap mt-10 font-light">
                        <Textarea color="purple" placeholder="About Me" />
                    </div> */}
            </form>
            {!editProfile && (
              <div className="grid grid-cols-1 xl:grid-cols-6">
                <Button
                  className="xl:col-start-3 xl:col-end-6 px-4 mb-10"
                  color="brown"
                  onClick={() => {
                    EditProfile();
                  }}
                >
                  Edit Profile
                </Button>
              </div>
            )}
          </CardBody>
        </Card>
      )}
    </>
  );
}
