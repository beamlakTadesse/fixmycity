import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";
import Input from "@material-tailwind/react/Input";
import Textarea from "@material-tailwind/react/Textarea";
import { useState, useEffect } from "react";
import { getUserId } from "helpers/utils";
import { url } from "helpers/strings";
import { phonenumber, nameValidation } from "helpers/validation";

export default function SettingsForm({ editProfile, setEditProfile }) {
  const [mydata, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);
  const id = getUserId(localStorage.getItem("token"));
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsFilePicked] = useState(false);
  const [phoneError, setPhoneError] = useState(null);
  const [nameError, setNameError] = useState(null);

  useEffect(() => {
    const url1 = `${url}/v1/admins/users/` + id;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url1);

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

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
    console.log(selectedFile);
  };
  const [inputs, setInputs] = useState({
    // email: mydata.email,
    firstname: "",
    lastname: "",
    phone_number: "",
  });
  const { firstname, lastname, phone_number } = inputs;
  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  function editProfile() {
    const url2 = `${url}/v1/admins/edit_profile/`;
    const formData = new FormData();
    if (inputs.firstname) {
      setNameError(nameValidation(inputs.firstname));
      if (nameError === null) {
        formData.append("first_name", inputs.firstname);
      }
    }
    if (selectedFile) {
      formData.append("ProfileImage", selectedFile);
    }
    if (inputs.lastname) {
      setNameError(nameValidation(inputs.lastname));
      if (nameError === null) {
        formData.append("first_name", inputs.lastname);
      }
    }
    if (inputs.phone_number) {
      setPhoneError(phonenumber(inputs.phone_number));
      if (phoneError === null) {
        formData.append("phone_number", inputs.phone_number);
      }
    }

    const requestOptions = {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },

      body: formData,
      // body:JSON.stringify({'title':values.title,'description':values.description,"image":currentPic})
    };
    // fetch(url2, requestOptions)
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error(response.status);
    //     } else return response.json();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //   });
  }
  function EditProfile() {
    setEditProfile(!editProfile);
    editProfile();
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
            {/* <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
              <lable>Email</lable>
              <Input
                type="email"
                value={email}
                name="email"
                color="blue"
                onChange={handleChange}
                placeholder={mydata.email}
              />
            </div> */}
            <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
              <lable>First Name</lable>
              <Input
                type="text"
                value={firstname}
                name="firstname"
                data-cy="input_fname"
                color="blue"
                onChange={handleChange}
                placeholder={mydata.first_name}
              />
            </div>
            <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
              <lable>Last Name</lable>
              <Input
                type="text"
                value={lastname}
                name="lastname"
                data-cy="input_lName"
                color="blue"
                onChange={handleChange}
                placeholder={mydata.last_name}
              />
            </div>
            <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
              <lable>Phone Number</lable>
              <Input
                type="text"
                value={phone_number}
                name="phone_number"
                data-cy="input_pNUmber"
                color="brown"
                onChange={handleChange}
                placeholder={mydata.phone_number}
              />
            </div>
            {phoneError && <p>{phoneError}</p>}
          </div>
          <div>
            <input
              type="file"
              name="file"
              onChange={changeHandler}
              data-cy="btn-postann-image"
            />
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
              data-cy="btn-editProfile"
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
