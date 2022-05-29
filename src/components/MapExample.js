import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import { useNavigate } from "react-router-dom";
import { url } from "helpers/strings";

const google = window.google = window.google ? window.google : {}

export default function MapExample() {
  const url = `${url}/v1/report/`;
  const navigate = useNavigate();

  const [loc, setLocations] = useState([]);
  const [state, setState] = useState({
    reports: [
      {
        id: null,
        locations: {
          lat: 9.038,
          lng: 38.7618,
        },
      },
    ],
  });
  function routeChange(id) {
    navigate(`/sector/reports/${id}`);
    console.log("ID IS:" + id);
  }

  const [mydata, setData] = useState([]);
  // setIsLoading(true);

  useEffect(() => {
    // mounted.current = true;
    const url = `${url}/v1/report/`;
    //
    // const url = `http://localhost:8000/v1/myreport/`;

    const fetchData = async () => {
      // setIsLoading(true);
      try {
        const response = await fetch(url);

        const json = await response.json();
        // console.log("LOCATION:_"+location.pathname);
        // const lela = []
        if (json.length > 0) {
          for (var i = 0; i < json.length; i++) {
            let newObj = {
              id: json[i].id,
              locations: {
                lat: parseFloat(json[i].latitude),
                lng: parseFloat(json[i].longtiude),
              },
            };
            {
            }
            setState((prevState) => {
              // 9.047487618620337, 38.758906071176746
              return {
                ...prevState,
                reports: [...prevState.reports, newObj],
              };
            });
          }
          setData(json);
          console.log("state: " + state.reports);
        }

        console.log("Sectors: ", json);
        console.log("locs ", state.reports);
      } catch (error) {
        console.log("error", error);
        //   setError(true);
      }
      //     setTimeout(() => {
      //       setIsLoading(false);
      //   }, 1500)
    };

    fetchData();
  }, []);

  // componentDidMount(){
  //     fetch(url)
  //     .then(function(response) {
  //         return response.json();
  //     }).then(data => {
  //         this.setState({markers: data});
  //     });
  // }
  const defaultCenter = {
    lat: 9.038,
    lng: 38.7618,
  };
  const center = {
    lat: 8.97332944,
    lng: 38.792996828,
  };

  // {announcements &&
  //     //   <div>

  //     Object.keys(state.todos).map((oneKey, i) => {
  //         return (
  //             <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14 mr-8">
  //                <h2>{state.todos[]}</h2>
  //             </div>

  //         )
  //     })

  // }

  return (
    <>
      <div className="relative w-full rounded-xl shadow-lg">
        <LoadScript googleMapsApiKey="AIzaSyBORpRsZyByiZOhgM_KcZswJty7pSz6DLs">
          <GoogleMap
            mapContainerClassName="w-full h-full rounded-xl"
            zoom={13}
            center={defaultCenter}
          >
            {mydata &&
              state &&
              state.reports &&
              Object.keys(state.reports).map((oneKey, i) => {
                return (
                  state.reports[oneKey].locations && (
                    <Marker
                      onClick={() => {
                        routeChange(state.reports[oneKey].id);
                      }}
                      key={"location" + state.reports[oneKey].id}
                      position={state.reports[oneKey].locations}
                    />
                  )
                );
              })}
          </GoogleMap>
        </LoadScript>
      </div>
    </>
  );
}
