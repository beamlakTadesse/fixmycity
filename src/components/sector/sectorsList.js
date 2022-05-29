import { Button } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";

import SectorTable from "./sectorTable";
import Card from "@material-tailwind/react/Card";
import CardRow from "@material-tailwind/react/CardRow";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardStatus from "@material-tailwind/react/CardStatus";

import "react-datepicker/dist/react-datepicker.css";
import Loader from "./shared/loader";

import EmptyState from "./shared/emptyState";
import AddSectorForm from "./addSectorForm";
import ErrorPage from "./shared/errorPage";
import ErrorPage2 from "./shared/errorPage2";
import { url } from "helpers/strings";

export default function SectorsSection() {
  // Add Sector
  const [mydata, setData] = useState({});
  const [lati, setLat] = useState(null);
  const [lngi, setLng] = useState(null);

  const [inputs, setInputs] = useState({
    district_name: "",
    email: "",
    phone_number: "",
    sector_type: 4,
    lat: null,
    lng: null,
  });

  const [submitted, setSubmitted] = useState(false);
  const { district_name, email, phone_number, sector_type, lat, lng } = inputs;

  const [showModal, setShowModal] = useState(false);
  const [checked, setChecked] = React.useState(false);

  // ########### LOADING pAGE
  // let circleCommonClasses = 'h-2.5 w-2.5 bg-current rounded-full';

  // ####################### Loading PAge End
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isError, setError] = useState(false);
  const [statusCode, setStatus] = useState(null);

  const handleChecked = () => {
    setChecked(!checked);
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  // useEffect(()=>{

  // const [startDate, setStartDate] = useState(new Date());

  const [sectors, setSectors] = useState({});
  useEffect(() => {
    // mounted.current = true;
    const url1 = `${url}/v1/admins/main_sectors/`;

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(url1);

        const json = await response.json();

        setSectors(json.sectors);
        if (!(sectors.length === 0)) {
          setIsEmpty(false);
        } else {
          setIsEmpty(true);
        }
        // console.log("Sectors: ", json.sectors[0].district_name);
      } catch (error) {
        setError(true);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    };

    fetchData();
  }, []);
  return isLoading ? (
    <div class="flex justify-center items-center h-screen">
      <Loader />
    </div>
  ) : isError ? (
    <ErrorPage2 />
  ) : !isEmpty ? (
    <section className="pt-20 pb-48">
      <div className="container max-w-md mx-auto px-8">
        <div className="container">
          <div className="grid grid-cols-4 gap-4  content-end">
            <div></div>
            <div></div>
            <div></div>
            <Button
              color="brown"
              className="flex justify-center bg-brown"
              onClick={(e) => setShowModal(true)}
            >
              Create Sector
            </Button>
          </div>
        </div>

        <AddSectorForm isActive={showModal} setIsActive={setShowModal} />

        <div className="container mx-auto max-w-full">
          <div className="px-4 mb-10 ">
            <div className="container mx-auto max-w-full">
              <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 mb-4">
                {sectors &&
                  Object.keys(sectors).map((oneKey, i) => {
                    return (
                      <Card className="xl:col-start-2 xl:col-end-1 px-4 mb-14">
                        <CardRow>
                          <CardHeader color="brown" iconOnly className="mb-0">
                            <img src={sectors[oneKey].sector_logo} />
                          </CardHeader>

                          <CardStatus
                            amount={sectors[oneKey].district_name}
                            title={sectors[oneKey].email}
                          />
                        </CardRow>
                      </Card>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
        <SectorTable isEmpty={isEmpty} />
      </div>
    </section>
  ) : (
    <div class="grid grid-rows-4 justify-center  gap-4 h-screen">
      {/* <Loader/>    */}
      {/* <EmptyState title="Sector" /> */}

      <Button
        color="brown"
        className="flex justify-center h-[60px] bg-brown bg-black text-white text-xl hover:bg-brown-300 transition-color duration-200 delay-200"
        onClick={(e) => setShowModal(true)}
      >
        Create Sector
      </Button>

      <AddSectorForm isActive={showModal} setIsActive={setShowModal} />
    </div>
  );
}
