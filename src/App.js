import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "components/Sidebar";
import Dashboard from "pages/Dashboard";
import AnnouncementList from "components/sector/Announcement/AddAnnouncement";
import SectorDash from "pages/SectorAdmin/Dashboard";
import Announcement from "pages/SectorAdmin/Announcement";

import Settings from "pages/Settings";
import Tables from "pages/Tables";
import Dash from "pages/Admin/Dash";
import Maps from "pages/Maps";
import Footer from "components/Footer";
import User from "pages/userList";
import Report from "pages/report";
import Contact from "pages/contactUs";

import "assets/styles/tailwind.css";
import AdminSector from "pages/Admin/Sector";
import ReportAdmin from "pages/Admin/report";

import ReportShow from "components/report/ReportShow";
import Register from "pages/SectorAdmin/register";
import LogInSectorAdmin from "pages/SectorAdmin/login";
import LogIn from "pages/Admin/login";
import PageVisitsCard from "components/report/ReportDetail";
import RequireAuth from "components/RequireAuth";
import UnAuthorized from "components/sector/shared/unauthorized";
import Notification from "pages/notification";
// import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import {
  getRol,
  isAuthenticated,
  isSectorAdmin,
  isSuperAdmin,
  setRole,
} from "./helpers/utils";

import jwt_decode from "jwt-decode";
import Help from "pages/help";
import MapSingle from "components/report/singleReportMap";
import UserDetail from "components/user/userDetail";
import PasswordReset from "pages/passwordreset";
import ChangePassword from "pages/changePass";
import ChangePasswordR from "pages/changePass";
import { AnnContextProvider } from "context/annProvider";
// import Authorization from "RequireAuth";

function App() {
  const h = getRol(localStorage.getItem("token"));

  const [role, setRol] = useState(h);
  useEffect(() => {
    setRol(getRol(localStorage.getItem("token")));
  });
  console.log(getRol());
  const locations = {
    lat: 9.038,
    lng: 38.7618,
  };
  return (
    <>
      {/* <Sidebar /> */}

      <div className="md:ml-64">
        <Routes>
          <Route element={<RequireAuth allowedRoles={[1]} />}>
            <Route exact path="/admin/sectors" element={<AdminSector />} />
            <Route exact path="/admin/dashboard" element={<Dash />} />
            <Route exact path="/admin/report" element={<ReportAdmin />} />
            <Route exact path="/users/:id" element={<UserDetail />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[2]} />}>
            <Route exact path="/sector/dashboard" element={<SectorDash />} />

            <Route
              exact
              path="/announcement"
              element={
                <AnnContextProvider>
                  <Announcement />{" "}
                </AnnContextProvider>
              }
            />

            <Route exact path="/ayy" element={<AnnouncementList />} />
            <Route exact path="/sector/reports" element={<Report />} />

            <Route exact path="/sectors/dashboard" element={<SectorDash />} />
            <Route exact path="/maps" element={<Maps />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[1, 2]} />}>
            {role == 1 ? (
              <Route path="/" element={<Dash />} />
            ) : (
              <Route path="/" element={<SectorDash />} />
            )}
            <Route
              exact
              path="/sector/reports/:id"
              element={<PageVisitsCard />}
            />
            <Route exact path="/tables" element={<Tables />} />
            <Route exact path="/users" element={<User />} />

            <Route exact path="/profile" element={<Settings />} />
          </Route>
          <Route exact path="/help" element={<Help />} />
          <Route exact path="/login" element={<LogInSectorAdmin />} />
          <Route exact path="/unauthorized" element={<UnAuthorized />} />
          <Route exact path="/notification" element={<Notification />} />
          <Route
            exact
            path="/single"
            element={<MapSingle id={1} location={locations} />}
          />
          <Route exact path="/register/" element={<Register />} />
          <Route exact path="/contact/" element={<Contact />} />
          <Route exact path="/password-reset/" element={<PasswordReset />} />
          <Route
            exact
            path="/password-reset-confirm/"
            element={<ChangePasswordR />}
          />

          <Route exact path="*" element={<LogIn />} />
          {/* <Footer /> */}
        </Routes>
      </div>
      {/* </ThemeProvider> */}
    </>
  );
}

export default App;
