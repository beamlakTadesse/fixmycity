import ReportDetail from "components/sector/ReportDetail";
import ReportInfo from "components/sector/ReportInfo";

export default function Report() {
    return(
        <div className = "flex  h-screen shrink " style={{backgroundColor: 'rgb(226 232 240)'}}>
            <ReportDetail/>
            <ReportInfo/>
        </div>
    );
}