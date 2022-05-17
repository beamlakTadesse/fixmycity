// import React, {useState, useEffect} from "react";
// import ReportDetail from "components/report/ReportDetail";
// import ReportInfo from "components/report/ReportInfo";
// import { useParams } from "react-router-dom";

// export default function ReportDet() {
//     let { id } = useParams()
//     const [mydata ,setData]= useState([]);

// useEffect(() => {
//   // mounted.current = true;
//   const url = `http://localhost:8000/v1/report/${id}`;


//   const fetchData = async () => {
//     try {
//       const response = await fetch(url);
     
//       const json = await response.json();
//       setData(json);
       
//       console.log("Sectors: ", json[0].id);
//     } catch (error) {
//       console.log("error", error);
//     }
//   };

//     fetchData();

// }, []);
//     return(

//         <div className = "flex  mb-5 " >
//             <ReportDetail data={mydata}/>
//             <ReportInfo data={mydata}/>
//         </div>
//     );
// }