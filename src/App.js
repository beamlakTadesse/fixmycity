import { Switch, Route, Redirect } from 'react-router-dom';
import Sidebar from 'components/Sidebar';
import Dashboard from 'pages/Dashboard';
import AnnouncementList from 'components/sector/Announcement/AddAnnouncement';
import SectorDash from 'pages/SectorAdmin/Dashboard';
import Announcement from 'pages/SectorAdmin/Announcement';

import Settings from 'pages/Settings';
import Tables from 'pages/Tables';
import Dash  from 'pages/Admin/Dash';
import Maps from 'pages/Maps';
import Footer from 'components/Footer';
import User from 'pages/userList';
import Report from 'pages/report';
import 'bootstrap/dist/css/bootstrap.min.css'
// import ReportTableChart from 'components/sector/ReportTable';
// Tailwind CSS Style Sheet
import 'assets/styles/tailwind.css';
import Sector from 'pages/Admin/Sector';
// import CollapsibleTable from 'components/sector/NewTable';
import ReportShow from 'components/report/ReportShow';
import PageVisitsCard from 'components/report/ReportDetail';
import ReportDet from 'components/report/ReportDetail';
import { ThemeProvider, CSSReset } from '@chakra-ui/core'

// import SpamReportTable from 'components/report/spamReport/spamReportTable';
// import ReportDet from 'pages/Report';

function App() {
    return (
        <ThemeProvider>
        
            <CSSReset />
            
            <Sidebar />
            <div className="md:ml-64">
                <Switch>
                    <Route exact path="/" component={Dash} />
            
                    <Route exact path="/settings" component={Settings} />
                    <Route exact path="/tables" component={Tables} />
                    <Route exact path="/maps" component={Maps} />

                    <Route exact path="/admin/sectors" component={Sector} />
                    <Route exact path='/admin/dashboard' component={Dash}/>
                    <Route exact path='/sectors/dashboard' component={SectorDash}/>
                    <Route exact path='/sector/announcement' component={Announcement}/>
                    <Route exact path='/ayy' component={AnnouncementList}/>
                    <Route exact path="/sectors" component={Sector} />
                    <Route exact path="/users" component={User} />


                    <Route exact path="/sector/reports" component={Report} />
                    <Route exact path="/sector/reportdetail/:id" component={ReportDet} />
                    {/* <Route exact path="/sector/spam" component={SpamReportTable} /> */}

                    <Redirect from="*" to="/" />
                </Switch>
                <Footer />
            </div>
            </ThemeProvider>
            

    );
}

export default App;
