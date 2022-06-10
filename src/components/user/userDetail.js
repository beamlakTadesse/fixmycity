import StatusCard from "components/StatusCard";
import SettingsForm from "components/SettingsForm";
import ProfileCard from "components/ProfileCard";
import { useState, useEffect, useCallback } from "react";
import Sidebar from "components/Sidebar";
import Footer from "components/Footer";
import ChangePasswordCard from "components/changePassword";
import Card from "@material-tailwind/react/Card";
import Image from "@material-tailwind/react/Image";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";
import { url } from "helpers/strings";
import { getUserId } from "helpers/utils";
import { useParams } from "react-router-dom";
export default function UserDetail() {
  let { id } = useParams();
  const [editProfile, setEditProfile] = useState(false);
  const [users, setUsers] = useState({});
  const [reports, setReport] = useState({});
  const token = localStorage.getItem("token");
  const [image, setImage] = useState("");

  const userId = getUserId(token);
  const url1 = `${url}/v1/admins/users/` + id;
  const url2 = `${url}/v1/report_by_user/` + id;
  const fetchData = async () => {
    try {
      const response = await fetch(url1);

      const json = await response.json();

      if (json) {
        //  setU(json.user)
        // if(!isEqual(users,u)){
        setUsers(json.user);
        setImage(
          `http://res.cloudinary.com/shetechs/${json.user.ProfileImage}`
        );
        // }
      }
    } catch (error) {
      console.log("error", error);
    }
    setTimeout(() => {}, 1500);
  };

  const fetchReportData = async () => {
    try {
      const response = await fetch(url2);

      const json = await response.json();
      console.log(json);
      if (json) {
        setReport(json);
      }
    } catch (error) {
      console.log("error", error);
    }
    setTimeout(() => {}, 1500);
  };

  const loadUserFromServer = useCallback(async () => {
    fetchData();
    fetchReportData();
  }, []); //

  useEffect(() => {
    loadUserFromServer();
  }, [loadUserFromServer]);

  return (
    <>
      <Sidebar />
      <div className="bg-[#DEB887] pt-14 pb-28 px-3 md:px-8 h-auto"></div>

      <div className="px-3 md:px-8 h-auto -mt-24">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 xl:grid-cols-6">
            <div className="xl:col-start-1 xl:col-end-4 px-4 mb-16">
              <>
                {users && (
                  <Card>
                    <div className="flex flex-wrap justify-center">
                      <div className="w-48 px-4 -mt-24">
                        <Image src={image} rounded raised />
                      </div>
                    </div>

                    <CardBody>
                      <h6
                        data-cy="profile-info"
                        className="text-brown text-sm mt-9 mb-6 font-bold uppercase"
                      >
                        personal Information
                      </h6>

                      <div className="flex flex-wrap text-xs mt-10">
                        {users.first_name && users.last_name && (
                          <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                            <h1>Full name </h1>
                            <h1>
                              {users.first_name} {users.last_name}
                            </h1>
                          </div>
                        )}
                        {users.username && (
                          <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                            <h1>Username : </h1>
                            <h1>{users.username}</h1>
                          </div>
                        )}
                        {users.email && (
                          <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                            <h1>Email : </h1>
                            <h1>{users.email}</h1>
                          </div>
                        )}
                        {users.location && (
                          <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                            <h1>Location :</h1>
                            <h1> Addis Ababa / Ethiopia</h1>
                          </div>
                        )}
                        <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                          <h1>Phone No. : </h1>
                          <h1>{users.phone_number}</h1>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                )}
              </>
            </div>

            {editProfile && (
              <div className="xl:col-start-4 xl:col-end-7 px-4 mb-16 ">
                <SettingsForm
                  editProfile={editProfile}
                  setEditProfile={setEditProfile}
                />
              </div>
            )}
            <div className="xl:col-start-1 xl:col-end-2 px-4 mb-16">
              {reports.length != 0 ? (
                <table className="items-center w-full bg-transparent border-collapse">
                  <thead className="border-b bg-gray-800">
                    <tr>
                      <th className="px-2 text-white align-middle border-r border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                        Image
                      </th>
                      <th className="px-2 text-white align-middle border-r border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                        Description
                      </th>
                      <th className="px-2 text-white align-middle border-r border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                        Sector
                      </th>
                      <th className="px-2 text-white align-middle border-r border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                        Spam Status
                      </th>
                      <th className="px-2 text-white align-middle border-r border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                        Report Status
                      </th>
                      <th className="px-2 text-white align-middle border-r  border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                        Posted Date
                      </th>
                    </tr>
                  </thead>
                  {Object.keys(reports).map((oneKey, i) => {
                    return (
                      <tbody data-cy="tbl-user">
                        <tr>
                          {reports[oneKey].image && (
                            <>
                              <th className="border-b border-r border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                <Image src={reports[oneKey].image}></Image>
                              </th>
                              <th className="border-b border-r border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                {reports[oneKey].description}
                              </th>
                              {reports[oneKey].sector &&
                                reports[oneKey].sector.district_name && (
                                  <th className="border-b border-r border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    {reports[oneKey].sector.district_name}
                                  </th>
                                )}
                              <th className="border-b border-r border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                {reports[oneKey].spamStatus ? (
                                  <p className="px-3 py-1 camelcase leading-wide font-bold text-xs rounded-full shadow-sm bg-red-100 text-red-800 ">
                                    Spam
                                  </p>
                                ) : (
                                  <p className="px-3 py-1 camelcase leading-wide font-bold text-xs rounded-full shadow-sm bg-green-100 text-green-800">
                                    Non spam
                                  </p>
                                )}
                              </th>
                              <th className="border-b border-r border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                {reports[oneKey].status &&
                                reports[oneKey].status.startsWith(
                                  "RESOLVED"
                                ) ? (
                                  <p className="px-3 py-1 camelcase leading-wide font-bold text-xs rounded-full shadow-sm bg-green-100 text-green-800">
                                    RESOLVED
                                  </p>
                                ) : reports[oneKey].status.startsWith(
                                    "UNRESOLVED"
                                  ) ? (
                                  <p className="px-3 py-1 camelcase leading-wide font-bold text-xs rounded-full shadow-sm bg-yellow-100 text-yellow-800">
                                    UNRESOLVED
                                  </p>
                                ) : (
                                  <p className="px-3 py-1 camelcase leading-wide font-bold text-xs rounded-full shadow-sm bg-red-100 text-red-800">
                                    REJECTED
                                  </p>
                                )}
                              </th>
                              <th className="border-b border-r border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                {new Date(
                                  reports[oneKey].postedAt
                                ).toDateString()}
                              </th>
                            </>
                          )}
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
              ) : (
                <p className="flex justify-center">No Report yet</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
