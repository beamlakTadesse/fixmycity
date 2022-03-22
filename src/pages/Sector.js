
// import DefaultFooter from '../components/DefaultFooter';
// import DefaultNavbar from '../components/DefaultNavbar';

import SectorsSection from '../components/sector/sectorsList';

export default function Sector() {
    return (
        <>
            <div className="absolute w-full z-20">
                {/* <DefaultNavbar /> */}
            </div>
            <main>
                <SectorsSection />
            </main>
            {/* <DefaultFooter /> */}
        </>
    );
}

