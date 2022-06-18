import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Image from "@material-tailwind/react/Image";
import Progress from "@material-tailwind/react/Progress";
import Team1 from "assets/img/team-1-800x800.jpg";
import Team2 from "assets/img/team-2-800x800.jpg";
import Team3 from "assets/img/team-3-800x800.jpg";
import Team4 from "assets/img/team-4-470x470.png";
import Sidebar from "components/Sidebar";
import Footer from "components/Footer";
export default function Notification() {
  return (
    <div>
      <Sidebar />
      <Card>
        <CardHeader color="brown" contentPosition="left">
          <h2 data-cy="not-tbl" className="text-white text-2xl">
            Notification
          </h2>
        </CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="items-center  w-full bg-transparent border-collapse">
              <thead className="border-b bg-gray-800">
                <tr>
                  <th className="px-2 text-white align-middle border-r border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                    Title
                  </th>
                  <th className="px-2 text-white align-middle border-r border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                    Content
                  </th>
                  <th className="px-2 text-white align-middle border-r border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                    Date
                  </th>
                  <th className="px-2 text-white align-middle border-r border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                    Posted By
                  </th>
                  {/* <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                    Completion
                                </th> */}
                </tr>
              </thead>
              <tbody>
                <tr data-cy="tbl-notif">
                  <th className="border-b border-r border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                    Argon Design System
                  </th>
                  <th className="border-b border-r border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                    $2,500 USD
                  </th>
                  <th className="border-b border-r border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                    <i className="fas fa-circle fa-sm text-orange-500 mr-2"></i>{" "}
                    pending
                  </th>

                  <th className="border-b border-r border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                    Mish Assefa
                  </th>
                </tr>
                <tr>
                  <th className="border-b border-r border-r border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                    Black Dashboard Sketch
                  </th>
                  <th className="border-b border-r border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                    $1,800 USD
                  </th>
                  <th className="border-b border-r border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                    <i className="fas fa-circle fa-sm text-blue-gray-900 mr-2"></i>{" "}
                    completed
                  </th>

                  <th className="border-b border-r border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                    Mish Assefa
                  </th>
                </tr>
                <tr>
                  <th className="border-b border-r border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                    React Material Dashboard
                  </th>
                  <th className="border-b border-r border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                    $4,400 USD
                  </th>
                  <th className="border-b border-r border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                    <i className="fas fa-circle fa-sm text-teal-500 mr-2"></i>{" "}
                    on schedule
                  </th>

                  <th className="border-b border-r border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                    Mish Assefa
                  </th>
                </tr>
                <tr>
                  <th className="border-b border-r border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                    React Material Dashboard
                  </th>
                  <th className="border-b border-r border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                    $2,200 USD
                  </th>
                  <th className="border-b border-r border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                    <i className="fas fa-circle fa-sm text-blue-gray-900 mr-2"></i>{" "}
                    completed
                  </th>

                  <th className="border-b border-r border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                    Mish Assefa
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
      <Footer />
    </div>
  );
}
