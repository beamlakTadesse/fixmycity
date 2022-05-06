import React, {useEffect, useState} from 'react'

import Table, { AvatarCell,LelaCell,PostedAtCell, ReportStatusColumnFilter, SelectColumnFilter, StatusPill } from './Table'  // new



const getData = () => {
    const data = [
      {
        id:1,
        name: 'Jane Cooper',
        email: 'jane.cooper@example.com',
        title: 'Regional Paradigm Technician',
        department: 'Optimization',
        status: true,
        role: 'Admin',
        age: 27,
        imgUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
      },
      {
        id:2,
        name: 'Cody Fisher',
        email: 'cody.fisher@example.com',
        title: 'Product Directives Officer',
        department: 'Intranet',
        status: false,
        role: 'Owner',
        age: 43,
        imgUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
      },
      {
        id:3,
        name: 'Esther Howard',
        email: 'esther.howard@example.com',
        title: 'Forward Response Developer',
        department: 'Directives',
        status: true,
        role: 'Member',
        age: 32,
        imgUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
      },
      {
        id:4,
        name: 'Jenny Wilson',
        email: 'jenny.wilson@example.com',
        title: 'Central Security Manager',
        department: 'Program',
        status: true,
        role: 'Member',
        age: 29,
        imgUrl: 'https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
      },
      {
        id:4,
        name: 'Kristin Watson',
        email: 'kristin.watson@example.com',
        title: 'Lean Implementation Liaison',
        department: 'Mobility',
        status: true,
        role: 'Admin',
        age: 36,
        imgUrl: 'https://images.unsplash.com/photo-1532417344469-368f9ae6d187?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
      },
      {
        id:5,
        name: 'Cameron Williamson',
        email: 'cameron.williamson@example.com',
        title: 'Internal Applications Engineer',
        department: 'Security',
        status: false,
        role: 'Member',
        age: 24,
        imgUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
      },
    ]
    return [...data, ...data, ...data]
  }
  
function ReportShow() {

    
    const columns = React.useMemo(() => [
      {
        // Header: "Lela",
        accessor: 'image',
        Cell: LelaCell,
        // imgAccessor: "user.ProfileImage",
        // emailAccessor: "user.full_name",
        
        // idAccessor:"id",
      },
      {
        Header: "Name",
        accessor: 'user.first_name',
        Cell: AvatarCell,
        imgAccessor: "user.ProfileImage",
        emailAccessor: "user.first_name",
        
        // idAccessor:"id",
      },
      {
        Header: "Sector Name",
        accessor: 'sector.district_name',
      },
      {
        Header: "Status",
        accessor: 'state',
        Cell: StatusPill,
        
        Filter: ReportStatusColumnFilter,  // new
        // filter: 'includes',
      },
      {
        Header: "Phone Number",
        accessor: 'user.phone_number',
      },
      {
        Header: "Posted At",
        accessor: 'postedAt',
        Cell:PostedAtCell,
        
        // Filter: SelectColumnFilter,  // new
        // filter: 'includes',
      },
      {
        id:"spamStatus",
        // Header: "spamStatus",
        accessor: 'spamStatus',
 
        
        Filter: SelectColumnFilter,  // new
        // filter: 'includes',
      },
      
    ], [])
  

const [mydata ,setData]= useState([]);

useEffect(() => {
  // mounted.current = true;
  const url = `http://localhost:8000/v1/report/`;


  const fetchData = async () => {
    try {
      const response = await fetch(url);
     
      const json = await response.json();
      // const lela = []
      if(json){
        setData(json);
      }
       
       
      console.log("Sectors: ", json);
    } catch (error) {
      console.log("error", error);
    }
  };

    fetchData();

}, []);

    // const data = React.useMemo(() => mydata, [])
  
    return (
      <div className="min-h-screen bg-gray-100 text-gray-900">
        {
          mydata &&
        
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          {/* <div className="">
            <h1 className="text-xl font-semibold">React Table + Tailwind CSS = ❤</h1>
          </div> */}
          <div className="mt-6">
            
              <Table columns={columns} data={mydata} />
            
            
          </div>
        </main>
}
      </div>
    );
  }

  export default ReportShow;