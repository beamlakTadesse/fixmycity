import React, {useState} from 'react';
import { Button } from '@material-tailwind/react';
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";

import AddSectorForm from '../addSectorForm';
import AnnouncementCard from './mycard';


import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Input from '@material-tailwind/react/Input';
import Textarea from '@material-tailwind/react/Textarea';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';
import { announcementActions } from 'actions';

export default function AddAnnouncement() {

      
      const [picture, setPicture] = useState('');
      const [submitted, setSubmitted] = useState(false);
      


    const onChangePicture = e => {
      console.log('picture: ', picture);

    setPicture(URL.createObjectURL(e.target.files[0]));

      };

      const [values, setValues] = useState({
        title: '',
        description: ''
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
  
      function addFile(e) {
        var formData = new FormData();
        formData.append("file", picture);
        formData.append('title', values.title);
        formData.append('description', values.description);
        console.log(picture);
    
        fetch(`http://localhost:8000/v1/announcment/`, {
            method: 'POST',
            headers: {'Content-Type': 'multipart/form-data'},
            body: {formData}
        })
        .then((response) => response.json())
        .then((data) => {
            this.setState({images: data.images, isLoading: false});
            this.props.updateImages(data.images);
        })
        .catch(error => this.setState({error, isLoading: false}));
    }
    const dispatch = useDispatch();


    function handleSubmit(e) {
        e.preventDefault();

        // addFile(e);
        if (values.title && values.description) {
            console.log('hello form is submmitted')
            dispatch(announcementActions.create(values));
            dispatch(announcementActions.getAll());
        }
        setSubmitted(true);

    }
    
  
      return (
          <Card>
              <CardHeader color="blue" contentPosition="none">
                  <div className="w-full flex items-center justify-between">
                      <h2 className="text-white text-2xl">Post Announcement</h2>
  
                  </div>
              </CardHeader>
              <CardBody>
                  <form encType="multipart/form-data">
                      <h6 className="text-purple-500 text-sm mt-3 mb-6 font-light uppercase">
                          Title
                      </h6>
                      <div className="flex flex-wrap mt-10">
                          <div className="w-full lg:w-full pr-4 mb-10 font-light">
                              <Input
                                  type="text"
                                  color="purple"
                                  placeholder="District Name"
                                  name="districtName" 
                                  value={values.title} onChange={handleTitleInputChange}
                              />
                              {submitted && !values.title &&
                                  <div className="mt-2 text-sm text-red-600">Announcement title is required</div>
                              }
                          </div>
                          <div className="w-full lg:w-full mb-10 font-light">
                           
                        <textarea
                          class="
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
                          value={values.description} onChange={handleDescriptionInputChange}
                          placeholder="Description"
                        ></textarea>

                                {submitted && !values.description &&
                                  <div className="mt-2 text-sm text-red-600">description is required</div>
                              }
                          </div>
                        
                          
                      </div>



                      <div class="flex justify-center mt-8">
                      <div class="rounded-lg shadow-xl bg-gray-50 lg:w-1/2">
                          <div class="m-4">
                              <label class="inline-block mb-2 text-gray-500">Upload
                                  Image(jpg,png,svg,jpeg)</label>
                              <div class="flex items-center justify-center w-full">
                                  <label class="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                      {/* <div class="flex flex-col items-center justify-center pt-1"> */}
                                     {    !picture?(
                                              
                                                <div class="flex flex-col items-center justify-center pt-7"><p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                              Select a photo</p> </div>
                                            ):(
                                                <div class="flex flex-col items-center justify-center">
                                              <img class="object-cover h-32 w-full" src={picture} /></div>
                                            )
                                          }
                                          
                                              
                                      {/* </div> */}
                                      <input type="file" class="opacity-0" onChange={onChangePicture} multiple accept="image/*" />
                                  </label>
                              </div>
                          </div>
                          {/* <div class="flex p-2 space-x-4">
                              <button class="px-4 py-2 text-white bg-red-500 rounded shadow-xl">Cannel</button>
                              <button class="px-4 py-2 text-white bg-green-500 rounded shadow-xl">Create</button>
                          </div> */}
                      </div>
                  </div>


                  <div className="grid grid-rows-3 grid-flow-col gap-1 mt-4">
                          <div className="row-span-3">
                              <Button onClick={(e) => handleSubmit(e)}>
                                  Submit
                              </Button>
                          </div>
                          <div className="row-span-3">
  
                              <Button >
                                  Cancel
                              </Button>
                          </div>
                      </div>
                  </form>
              </CardBody>
          </Card>
        
      );
  }
  