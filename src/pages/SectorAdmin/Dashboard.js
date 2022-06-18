import React, { useState, useEffect } from "react";
import StatusCard from "components/StatusCard";
import ReportChart from "components/sector/ReportChart";
// import ChartBar from 'components/ChartBar';

// import TrafficCard from 'components/TrafficCard';
import CardTable from "components/sector/TableCard";
import Loader from "components/sector/shared/loader";
import ErrorPage2 from "components/sector/shared/errorPage2";
import Sidebar from "components/Sidebar";
import Footer from "components/Footer";
import { getRol } from "helpers/utils";
import { url } from "helpers/strings";
import { getUserId } from "helpers/utils";

export default function Dashboard() {
  const [sectors, setSectors] = useState({});
  const [sectorsInfo, setSectorsInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [role, setRol] = useState(getRol(localStorage.getItem("token")));

  const [isEmpty, setIsEmpty] = useState(true);
  const [data_resolved, setDataResolved] = useState(null);
  const [data_spam, setSpamData] = useState(null);
  const [data_unresolved, setUnresolved] = useState(null);
  const [res, setRes] = useState(null);

  useEffect(() => {
    setRol(getRol(localStorage.getItem("token")));
    // mounted.current = true;
    var id = getUserId();
    // const url = `http://localhost:8000/v1/report_status/${id}/`;
    const url1 = `${url}/v1/report_status/`;
    const url2 = `${url}/v1/report/getReportChartView/`;

    const fetchData = async () => {
      setIsLoading(true);
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      try {
        const response2 = await fetch(url2, requestOptions);
        var data_r = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var data_sp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var data_unr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        const json2 = await response2.json();
        console.log(json2.response);
        setRes(json2.response);
        if (!(json2.response === null)) {
          setIsEmpty(false);
          console.log("Response HEre", json2.response);

          for (let i = 0; i < 12; i++) {
            var lak = i + 1;
            var name1 = "month_" + lak;

            console.log("AYYY", json2.response[name1]);
            if (json2.response[name1]) {
              console.log("Lela_lak", json2.response[name1].resolved);

              data_r[i] = json2.response[name1].resolved;
              data_sp[i] = json2.response[name1].spam_status;
              data_unr[i] = json2.response[name1].unresolved;
            } else {
              console.log("NO Report Exist on this Month ");

              continue;
            }
          }

          setDataResolved(data_r);
          setSpamData(data_sp);
          setUnresolved(data_unr);

          console.log("data_unresolved", data_unr);
          console.log("data_spam", data_sp);

          console.log("data_r", data_r);
        } else {
          setIsEmpty(true);
        }

        const response = await fetch(url1, requestOptions);

        const json = await response.json();

        setSectors(json.count);
        //
        setSectorsInfo(json.sectors);
        console.log("Sectors: ", json.count);
      } catch (error) {
        console.log("error", error);
      }
      setTimeout(() => {
        setIsLoading(false);
        // setError(true);
      }, 1500);
    };

    fetchData();
  }, []);
  const iconName = ["trending_up", "groups", "poll", "groups"];
  const iconColor = ["pink", "blue", "green", "red"];
  return isLoading ? (
    <div class="ml-32  ">
      <div class="md:ml-64 flex items-center h-screen ">
        <Loader />
      </div>
    </div>
  ) : (
    <>
      <Sidebar />
      {role == 2 && (
        <>
          <div className="bg-[#DEB887] px-3 md:px-8 h-40" />

          <div className="px-3 md:px-8 -mt-24">
            <div className="px-3 md:px-8">
              <div className="container mx-auto max-w-full">
                {sectors && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 mb-4">
                    {Object.keys(sectors).map((oneKey, i) => {
                      return (
                        <StatusCard
                          color={iconColor[i]}
                          icon={iconName[i]}
                          title={sectors[oneKey][1]}
                          amount={sectors[oneKey][0]}
                          percentage="3.48"
                          percentageIcon="arrow_upward"
                          percentageColor="green"
                          date="Since last month"
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="container mx-auto max-w-full">
              <div className="grid grid-cols-1 xl:grid-cols-5">
                <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14">
                  {/* <ChartLine /> */}
                  {data_resolved && data_spam && data_unresolved && (
                    <ReportChart
                      resolved={data_resolved}
                      spam={data_spam}
                      unresolved={data_unresolved}
                    />
                  )}
                  {/* {res && res.month_5 && res.month_5.resolved && (
                    <div data-cy="ann-data">
                      <p>Number of resolved : {res.month_5.resolved}</p>
                      <p>Number of unresolved : {res.month_5.unresolved}</p>
                      <p>Number of spam : {res.month_5.spam_status}</p>
                    </div>
                  )} */}
                </div>

                {/* <div className="xl:col-start-4 xl:col-end-6 px-4 mb-14">
                      <PageVisitsCard />
                  </div> */}
              </div>
            </div>
          </div>

          {sectorsInfo && (
            <div className="px-3 md:px-8 h-auto">
              <div className="container mx-auto max-w-full">
                <div className="grid grid-cols-1 xl:grid-cols-1">
                  <CardTable sectors={sectorsInfo} />
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <Footer />
    </>
  );
}
