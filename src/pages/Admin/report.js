import StatusCard from "components/StatusCard";
import MapExample from "components/MapExample";
import UserTable from "components/user/userTable";
import TabsRender from "components/tabs";
import ReportShowAdmin from "components/report/reportShowAdmin";
import Sidebar from "components/Sidebar";
import Footer from "components/Footer";

export default function ReportAdmin() {
  return (
    <>
      <Sidebar />
      <ReportShowAdmin />
      <Footer />
      {/* <UserTable /> */}
    </>
  );
}
