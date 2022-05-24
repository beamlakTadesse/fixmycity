import Card from "@material-tailwind/react/Card";
import Image from "@material-tailwind/react/Image";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";
import Input from "@material-tailwind/react/Input";
import Textarea from "@material-tailwind/react/Textarea";
import ProfilePicture from "assets/img/team-1-800x800.jpg";
import React, { useState, useEffect } from "react";
import { getUserId } from "helpers/utils";
export default function ProfileCard({ editProfile, setEditProfile }) {
  const [users, setUsers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);
  const id = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  console.log(token);
  const userId = getUserId(token);
  useEffect(() => {
    const url = `http://localhost:8000/v1/admins/users/` + userId;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url);

        const json = await response.json();

        if (json) {
          setUsers(json.user);
        }

        console.log("Sectors: ", json.user);
      } catch (error) {
        console.log("error", error);
        setError(true);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    };

    fetchData();
  }, []);

  function EditProfile() {
    setEditProfile(!editProfile);
  }
  return (
    <>
      {users && (
        <Card>
          <div className="flex flex-wrap justify-center">
            <div className="w-48 px-4 -mt-24">
              <Image src={users.image} rounded raised />
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
              {/* {userRole === 2 && (
                <>
                  <h6 className="text-blue-500 text-sm my-6 font-bold uppercase">
                    Sector Information
                  </h6>
                  <div className="flex flex-wrap text-xs mt-10">
                    <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                      <h1>Sector : ELPA</h1>
                      <h1>ELPA</h1>
                    </div>
                    <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                      <h1>Location : </h1>
                      <h1>Addis Ababa / Ethiopia</h1>
                    </div>
                    <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                      <h1>Email : </h1>
                      <h1> Elpa@gmail.com</h1>
                    </div>
                    <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                      <h1>Phone No. : </h1>
                      <h1>+251 9867888899</h1>
                    </div>
                  </div>
                </>
              )} */}
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
