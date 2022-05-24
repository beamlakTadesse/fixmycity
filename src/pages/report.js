import StatusCard from "components/StatusCard";
import MapExample from "components/MapExample";
import UserTable from "components/user/userTable";
import TabsRender from "components/tabs";
import ReportShow from "components/report/ReportShow";
import Sidebar from "components/Sidebar";
import Footer from "components/Footer";

export default function Report() {
  return (
    <>
      <Sidebar />
      <ReportShow />
      <Footer />
      {/* <UserTable /> */}
    </>
  );
}
