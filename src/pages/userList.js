import UserTable from "../components/user/userTable";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
export default function User() {
  return (
    <>
      <Sidebar />
      <div className="absolute w-full z-20"></div>
      <main>
        <UserTable />
      </main>
      <Footer />
    </>
  );
}
