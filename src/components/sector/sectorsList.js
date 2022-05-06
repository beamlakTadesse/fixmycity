import Title from '../landing/Title';
import TeamCard from '../landing/TeamCard';
import Image1 from '../../assets/img/tele.png';
import Image2 from '../../assets/img/elpha.png';
import Image3 from '../../assets/img/aawsa.png';
import Image4 from '../../assets/img/aara.jpg';

import { Heading5, ModalFooter } from '@material-tailwind/react';

import ModalTitle from "@material-tailwind/react/ModalHeader"
import { Button } from '@material-tailwind/react';
import React, { useState, useEffect } from "react";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import AddSectorForm from './addSectorForm';
import SectorTable from './sectorTable'
import Card from '@material-tailwind/react/Card';
import CardRow from '@material-tailwind/react/CardRow';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardStatus from '@material-tailwind/react/CardStatus';
import CardStatusFooter from '@material-tailwind/react/CardStatusFooter';

import Icon from '@material-tailwind/react/Icon';
import CardBody from '@material-tailwind/react/CardBody';
import Input from '@material-tailwind/react/Input';
import Textarea from '@material-tailwind/react/Textarea';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function SectorsSection() {

    // Add Sector 
    const [mydata, setData] = useState({});
    const [lati, setLat]= useState(null);
    const [lngi, setLng] = useState(null);

    const [inputs, setInputs] = useState({
        district_name: '',
        email: '',
        phone_number: '',
        sector_type: 4,
        lat:null,
        lng:null,

    });

    const [submitted, setSubmitted] = useState(false);
    const { district_name, email, phone_number, sector_type,lat, lng } = inputs;

    const [showModal, setShowModal] = useState(false);
    const [isError, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [statusCode,setStatus] = useState(null);
    const [checked, setChecked] = React.useState(false);

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
                else return response.json();
              })
              .then((data) => {
                  setData(data);
                // this.setState({ isLoading: false, downlines: data.response });
                console.log("DATA STORED");
                setShowModal(false);

              })
              .catch((error) => {
                console.log('error: ' + error);
                setErrorMessage("Please try Again");
                setError(true);
       
                
               
                
              });;
            
        }
        
          } catch (error) {
            console.log("error", error);
          }

        //   setSubmitted(true);
       
    }



    // const [startDate, setStartDate] = useState(new Date());


    const [sectors , setSectors] = useState({});
    useEffect(() => {
        // mounted.current = true;
        const url = `http://localhost:8000/v1/admins/main_sectors/`;


        const fetchData = async () => {
          try {
            const response = await fetch(url);
           
            const json = await response.json();
            
            setSectors(json.sectors);
           
            // console.log("Sectors: ", json.sectors[0].district_name);
          } catch (error) {
            console.log("error", error);
          }
        };

          fetchData();
      
    }, []);
    return (
        <section className="pt-20 pb-48">
            <div className="container max-w-md mx-auto px-8">
                <div className="container">
                    <div className='grid grid-cols-4 gap-4  content-end'>
                        <div></div>
                        <div></div>
                        <div></div>
                        <Button className="flex justify-center bg-blue" onClick={(e) => setShowModal(true)}>Create Sector</Button></div>

                </div>
                {/* <AddSectorForm isactive={showModal}/> */}
                <Modal size="lg" active={showModal} toggler={() => setShowModal(false)}>

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

                        <div className="w-full lg:w-6/12 pl-4 font-light" >
                            <label >
                                <input 
                                type="checkbox"
                                checked={checked}
                                onChange={handleChecked}
                                />
                                Main Sector
                            </label>

                      </div>
                        {/* <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                        </div> */}
                    </div> 

                    <Modal size="lg" active={isError} toggler={() => setError(false)}>
                                                <ModalTitle>
                                                    <Heading5>
                                                    Error While Creating 
                                                    </Heading5>
                                                </ModalTitle>
                                                <ModalBody>
                                                    <p>
                                                         Please Try again!                                                 </p>
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button onClick={() => setShowModal(true)}
                                                    >Ok</Button>
                                                   
                                                </ModalFooter>

                                            </Modal>
                
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
                    
                    {/* <AddSectorForm /> */}
                    </ModalBody>
                   
                </Modal>

                
                {/* <Title heading="Here are our Sectors">
                    In the City of Adiss Ababa there are planty of service providers from which Four of them are registerd in this system.
                </Title> */}

                {/* <div className="flex "> */}
                <div className="container mx-auto max-w-full">

                <div className="px-4 mb-10 ">
                        <div className="container mx-auto max-w-full">
                        <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 mb-4">
                       
                {
                                        sectors && 
                                        Object.keys(sectors).map((oneKey, i) => {
                                            return (
                   
                        <Card className="xl:col-start-2 xl:col-end-1 px-4 mb-14">
                            <CardRow >
                                <CardHeader iconOnly className="mb-0">
                                    <img src={sectors[oneKey].sector_logo}
                                    />
                                </CardHeader>

                                <CardStatus amount={sectors[oneKey].district_name} title= {sectors[oneKey].email}/>
                            </CardRow>

                            <CardStatusFooter
                                // amount="Telecom Service Provider"
                                // date="date"
                            >
                                {/* <Icon  name={percentageIcon} /> */}
                            </CardStatusFooter>
                        </Card>
                  

                            // sectorsCount[oneKey][0]           
                            )
                        }) 
                    }
                    
                    </div>
                    </div>
                    </div>
                </div>
                <SectorTable />
            </div>
        </section>
    );
}