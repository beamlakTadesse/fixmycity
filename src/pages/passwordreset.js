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
import { Trans } from "react-i18next";

export default function PasswordReset() {
  const [email, setEmail] = useState({
    email: "",
    redirect_url: "http://localhost:3000/password-reset-confirm/",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setEmail((email) => ({ ...email, [name]: value }));
  }

  function sendEmail(e) {
    e.preventDefault();

    const url2 = `${url}/v1/admins/request-reset-email/`;

    const requestOptions = {
      method: "POST",

      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(email),
      // body:JSON.stringify({'title':values.title,'description':values.description,"image":currentPic})
    };
    fetch(url2, requestOptions)
      .then((response) => {
        if (!response.ok) {
          console.log(response.status);
        } else return response.json();
      })
      .then((data) => {
        if (data.success) {
          alert(data.success);
        }
        // console.log(data);
      });
  }

  return (
    <div className="flex flex-center w-1/2 ml-32 mt-16 ">
      <Card>
        <CardHeader color="brown" contentPosition="none">
          <div className="w-1/2 flex items-center justify-between">
            <h2 className="text-white text-2xl">Password Reset</h2>
          </div>
        </CardHeader>
        <CardBody>
          <form>
            <div className="flex flex-wrap mt-10">
              <div className=" lg:w-6/12 pl-4 ml-32 mb-10 font-light">
                <Input
                  type="text"
                  value={email.email}
                  name="email"
                  color="brown"
                  onChange={handleChange}
                  placeholder="email"
                />
              </div>
            </div>
          </form>

          <div className="grid grid-cols-1 xl:grid-cols-6">
            <Button
              className="xl:col-start-2 xl:col-end-6 px-4 mb-10"
              color="brown"
              onClick={sendEmail}
            >
              Send Email
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
