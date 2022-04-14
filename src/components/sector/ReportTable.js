import React, { useMemo, useState, useEffect } from "react";
// import Table from "./ReportTableComponent";
import Table from "./Table2";
import { getData } from "helpers";
import { SelectColumnFilter } from "./SelectSectorFilter";
// import getData from '../../helpers/tabledata'

export default function ReportTableChart() {

const [mydata ,setData]= useState([]);

useEffect(() => {
  // mounted.current = true;
  const url = `http://localhost:8000/v1/report/`;


  const fetchData = async () => {
    try {
      const response = await fetch(url);
     
      const json = await response.json();
      const lela = []
        setData(json);
       
      console.log("Sectors: ", json[0].id);
    } catch (error) {
      console.log("error", error);
    }
  };

    fetchData();

}, [mydata]);

const columns = React.useMemo(
    () => [
      {
        Header: "Title",
        accessor: "id",
      },
      {
        Header: "PostedAt",
        accessor: "postedAt",
      },
      {
        id:"state",
        Header: "Status",
        accessor: d=>{
          if(d.state){
            return "Resolved"
          }else{
            return "Active"
          }},
        filterable: true,

        Filter: SelectColumnFilter, 
     
        filter: 'includes', 
      },
      {
        Header: "Reported to",
        accessor: "sector.district_name",
        // Filter: SelectColumnFilter,  // new
        filter: 'includes',  // new
      },
      
    ],
    []
  );

  
  const data = useMemo(() => getData(), []);
  return (

    // <div className="min-h-screen bg-gray-100 text-gray-900">
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      {/* <div className="">
        <h1 className="text-xl font-semibold">React Table + Tailwind CSS = ❤</h1>
      </div> */}
      <div className="mt-6">
        <Table columns={columns} data={mydata} />
      </div>
    </main>
  // </div>
    // <>
    //   <h1>Hello React!</h1>
    //   <div>
    //     <Table columns={columns} data={data} />
    //   </div>
    // </>
  );
}