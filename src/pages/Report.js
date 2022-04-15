import ReportDetail from "components/sector/ReportDetail";
import ReportInfo from "components/sector/ReportInfo";

export default function Report() {
    return(
        <div className = "flex  mb-5 " >
            <ReportDetail/>
            <ReportInfo/>
        </div>
    );
}