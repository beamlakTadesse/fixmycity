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
import { url } from "helpers/strings";
import { Trans } from "react-i18next";

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
  const [success, setSuccess] = useState(false);

  const [sectorId, setSectorId] = useState(0);
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
      const response = fetch(`${url}/v1/admins/sector/sector/`).then(
        async (response) => {
          var res = await response.json();
          if (response.ok) {
            setSectors(res.results);
            console.log("sector..");
          }
        }
      );
    } catch (error) {
      setSectors([]);
      console.log("error", error);
    }
  }

  function handleSubmit(e) {
    console.log("submit....");
    console.log("submit....");
    e.preventDefault();
    setSubmitted(true);
    setSuccess(false);
    setError("");
    let token = localStorage.getItem("token");
    // if (email && sectorId != 0) {
    const inputs = {
      email: email,
      sector: 2,
    };
    console.log(sectorId);
    console.log(inputs);
    const requestOptions = {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(inputs),
    };
    console.log(inputs);
    fetch(`${url}/v1/admins/register/`, requestOptions).then(
      async (response) => {
        console.log(response);

        const data = await response.json();
        console.log(data);

        // check for error response
        if (!response.ok) {
          console.log(data);

          setError(data.email);
          // get error message from body or default to response status
        } else {
          setSuccess(true);
        }

        // console.log(data);
      }
    );
    // setEmail("");
    // }
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
  }, []);

  return (
    // <Card>
    //   <CardHeader color="purple" contentPosition="none">
    //     <div className="w-full flex items-center justify-between">
    //       <h2 className="text-white text-2xl">Create Sector Admin </h2>
    //     </div>
    //   </CardHeader>
    //   <CardBody>
    <div>
      {error && !success && (
        <div data-cy="create-api-error" className="mt-2 text-sm text-red-600">
          {error}
        </div>
      )}
      {success && (
        <div className="mt-2 text-sm text-green-600">Successfully created</div>
      )}
      <form>
        <div className="flex flex-wrap mt-10">
          <div className="grid grid-rows-2 ">
            <div>
              <lable className="font-light">
                <Trans i18nKey="adminDash.SelectSector"> Select Sector</Trans>{" "}
              </lable>
              <select
                value={sectorId}
                onChange={(e) => {
                  handleChange(e);
                }}
              >
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
                data-cy="txt-createAdmin-email"
                type="email"
                color="brown"
                placeholder={<Trans i18nKey="profile.email">email</Trans>}
                name="email"
                value={email}
                onChange={(e) => {
                  handleEmailChange(e);
                }}
              />
              {submitted && !email && (
                <div data-cy="email-req" className="mt-2 text-sm text-red-600">
                  email is required
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-rows-3 grid-flow-col gap-1">
          <div className="row-span-3">
            <Button
              color="brown"
              data-cy="btn-createAdmin-submit"
              onClick={(e) => handleSubmit(e)}
            >
              <Trans i18nKey="announcement.submit"> Submit</Trans>
            </Button>
          </div>
          <div className="row-span-3">
            <Button color="brown">
              <Trans i18nKey="reportDetail.cancel"> Cancel</Trans>
            </Button>
          </div>
        </div>
        {/* <Table columns={columns} data={sectors} /> */}
      </form>
    </div>
    //   </CardBody>
    // </Card>
  );
}
