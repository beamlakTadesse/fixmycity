import { Switch, Route, Redirect } from 'react-router-dom';
import Sidebar from 'components/Sidebar';
import Dashboard from 'pages/Dashboard';
import SectorDash from 'pages/SectorAdmin/Dashboard';
import Settings from 'pages/Settings';
import Tables from 'pages/Tables';
import Dash  from 'pages/Admin/Dash';
import Maps from 'pages/Maps';
import Footer from 'components/Footer';
import User from 'pages/userList';
import Report from 'pages/Report';

// Tailwind CSS Style Sheet
import 'assets/styles/tailwind.css';
import Sector from 'pages/Admin/Sector';

function App() {
    return (
        <>

            <Sidebar />
            <div className="md:ml-64">
                <Report/>
                <Footer />
            </div>
        </>
    );
}

export default App;
