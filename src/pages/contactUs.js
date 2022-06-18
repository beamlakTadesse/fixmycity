import { Input } from "@material-tailwind/react";
import Footer from "components/Footer";
import { Button } from "@material-tailwind/react";
import Sidebar from "components/Sidebar";
import { Trans } from "react-i18next";
import emailjs from "emailjs-com";
import { useState } from "react";
export default function Contact() {
  const [inputs, setInputs] = useState({
    fname: "",
    lname: "",
    message: "",
    email: "",
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }
  function submit(e) {
    e.preventDefault();
    emailjs
      .send("service_hdfck4h", "template_f45ueia", inputs, "VbVSj-tjaeFms7mSM")
      .then(
        (result) => {
          alert("Email sent");
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    console.log(inputs);
  }
  return (
    <>
      <Sidebar />
      <form className="w-full max-w-lg ml-64 mt-16">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              <Trans i18nKey="profile.firstName">First Name</Trans>
            </label>
            <Input
              name="fname"
              onChange={handleChange}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder=""
            />
            {/* <p className="text-red-500 text-xs italic">
              Please fill out this field.
            </p> */}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-last-name"
            >
              <Trans i18nKey="profile.lastName"> Last Name</Trans>
            </label>
            <Input
              name="lname"
              onChange={handleChange}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
              placeholder=""
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-password"
            >
              <Trans i18nKey="profile.email"> E-mail</Trans>
            </label>
            <Input
              name="email"
              onChange={handleChange}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="email"
              type="email"
            />
            {/* <p className="text-gray-600 text-xs italic">
              Some tips - as long as needed
            </p> */}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-password"
            >
              <Trans i18nKey="profile.Message"> Message</Trans>
            </label>
            <textarea
              name="message"
              onChange={handleChange}
              className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
              id="message"
            ></textarea>
            {/* <p className="text-gray-600 text-xs italic">
              Re-size can be disabled by set by resize-none / resize-y /
              resize-x / resize
            </p> */}
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3">
            <Button
              className="flex justify-center"
              color="brown"
              onClick={submit}
              //   className="shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              //   type="button"
            >
              <Trans i18nKey="profile.send"> Send</Trans>
            </Button>
          </div>
          <div className="md:w-2/3"></div>
        </div>
      </form>
      <Footer />
    </>
  );
}
