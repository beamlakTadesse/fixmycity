import { Switch, Route, Redirect } from "react-router-dom";
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
// import ReportTableChart from 'components/sector/ReportTable';
// Tailwind CSS Style Sheet
import "assets/styles/tailwind.css";
import Sector from "pages/Admin/Sector";
// import CollapsibleTable from 'components/sector/NewTable';
import ReportShow from "components/report/ReportShow";
import PageVisitsCard from "components/report/ReportDetail";
import LogIn from "pages/Admin/login";
import Register from "pages/SectorAdmin/register";
import { isAuthenticated } from "./helpers/utils";
function App() {
  return (
    <>
      {/* <Sidebar /> */}

      <div className="md:ml-64">
        <Switch>
          {isAuthenticated() && <Route exact path="/" component={Dash} />}

          {isAuthenticated() &&  <Route exact path="/settings" component={Settings} />}
          {isAuthenticated() &&  <Route exact path="/tables" component={Tables} />}
          {isAuthenticated() &&  <Route exact path="/maps" component={Maps} />}

          {isAuthenticated() &&   <Route exact path="/admin/sectors" component={Sector} />}
          {isAuthenticated() &&    <Route exact path="/admin/dashboard" component={Dash} />}
          {isAuthenticated() &&     <Route exact path="/sectors/dashboard" component={SectorDash} />}
          {isAuthenticated() &&     <Route exact path="/announcement" component={Announcement} />}
          {isAuthenticated() &&     <Route exact path="/ayy" component={AnnouncementList} />}
          {isAuthenticated() &&     <Route exact path="/sectors" component={Sector} />}
          {isAuthenticated() &&   <Route exact path="/users" component={User} />}
          {isAuthenticated() &&   <Route exact path="/sector/reports" component={Report} />}
          {isAuthenticated() &&   <Route exact path="/report_show/:id" component={PageVisitsCard} />}
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/register/" component={Register} />

          <Redirect from="*" to="/login" />

          {/* <Footer /> */}
        </Switch>
      </div>
    </>
  );
}

export default App;
