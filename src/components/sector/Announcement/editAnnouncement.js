import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import { Heading5, ModalFooter } from "@material-tailwind/react";

import ModalTitle from "@material-tailwind/react/ModalHeader";

import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Input from "@material-tailwind/react/Input";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import userDetailContext from "../../../pages/SectorAdmin/Announcement";
import { url } from "helpers/strings";
export default function EditAnnouncement({
  isActive,
  setIsActive,
  title,
  description,
  id,
}) {
  const [showModal, setShowModal] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);
  // const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [statusCode, setStatus] = useState(null);

  const [values, setValues] = useState({
    title: "",
    description: "",
  });
  const handleTitleInputChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      title: event.target.value,
    }));
  };

  const handleDescriptionInputChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      description: event.target.value,
    }));
  };

  //   componentDidMount() {

  // }
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const dispatch = useDispatch();

  const [mydata, setData] = useState(null);
  console.log(id);

  async function handleSubmit(id) {
    const url1 = `${url}/v1/announcment/${id}/`;

    setSubmitted(true);

    try {
      // const response = await fetch(url);

      console.log("hello form is submmitted");

      const formData = new FormData();
      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      if (("title", values.title)) {
        formData.append("title", values.title);
      }
      if (values.description) {
        formData.append("description", values.description);
      }
      const requestOptions = {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },

        body: formData,
        // body:JSON.stringify({'title':values.title,'description':values.description,"image":currentPic})
      };
      console.log(requestOptions);
      // console.log(formData.get("title"));
      console.log(formData.get("image"));

      await fetch(url1, requestOptions)
        .then((response) => {
          if (!response.ok) {
            setStatus(response.status);
            setShowModal(true);

            throw new Error(response.status);
          } else return response.json();
        })
        .then((data) => {
          setData(data);
          // this.setState({ isLoading: false, downlines: data.response });
          console.log("DATA STORED");
          setShowModal(false);
          setIsActive(false);
        })
        .catch((error) => {
          console.log("error: " + error);
          setErrorMessage("Please try Again");
          setError(true);
        });
    } catch (error) {
      console.log("error", error);
    }

    //   setSubmitted(true);
  }

  return (
    <Modal size="lg" active={isActive} toggler={() => setIsActive(false)}>
      <ModalBody>
        <Card>
          <CardHeader color="brown" contentPosition="none">
            <div className="w-full flex items-center justify-between">
              <h2 className="text-white text-2xl">Edit Announcement</h2>
            </div>
          </CardHeader>
          <CardBody>
            <form encType="multipart/form-data">
              <h6 className="text-brwno-500 text-sm mt-1 mb-6 font-light uppercase">
                Title
              </h6>
              <div className="flex flex-wrap mt-4">
                <div className="w-full lg:w-full pr-4 mb-8 font-light">
                  <Input
                    type="text"
                    color="bro"
                    wn
                    placeholder={title}
                    name="districtName"
                    value={values.title}
                    onChange={handleTitleInputChange}
                    data-cy="txt-postann-title-edit"
                  />
                  {/* {submitted && !values.title && (
                    <div className="mt-2 text-sm text-red-600">
                      Announcement title is required
                    </div>
                  )} */}
                </div>

                {/* <Modal size="lg" active={showModal} toggler={() => setShowModal(false)}>
                                                <ModalTitle>
                                                    <Heading5>
                                                      Success Message
                                                    </Heading5>
                                                </ModalTitle>
                                                <ModalBody>
                                                    <p>
                                                         You have Successfully created announcement!                                                 </p>
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button onClick={() => setError(true)}
                                                    >Ok</Button>
                                                   
                                                </ModalFooter>

                                            </Modal> */}

                <div className="w-full lg:w-full mb-5 font-light">
                  <textarea
                    className="
                            form-control
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                          "
                    id="announcement_description"
                    rows="3"
                    value={values.description}
                    onChange={handleDescriptionInputChange}
                    placeholder={description}
                    data-cy="txt-postann-description-edit"
                  ></textarea>

                  {/* {submitted && !values.description && (
                    <div className="mt-2 text-sm text-red-600">
                      description is required
                    </div>
                  )} */}
                </div>
              </div>

              <div>
                <input
                  type="file"
                  name="file"
                  onChange={changeHandler}
                  data-cy="btn-postann-image"
                />
              </div>
              {/* {submitted && !isSelected && (
                <div className="mt-2 text-sm text-red-600">
                  image is required
                </div>
              )} */}
              <div className="grid grid-rows-3 grid-flow-col gap-1 mt-4">
                <div className="row-span-3">
                  <Button
                    color="brown"
                    onClick={(e) => handleSubmit(id)}
                    data-cy="btn-postann-edit-submit"
                  >
                    Submit
                  </Button>
                </div>
                <div className="row-span-3">
                  <Button color="brown">Cancel</Button>
                </div>
              </div>
            </form>
          </CardBody>
        </Card>
      </ModalBody>
    </Modal>
  );
}
