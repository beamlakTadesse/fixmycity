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

import "assets/styles/tailwind.css";
import Sector from "pages/Admin/Sector";
import ReportShow from "components/report/ReportShow";
import Register from "pages/SectorAdmin/register";
import LogInSectorAdmin from "pages/SectorAdmin/login";
import LogIn from "pages/Admin/login";
import PageVisitsCard from "components/report/ReportDetail";
import RequireAuth from "components/RequireAuth";
// import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import {
  getRole,
  isAuthenticated,
  isSectorAdmin,
  isSuperAdmin,
  setRole,
} from "./helpers/utils";

import jwt_decode from "jwt-decode";
// import Authorization from "RequireAuth";

function App() {
  return (
    <>
      {/* <Sidebar /> */}

      <div className="md:ml-64">
        <Routes>
          <Route element={<RequireAuth allowedRoles={[1]} />}>
            <Route path="/" element={<Dash />} />
            <Route exact path="/admin/sectors" element={<Sector />} />
            <Route exact path="/admin/dashboard" element={<Dash />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[2]} />}>
            <Route exact path="/announcement" element={<Announcement />} />
            <Route exact path="/ayy" element={<AnnouncementList />} />
            <Route exact path="/sector/reports" element={<Report />} />
            <Route exact path="/report_show/:id" element={<PageVisitsCard />} />

            <Route exact path="/sectors/dashboard" element={<SectorDash />} />
            <Route exact path="/maps" element={<Maps />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[1, 2]} />}>
            <Route exact path="/tables" element={<Tables />} />
            <Route exact path="/users" element={<User />} />

            <Route exact path="/settings" element={<Settings />} />
          </Route>
          {/* {isAuthenticat && (
            <Route exact path="/settings" element={<Settings />} />
          )}
          {isAuthenticat && <Route exact path="/tables" element={<Tables />} />}
          {isAuthenticat && <Route exact path="/maps" element={<Maps />} />} */}
          {/* {isAuthenticat && isAdmin && (
            <Route exact path="/admin/sectors" element={<Sector />} />
          )} */}
          {/* {isAuthenticat && isAdmin && (
            <Route exact path="/admin/dashboard" element={<Dash />} />
          )} */}
          {/* {isAuthenticat && !isAdmin && (
            <Route exact path="/sectors/dashboard" element={<SectorDash />} />
          )}
          {isAuthenticat && (
            <Route exact path="/announcement" element={<Announcement />} />
          )}
          {isAuthenticat && (
            <Route exact path="/ayy" element={<AnnouncementList />} />
          )}
          {isAuthenticat && (
            <Route exact path="/sectors" element={<Sector />} />
          )}
          {isAuthenticat && <Route exact path="/users" element={<User />} />}
          {isAuthenticat && (
            <Route exact path="/sector/reports" element={<Report />} />
          )}
          {isAuthenticat && (
            <Route exact path="/report_show/:id" element={<PageVisitsCard />} />
          )} */}
          <Route exact path="/login" element={<LogIn />} />
          <Route exact path="/sector/login" element={<LogInSectorAdmin />} />
          <Route exact path="/register/" element={<Register />} />
          <Route exact path="*" element={<LogIn />} />
          {/* <Footer /> */}
        </Routes>
      </div>
      {/* </ThemeProvider> */}
    </>
  );
}

export default App;
