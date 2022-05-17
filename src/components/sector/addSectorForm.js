import React, { useState, useEffect } from "react";
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Button from '@material-tailwind/react/Button';
import Input from '@material-tailwind/react/Input';
import Textarea from '@material-tailwind/react/Textarea';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { sectorActions, userActions } from '../../actions'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";

import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import { act } from "@testing-library/react";
// import authHeader from 'helpers'
export default function AddSectorForm({isActive, setIsActive}) {
    const dispatch = useDispatch();
     
    const [lati, setLat]= useState(null);
    const [lngi, setLng] = useState(null);


    // const [showModal, setShowModal] = useState(false);
    const [checked, setChecked] = React.useState(false);

    // ########### LOADING pAGE
    // let circleCommonClasses = 'h-2.5 w-2.5 bg-current rounded-full';

    // ####################### Loading PAge End
    const [isLoading, setIsLoading] = useState(false);
    const [isEmpty, setIsEmpty] = useState(true);
    const [errorMessage, setErrorMessage] = useState(false);
    const [isError, setError] = useState(false);
    const [statusCode,setStatus] = useState(null);


    function componentDidMount() {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
        });
    }

    const [inputs, setInputs] = useState({
        district_name: '',
        email: '',
        phone_number: '',
        sector_type: 4,
        lat:null,
        lng:null,

    });
    const [showModal, setShowModal] = useState(false);

    // const [showModal, setShowModal] = useState(me_active);
    const [submitted, setSubmitted] = useState(false);
    const { district_name, email, phone_number, sector_type,lat, lng } = inputs;
    const [mydata, setData] = useState({});


    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
  
    
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed.

    }
  

    // useEffect(()=>{


        const handleChecked = () => {
            setChecked(!checked);
          };
          
          function handleChange(e) {
              const { name, value } = e.target;
              setInputs(inputs => ({ ...inputs, [name]: value }));
          }
      
          // useEffect(()=>{
      
          
         
          async function handleSubmit(e) {
              e.preventDefault();
      
              const url = `http://localhost:8000/v1/admins/sector/sector/`;
              setSubmitted(true);
             
             
              try {
                  navigator.geolocation.getCurrentPosition(function (position) {
                      console.log("Latitude is :", position.coords.latitude);
                      setLat(position.coords.latitude);
                      setLng(position.coords.longitude);
                      // setInputs(inputs => ({lat: position.coords.latitude,lng:position.coords.longitude }));
      // 
                      console.log("Longitude is :", position.coords.longitude);
                  });
                  // const response = await fetch(url);
                 
                if (district_name && email && phone_number ) {
                  setIsLoading(true);
                  const requestOptions = {
                      method: 'POST',
                      headers: {'Content-Type': 'application/json' },
                      body:JSON.stringify({'main_sector':checked,'district_name':district_name,'phone_number':phone_number,'sector_type':4,'email':email,"lng":lngi,"lat":lati})
                  };
                  console.log('hello form is submmitted')
                  setSubmitted(false);
                  
                  await fetch(url, requestOptions).then((response) => {
                      if(!response.ok) {
                      setStatus(response.status);
                      throw new Error(response.status);
                  }
                      else {
                          return response.json()}
                    })
                    .then((data) => {
                        setData(data);
                      // this.setState({ isLoading: false, downlines: data.response });
                      console.log("DATA STORED");
                      setShowModal(false);
      
                      if(mydata.length === 0){
                          setIsEmpty(true);
      
                      }
                          
      
                    })
                    .catch((error) => {
                      console.log('error: ' + error);
                      setErrorMessage("Please try Again");
                      setError(true);
                    });;
                    setTimeout(() => {
                      setIsLoading(false);            
                  }, 1500)
              }
              
                } catch (error) {
                  console.log("error", error);
                }
      
              //   setSubmitted(true);
             
          }
      



    const [startDate, setStartDate] = useState(new Date());
    return (

        <Modal size="lg" active={isActive} toggler={() => setIsActive(false)} >
        {/* active={me_active} toggler={() =>{me_active=!isactive}}> */}

        <ModalBody>

        <Card >
            <CardHeader color="blue" contentPosition="none">
                <div className="w-full flex items-center justify-between">
                    <h2 className="text-white text-2xl">Create Sector</h2>

                </div>
            </CardHeader>
            <CardBody>
                <form>
                    <h6 className="text-purple-500 text-sm mt-3 mb-6 font-light uppercase">
                        District Information
                    </h6>
                    <div className="flex flex-wrap mt-10">
                        <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                            <Input
                                type="text"
                                color="purple"
                                placeholder="District Name"
                                name="district_name" value={district_name} onChange={handleChange}
                            />
                            {submitted && !district_name &&
                                <div className="mt-2 text-sm text-red-600">District Name is required</div>
                            }
                        </div>
                        <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                            <Input
                                type="email"
                                color="purple"
                                placeholder="Email Address"
                                name="email" value={email} onChange={handleChange}
                            />
                            {submitted && !email &&
                                <div className="mt-2 text-sm text-red-600">email is required</div>
                            }
                        </div>
                        <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                            <Input
                                type="text"
                                color="purple"
                                placeholder="Phone"
                                name="phone_number" value={phone_number} onChange={handleChange}
                            />
                            {submitted && !phone_number &&
                                <div className="mt-2 text-sm text-red-600">phone is required</div>
                            }
                        </div>
                        <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                        </div>
                    </div>
                    <div className="grid grid-rows-3 grid-flow-col gap-1">
                        <div className="row-span-3">
                            <Button onClick={(e) => handleSubmit(e)}>
                                Submit
                            </Button>
                        </div>
                        <div className="row-span-3">

                            <Button onClick={(e) => setShowModal(false)}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </form>
            </CardBody>
        </Card>
        </ModalBody>
                   
                   </Modal>
        // <div className="basis-1/2 md:basis-1/3">
        //     <form name="form" onSubmit={handleSubmit} className="basis-1/2 md:basis-1/3 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        //         <div className="mb-8">
        //             <label className="block text-gray-700 text-sm font-bold mb-2" for="districtName">
        //                 District Name
        //             </label>
        //             <Input name="districtName" value={districtName} onChange={handleChange} className="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="districtName" type="text" placeholder="District Name" />
        //             {submitted && !districtName &&
        //                 <div className="mt-2 text-sm text-red-600">District Name is required</div>
        //             }
        //         </div>
        //         <div className="mb-4">
        //             <label className="block text-gray-700 text-sm font-bold mb-2" for="email">
        //                 Email
        //             </label>
        //             <Input name="email" value={email} onChange={handleChange} className="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="email" />
        //             {submitted && !email &&
        //                 <div className="mt-2 text-sm text-red-600">email is required</div>
        //             }
        //         </div>
        //         <div className="mb-4">
        //             <label className="block text-gray-700 text-sm font-bold mb-2" for="phone">
        //                 Phone
        //             </label>
        //             <Input name="phone" value={phone} onChange={handleChange} className="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="text" placeholder="phone" />
        //             {submitted && !phone &&
        //                 <div className="mt-2 text-sm text-red-600">phone is required</div>
        //             }
        //         </div>
        //         <div class="relative">

        //             <label className="block text-gray-700 text-sm font-bold mb-2" >
        //                 Select Date
        //             </label>
        //             <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        //         </div>

        //         <div className="flex items-center justify-between">
        //             <Button onClick={function (e) {
        //                 handleSubmit(e);
        //                 navigator.geolocation.getCurrentPosition(function (position) {
        //                     console.log("Latitude is :", position.coords.latitude);
        //                     console.log("Longitude is :", position.coords.longitude);
        //                 });
        //             }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        //                 Create
        //             </Button>

        //         </div>
        //     </form>

        // </div>
    );
}
