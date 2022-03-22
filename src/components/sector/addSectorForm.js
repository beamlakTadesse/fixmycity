import React, { useState } from "react";
import H3 from '@material-tailwind/react/Heading3';
import Paragraph from '@material-tailwind/react/Paragraph';
import Input from '@material-tailwind/react/Input';
import Textarea from '@material-tailwind/react/Textarea';
import Button from '@material-tailwind/react/Button';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { useForm } from "react-hook-form";

export default function AddSectorForm() {
    // const { register, handleSubmit, formState: { errors } } = useForm();
    function componentDidMount() {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
        });
    }

    const [inputs, setInputs] = useState({
        districtName: '',
        email: '',
        phone: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { districtName, email, phone } = inputs;
    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (districtName && email && phone) {
            console.log('hello form is submmitted')
            // const { from } = location.state || { from: { pathname: "/" } };
            // dispatch(userActions.login(username, password, from));
        }
    }

    // function validatePhoneNumber(number) {
    //     const isValidPhoneNumber = validator.isMobilePhone(number)
    //     console.log(isValidPhoneNumber);
    //     return (isValidPhoneNumber)
    // }

    const [startDate, setStartDate] = useState(new Date());
    return (

        <div className="basis-1/2 md:basis-1/3">
            <form name="form" onSubmit={handleSubmit} className="basis-1/2 md:basis-1/3 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-8">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="districtName">
                        District Name
                    </label>
                    <Input name="districtName" value={districtName} onChange={handleChange} className="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="districtName" type="text" placeholder="District Name" />
                    {submitted && !districtName &&
                        <div className="mt-2 text-sm text-red-600">District Name is required</div>
                    }
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="email">
                        Email
                    </label>
                    <Input name="email" value={email} onChange={handleChange} className="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="email" />
                    {submitted && !email &&
                        <div className="mt-2 text-sm text-red-600">email is required</div>
                    }
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="phone">
                        Phone
                    </label>
                    <Input name="phone" value={phone} onChange={handleChange} className="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="text" placeholder="phone" />
                    {submitted && !phone &&
                        <div className="mt-2 text-sm text-red-600">phone is required</div>
                    }
                </div>
                <div class="relative">

                    <label className="block text-gray-700 text-sm font-bold mb-2" >
                        Select Date
                    </label>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                </div>

                <div className="flex items-center justify-between">
                    <Button onClick={function (e) {
                        handleSubmit(e);
                        navigator.geolocation.getCurrentPosition(function (position) {
                            console.log("Latitude is :", position.coords.latitude);
                            console.log("Longitude is :", position.coords.longitude);
                        });
                    }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Create
                    </Button>

                </div>
            </form>

        </div>
    );
}
