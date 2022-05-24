// import DefaultFooter from '../components/DefaultFooter';
// import DefaultNavbar from '../components/DefaultNavbar';

// import SectorsSection from '../../components/sector/sectorsList';
import SectorsSection from "components/sector/sectorsList";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

export default function Sector() {
  return (
    <>
      <Sidebar />
      <div className="absolute w-full z-20">
        <main>
          <SectorsSection />
        </main>
      </div>

      <Footer />
    </>
  );
}
