import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Image from "@material-tailwind/react/Image";
import Progress from "@material-tailwind/react/Progress";
import Team1 from "assets/img/team-1-800x800.jpg";
import Team2 from "assets/img/team-2-800x800.jpg";
import Team3 from "assets/img/team-3-800x800.jpg";
import Team4 from "assets/img/team-4-470x470.png";
import { Trans } from "react-i18next";

export default function CardTable({ sectors }) {
  return (
    <Card>
      <CardHeader color="brown" contentPosition="left">
        <h2 className="text-white text-2xl">
          <Trans i18nKey="sectorDashboard.SectorAdmin"> Sector Admin</Trans>
        </h2>
      </CardHeader>
      <CardBody>
        {sectors && (
          <div className="overflow-x-auto">
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className="px-2 text-brown align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                    <Trans i18nKey="sectorDashboard.BranchName">
                      {" "}
                      Branch Name
                    </Trans>
                  </th>
                  <th className="px-2 text-brown align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                    <Trans i18nKey="profile.email"> Email</Trans>
                  </th>
                  <th className="px-2 text-brown align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                    <Trans i18nKey="profile.phone"> Phone</Trans>
                  </th>
                  {/* <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                    user profile
                                </th> */}
                  <th className="px-2 text-brown align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                    <Trans i18nKey="reportDetail.location"> Location</Trans>
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(sectors).map((oneKey, i) => {
                  return (
                    <tr>
                      <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                        {sectors[oneKey].district_name}
                      </th>
                      <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                        <a href={`mailto:${sectors[oneKey].email}`}>
                          {sectors[oneKey].email}
                        </a>
                      </th>
                      <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                        <i className="fas fa-circle fa-sm text-orange-500 mr-2"></i>{" "}
                        <a href={`tel:${sectors[oneKey].phone_number}`}>
                          {sectors[oneKey].phone_number}
                        </a>
                      </th>
                      {/* <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    <div className="flex">
                                        <div className="w-10 h-10 rounded-full border-2 border-white">
                                            <Image
                                                src={Team1}
                                                rounded
                                                alt="..."
                                            />
                                        </div> <div>
                                </th>
                                 */}
                      <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                        {sectors[oneKey].address}
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
