import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";
import Input from "@material-tailwind/react/Input";
import Textarea from "@material-tailwind/react/Textarea";
import { useState, useEffect } from "react";
import { getUserId } from "helpers/utils";

export default function SettingsForm({ editProfile, setEditProfile }) {
  const [mydata, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);
  const id = getUserId(localStorage.getItem("token"));
  useEffect(() => {
    const url = `http://localhost:8000/v1/admins/users/` + id;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url);

        const json = await response.json();

        if (json) {
          setData(json.user);
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
    <Card>
      <CardHeader color="brown" contentPosition="none">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-white text-2xl">My Account</h2>
          <Button
            color="transparent"
            buttonType="link"
            size="lg"
            style={{ padding: 0 }}
          >
            Settings
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <form>
          <h6 className="text-brown text-sm mt-3 mb-6 font-light uppercase">
            User Information
          </h6>
          <div className="flex flex-wrap mt-10">
            <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
              <lable>Email</lable>
              <Input type="email" color="blue" placeholder={mydata.email} />
            </div>
            <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
              <lable>First Name</lable>
              <Input type="text" color="blue" placeholder={mydata.first_name} />
            </div>
            <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
              <lable>Last Name</lable>
              <Input type="email" color="blue" placeholder={mydata.last_name} />
            </div>
            <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
              <lable>Phone Number</lable>
              <Input
                type="text"
                color="blue"
                placeholder={mydata.phone_number}
              />
            </div>
          </div>
          {/* 
                    <h6 className="text-blue-500 text-sm my-6 font-light uppercase">
                        Contact Information
                    </h6>
                    <div className="flex flex-wrap mt-10">
                        <div className="w-full lg:w-12/12 mb-10 font-light">
                            <Input
                                type="text"
                                color="blue"
                                placeholder="Address"
                            />
                        </div>
                        <div className="w-full lg:w-4/12 pr-4 mb-10 font-light">
                            <Input
                                type="text"
                                color="blue"
                                placeholder="City"
                            />
                        </div>
                        <div className="w-full lg:w-4/12 px-4 mb-10 font-light">
                            <Input
                                type="text"
                                color="blue"
                                placeholder="Country"
                            />
                        </div>
                        <div className="w-full lg:w-4/12 pl-4 mb-10 font-light">
                            <Input
                                type="text"
                                color="blue"
                                placeholder="Postal Code"
                            />
                        </div>
                    </div> */}

          {/* <h6 className="text-purple-500 text-sm my-6 font-light uppercase">
                        About Me
                    </h6>
                    <div className="flex flex-wrap mt-10 font-light">
                        <Textarea color="blue" placeholder="About Me" />
                    </div> */}
        </form>
        {editProfile && (
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
  );
}
