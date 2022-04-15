import ReportDetail from "components/sector/ReportDetail";
import ReportInfo from "components/sector/ReportInfo";

export default function Report() {
    return(
        <div flex m-5 h-screen shrink>
            <ReportDetail/>
            <ReportInfo/>
        </div>
    );
}