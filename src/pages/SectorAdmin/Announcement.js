import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import AnnouncementList from "components/sector/Announcement/AnnouncementList";
import AddAnnouncement from "components/sector/Announcement/AddAnnouncement";
import Loader from "components/sector/shared/loader";
import ErrorPage2 from "components/sector/shared/errorPage2";
import UnAuthorized from "components/sector/shared/unauthorized";
import Sidebar from "components/Sidebar";
import Footer from "components/Footer";
import { url } from "helpers/strings";
import { Trans } from "react-i18next";

export default function Announcement() {
  const [showModal, setShowModal] = React.useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [unAuth, setAnuth] = useState(false);

  const [announcements, setAnn] = useState({});

  useEffect(() => {
    // mounted.current = true;
    const url1 = `${url}/v1/announcment/getOwnAnnouncment/`;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };
        const response = await fetch(url1, requestOptions);

        const json = await response.json();

        if (response.ok) {
          console.log(json);
          setAnn(json);
          // console.log(announcements.length);
        }

        if (json.status === 401) {
          setAnuth(true);
        }
        // console.log("announcements: ", json.results);
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

  return (
    <>
      <>
        <Sidebar />
        <div className="bg-[#DEB887] px-3 md:px-8 h-10" />
        <div className="container mt-10 max-w-full ">
          <div className="grid grid-cols-1 xl:grid-cols-1">
            <div className="xl:col-start-2 xl:col-end-2 px-3 mb-14 mr-8">
              <Button
                className="flex justify-center"
                onClick={(e) => setShowModal(true)}
                data-cy="btn-add-announcement"
                color="brown"
              >
                <Trans i18nKey="announcement.postAnnouncement">
                  Post Announcement
                </Trans>{" "}
              </Button>
            </div>
            <AddAnnouncement isActive={showModal} setIsActive={setShowModal} />
            {announcements && announcements.length === 0 ? (
              <div>No Data</div>
            ) : (
              <AnnouncementList announcements={announcements} />
            )}
          </div>
        </div>
      </>
      <Footer />
      {/* } */}
    </>
  );
  // isLoading ? (
  //   <div class="flex justify-center items-center h-screen">
  //     <Loader />
  //   </div>
  // ) :
}
