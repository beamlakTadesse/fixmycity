import { Switch, Route, Redirect } from 'react-router-dom';
import Sidebar from 'components/Sidebar';
import Dashboard from 'pages/Dashboard';
import SectorDash from 'pages/SectorAdmin/Dashboard';
import Settings from 'pages/Settings';
import Tables from 'pages/Tables';
import Dash  from 'pages/Admin/Dash';
import Maps from 'pages/Maps';
import Footer from 'components/Footer';

// Tailwind CSS Style Sheet
import 'assets/styles/tailwind.css';
import Sector from 'pages/Admin/Sector';

function App() {
    return (
        <>
        
            <Sidebar />
            <div className="md:ml-64">
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route exact path="/settings" component={Settings} />
                    <Route exact path="/tables" component={Tables} />
                    <Route exact path="/maps" component={Maps} />
                    <Route exact path="/admin/sectors" component={Sector} />
                    <Route exact path='/admin/dashboard' component={Dash}/>
                    <Route exact path='/sectors/dashboard' component={SectorDash}/>
                    <Redirect from="*" to="/" />
                </Switch>
                <Footer />
            </div>
        </>
    );
}

export default App;
