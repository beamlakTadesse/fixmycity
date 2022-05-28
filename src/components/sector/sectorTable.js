import React, { useEffect, useState } from "react";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Image from "@material-tailwind/react/Image";
import Progress from "@material-tailwind/react/Progress";
import Team1 from "assets/img/team-1-800x800.jpg";
import Team2 from "assets/img/team-2-800x800.jpg";
import Team3 from "assets/img/team-3-800x800.jpg";
import Team4 from "assets/img/team-4-470x470.png";
import { useDispatch, useSelector } from "react-redux";
import { sectorActions } from "../../actions";
import { url } from "helpers/strings";

export default function SectorTable({ isEmpty }) {
  // const sectors = useSelector(state => state.sectors);
  // const user = useSelector(state => state.authentication.user);
  const dispatch = useDispatch();
  const [mains, setMains] = useState([]);
  const [myEmpty, setIsEmpty] = useState(true);
  const [sectors, setSectors] = useState([]);
  useEffect(() => {
    // mounted.current = true;
    const url1 = `${url}/v1/admins/sector/sector`;

    const fetchData = async () => {
      try {
        const response = await fetch(url1);

        const json = await response.json();

        if (json.results.length === 0) {
          setIsEmpty(true);
        } else {
          setSectors(json.results);

          setIsEmpty(false);
        }
        setMains([
          "EthioTelecom",
          "Water and Sewage",
          "Roads Authority",
          "ELPA",
        ]);
        // console.log("Sectors: ", json.sectors[0].district_name);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  function handleDeleteUser(id) {
    console.log(id);
    dispatch(sectorActions.delete(id));
  }
  return !isEmpty && myEmpty ? (
    <></>
  ) : (
    <Card>
      <CardHeader color="brown" contentPosition="left">
        <h2 className="text-white text-2xl">Sectors</h2>
      </CardHeader>
      <CardBody>
        {sectors.length > 0 ? (
          <div className="overflow-x-auto ">
            <table className="items-center container mx-auto max-w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className="px-2 text-brown-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                    District Name
                  </th>
                  <th className="px-2 text-brown-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                    Email
                  </th>
                  <th className="px-2 text-brown-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                    Phone
                  </th>
                  <th className="px-2 text-brown-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                    District Type
                  </th>
                </tr>
              </thead>

              {sectors &&
                Object.keys(sectors).map((oneKey, i) => {
                  return (
                    <tbody>
                      <tr>
                        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                          {sectors[oneKey].district_name}
                        </th>
                        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                          {sectors[oneKey].email}
                        </th>
                        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                          <i className="fas fa-circle fa-sm text-orange-500 mr-2"></i>{" "}
                          {sectors[oneKey].phone_number}
                        </th>
                        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                          <i className="fas fa-circle fa-sm text-orange-500 mr-2"></i>{" "}
                          {mains[sectors[oneKey].sector_type - 1]}
                        </th>
                      </tr>
                    </tbody>
                  );
                })}
            </table>
          </div>
        ) : (
          <div>
            <div class="flex justify-center items-center mt-10">
              {/* <Loader/>    */}
              <h3>No Data to Display</h3>
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
