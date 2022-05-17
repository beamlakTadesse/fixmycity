import React, { useEffect, useState } from "react";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";
import Input from "@material-tailwind/react/Input";
import Textarea from "@material-tailwind/react/Textarea";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { sectorActions, userActions } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import Table from "components/report/Table";

export default function AddSectorAdminForm() {
  const dispatch = useDispatch();
  function componentDidMount() {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  }
  const [sectors, setSectors] = useState([]);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sectorId, setSectorId] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  function handleEmailChange(e) {
    e.preventDefault();
    setEmail(e.target.value);
  }
  function handleChange(e) {
    e.preventDefault();
    setSectorId(e.target.value);
  }
  function getSectors() {
    try {
      const response = fetch(
        `http://localhost:8000/v1/admins/sector/sector/`
      ).then(async (response) => {
        var res = await response.json();
        if (response.ok) {
          setSectors(res.results);
        }
      });
    } catch (error) {
      setSectors([]);
      console.log("error", error);
    }
  }

  function handleSubmit(e) {
    console.log("submit....");
    e.preventDefault();
    setSubmitted(true);
    let token = localStorage.getItem("token");
    if (email) {
      const inputs = {
        email: email,
        sector: sectorId,
      };
      console.log(inputs);
      const requestOptions = {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(inputs),
      };
      fetch(`http://localhost:8000/v1/admins/register/`, requestOptions).then(
        async (response) => {
          const data = await response.json();

          // check for error response
          if (!response.ok) {
            console.log(data);
            setError(data.email);
            // get error message from body or default to response status
          } else {
          }

          // console.log(data);
        }
      );
      // setEmail("");
    }
  }
  // const columns = React.useMemo(
  //   () => [
  //     {
  //       Header: "",
  //       accessor: "sector.id",
  //     },
  //     {
  //       Header: "Sector Name",
  //       accessor: "sector.district_name",
  //     },
  //     // {
  //     //   Header: "Status",
  //     //   accessor: "state",
  //     //   Cell: StatusPill,

  //     //   Filter: SelectColumnFilter, // new
  //     //   // filter: 'includes',
  //     // },
  //     // {
  //     //   Header: "Like Count",
  //     //   accessor: "like_count",
  //     // },
  //     // {
  //     //   Header: "Address",
  //     //   accessor: "sector.address",

  //     //   // Filter: SelectColumnFilter,  // new
  //     //   // filter: 'includes',
  //     // },
  //   ],
  //   []
  // );
  useEffect(() => {
    getSectors();
  });

  return (
    // <Card>
    //   <CardHeader color="purple" contentPosition="none">
    //     <div className="w-full flex items-center justify-between">
    //       <h2 className="text-white text-2xl">Create Sector Admin </h2>
    //     </div>
    //   </CardHeader>
    //   <CardBody>
    <div>
      {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
      <form>
        <div className="flex flex-wrap mt-10">
          <div className="grid grid-rows-2 ">
            <div>
              <lable className="font-light">Select Sector </lable>
              <select value={sectorId} onChange={handleChange}>
                {sectors &&
                  sectors.map(function (sector) {
                    return (
                      <option value={sector.id}>{sector.district_name}</option>
                    );
                  })}
              </select>
            </div>
            <div className="w-full pl-4 mb-10 font-light">
              <Input
                type="email"
                color="purple"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={handleEmailChange}
              />
              {submitted && !email && (
                <div className="mt-2 text-sm text-red-600">
                  email is required
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-rows-3 grid-flow-col gap-1">
          <div className="row-span-3">
            <Button onClick={(e) => handleSubmit(e)}>Submit</Button>
          </div>
          <div className="row-span-3">
            <Button>Cancel</Button>
          </div>
        </div>
        {/* <Table columns={columns} data={sectors} /> */}
      </form>
    </div>
    //   </CardBody>
    // </Card>
  );
}
