import ErrorPage2 from "components/sector/shared/errorPage2";
import Loader from "components/sector/shared/loader";
import React, { useEffect, useState } from "react";

import Table, {
  phoneNumberCell,
  AvatarCell,
  LelaCell,
  PostedAtCell,
  StatePill,
  SpamStatus,
  ReportStatusColumnFilter,
  SelectColumnFilter,
  StatusPill,
  sectorCell,
} from "./Table"; // new
import { useLocation } from "react-router-dom";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Image from "@material-tailwind/react/Image";

import { useDispatch, useSelector } from "react-redux";
import { reportActions } from "../../actions";
import { Button } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { url } from "helpers/strings";
import { Trans } from "react-i18next";
// import ReportTableChart from 'components/sector/ReportTable';

function ReportShowAdmin() {
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);
  const columns = React.useMemo(
    () => [
      {
        // Header: "Lela",
        accessor: "image",
        Cell: LelaCell,
        // imgAccessor: "user.ProfileImage",
        // emailAccessor: "user.full_name",

        // idAccessor:"id",
      },
      {
        Header: "Name",
        accessor: "user.first_name",
        Cell: AvatarCell,
        imgAccessor: "user.ProfileImage",
        // stateAccessor : "state",

        idAccessor: ["state", "id"],
      },
      {
        Header: "Sector Name",
        accessor: "sector.district_name",
        idAccessor: ["state", "sector.email"],
        Cell: sectorCell,
      },

      {
        Header: "Posted At",
        accessor: "postedAt",
        Cell: PostedAtCell,
        idAccessor: "state",

        // Filter: SelectColumnFilter,  // new
        // filter: 'includes',
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: StatusPill,

        Filter: ReportStatusColumnFilter, // new
        // filter: 'includes',
      },

      {
        // idAccessor: "spamStatus",
        id: "spamStatus",
        Header: "SpamStatus",
        accessor: 'spamStatus',
        Cell: SpamStatus,
        Filter: SelectColumnFilter, // new
        // filter: "includes",
            },
    ],
    []
  );

  const [mydata, setData] = useState([]);
  const [nodata, setNoData] = useState(true);
  // setIsLoading(true);

  useEffect(() => {
    // mounted.current = true;
    const url1 = `${url}/v1/report/`;
    //
    // const url = `http://localhost:8000/v1/myreport/`;
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url1, requestOptions);

        const json = await response.json();
        // console.log("LOCATION:_"+location.pathname);
        // const lela = []
        if (json) {
          if (json.length != 0) {
            setNoData(false);
          }
          setData(json);
        }
        console.log(nodata);
        console.log("Sectors: ", json);
      } catch (error) {
        console.log("error", error);
        setError(true);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    };

    fetchData();
  }, []);

  // const data = React.useMemo(() => mydata, [])

  return isLoading ? (
    <div class="flex justify-center items-center h-screen">
      <Loader />
    </div>
  ) : !nodata ? (
    <Card className="mt-20">
      <CardHeader color="brown" contentPosition="left">
        <div className="flex flex-row items-end">
          <div className="items-end">
            <NavLink to="/maps" exact>
              {" "}
              <Button color="transparent">
                {" "}
                <Trans i18nKey="report.map">View in Map</Trans>
              </Button>
            </NavLink>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <div className="overflow-x-auto">
          <div className=" bg-gray-100 text-gray-900">
            {mydata && (
              <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                <div className="mt-6">
                  <Table columns={columns} data={mydata} />
                </div>
              </main>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  ) : (
    <div className="flex flex-center">
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="px-4 lg:py-12">
          <div className="lg:gap-4 lg:flex">
            <div className="flex flex-col items-center justify-center md:py-24 lg:py-32">
              <p className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                <span className="text-red-500">Oops!</span> No Data Found
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportShowAdmin;
