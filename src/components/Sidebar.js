import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import Icon from "@material-tailwind/react/Icon";
import H6 from "@material-tailwind/react/Heading6";
import { isSectorAdmin, isSuperAdmin } from "helpers/utils";
import { getName } from "helpers/utils";
import { getRol } from "helpers/utils";

export default function Sidebar() {
  const [isAdmin, setAdmin] = useState(getRol(localStorage.getItem("token")));
  const [showSidebar, setShowSidebar] = useState("-left-64");
  useEffect(() => {
    setAdmin(getRol(localStorage.getItem("token")));
  }, [isAdmin]);

  return (
    <>
      <AdminNavbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div
        className={`h-screen fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-64 z-10 py-4 px-6 transition-all duration-300`}
      >
        <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
          <a
            // href="https://material-tailwind.com?ref=mtd"
            target="_blank"
            rel="noreferrer"
            className="mt-2 text-center w-full inline-block uppercase"
          >
            {isAdmin === 1 ? (
              <H6 color="gray">Fix My City</H6>
            ) : (
              <H6 color="gray" className="uppercase">
                {getName(localStorage.getItem("token"))}
              </H6>
            )}
          </a>
          <div className="flex flex-col">
            <hr className="my-4 min-w-full" />

            <ul className="flex-col min-w-full flex list-none">
              {isAdmin === 1 && (
                <li className="rounded-lg mb-4">
                  <NavLink
                    to="/admin/dashboard"
                    exact
                    className="hover:text-red-100 bg-[#63453b] flex bg-[#471f1f]  items-center gap-4 text-sm text-white-700 font-light px-4 py-3 rounded-lg"
                    activeClassName="text-white-100  bg-[#471f1f]  hover:text-red-100 bg-red-700"
                  >
                    <Icon name="dashboard" size="2xl" />
                    Dashboard
                  </NavLink>
                </li>
              )}
              {isAdmin !== 1 && (
                <li className="rounded-lg mb-2 text-gray-700">
                  <NavLink
                    to="/sectors/dashboard"
                    className="hover:text-red-100 bg-[#63453b] flex bg-[#471f1f]  items-center gap-4 text-sm text-white-700 font-light px-4 py-3 rounded-lg"
                    activeClassName="text-white-100  bg-[#471f1f]  hover:text-red-100 bg-red-700"
                  >
                    <Icon name="map" size="2xl" />
                    Sector Dashboard
                  </NavLink>
                </li>
              )}
              {isAdmin === 1 && (
                <li className="rounded-lg mb-4">
                  <NavLink
                    to="/admin/sectors"
                    exact
                    className="hover:text-red-100 bg-[#63453b] flex bg-[#471f1f]  items-center gap-4 text-sm text-white-700 font-light px-4 py-3 rounded-lg"
                    activeClassName="text-white-100  bg-[#471f1f]  hover:text-red-100 bg-red-700">
                    <Icon name="home" size="2xl" />
                    Sector
                  </NavLink>
                </li>
              )}
              {isAdmin === 1 && (
                <li className="rounded-lg mb-2 ">
                  <NavLink
                    data-cy="nav-users"
                    to="/users"
                    className="hover:text-red-100 bg-[#63453b] flex bg-[#471f1f]  items-center gap-4 text-sm text-white-700 font-light px-4 py-3 rounded-lg"
                    activeClassName="text-white-100  bg-[#471f1f]  hover:text-red-100 bg-red-700"
                  >
                    <Icon name="toc" size="2xl" />
                    Users
                  </NavLink>
                </li>
              )}
              {isAdmin === 1 && (
                <li className="rounded-lg mb-2 text-gray-700">
                  <NavLink
                    data-cy="nav-reports"
                    to="/admin/report"
                    className="hover:text-red-100 bg-[#63453b] flex bg-[#471f1f]  items-center gap-4 text-sm text-white-700 font-light px-4 py-3 rounded-lg"
                    activeClassName="text-white-100  bg-[#471f1f]  hover:text-red-100 bg-red-700"
                  >
                    <Icon name="map" size="2xl" />
                    Report
                  </NavLink>
                </li>
              )}{" "}
              {isAdmin !== 1 && (
                <li className="rounded-lg mb-2 text-gray-700">
                  <NavLink
                    data-cy="nav-reports"
                    to="/sector/reports"
                    className="hover:text-red-100 bg-[#63453b] flex bg-[#471f1f]  items-center gap-4 text-sm text-white-700 font-light px-4 py-3 rounded-lg"
                    activeClassName="text-white-100  bg-[#471f1f]  hover:text-red-100 bg-red-700"
                  >
                    <Icon name="map" size="2xl" />
                    Report
                  </NavLink>
                </li>
              )}
              <li className="rounded-lg mb-2">
                <NavLink
                  to="/profile"
                  className="hover:text-red-100 bg-[#63453b] flex bg-[#471f1f]  items-center gap-4 text-sm text-white-700 font-light px-4 py-3 rounded-lg"
                  activeClassName="text-white-100  bg-[#471f1f]  hover:text-red-100 bg-red-700"
                  data-cy="nav-profile"
                >
                  <Icon name="circle" size="2xl" />
                  Profile
                </NavLink>
              </li>
              {isAdmin !== 1 && (
                <li className="rounded-lg mb-2 ">
                  <NavLink
                    data-cy="nav-announcement"
                    to="/announcement"
                    className="hover:text-red-100 bg-[#63453b] flex bg-[#471f1f]  items-center gap-4 text-sm text-white-700 font-light px-4 py-3 rounded-lg"
                    activeClassName="text-white-100  bg-[#471f1f]  hover:text-red-100 bg-red-700"
                  >
                    <Icon name="toc" size="2xl" />
                    Announcement
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* </div> */}
    </>
  );
}
