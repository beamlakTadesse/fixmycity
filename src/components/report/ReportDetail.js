import React, {useState, useEffect} from "react";
// import ReportDetail from "components/report/ReportDetail";
// import ReportInfo from "components/report/ReportInfo";
import { useParams } from "react-router-dom";
import Image1 from '../../assets/img/tick.jpg';
import Image2 from '../../assets/img/profile.jpg';
import Done from '../../assets/img/done.png';
import Active from '../../assets/img/active1.png';
import Image3 from '../../assets/img/location.png';
export default function ReportDet() {
    let { id } = useParams()
    const [mydata ,setData]= useState({});

useEffect(() => {
  // mounted.current = true;
  const url = `http://localhost:8000/v1/report/${id}`;


  const fetchData = async () => {
    try {
      const response = await fetch(url);
     
      const json = await response.json();
      setData(json);
       
      console.log("Sectors: ", json.description);
    } catch (error) {
      console.log("error", error);
    }
  };

    fetchData();

}, []);
function toDate(date) {
    return new Date(date).toDateString();
}
    return(
        <>
            {mydata && 
       
        <div className = "flex  mb-5 " >
                 
            <div className=" bg-white w-[700px]  ml-5 drop-shadow-2xl mt-[30px] h-screen">
            <div className=" w-[700px] h-[100px] rounded-2xl] -mt-[50px] drop-shadow-3xl" style={{backgroundColor: 'rgb(138,43,226)'}}>
                {/* <p className = " ml-2" style={{color: 'rgb(194 65 12)'}}> Title</p> */}
                <h1 className="text-[25px] ml-[30px] pt-[30px] text-white ]">Broken Pipe near arada area found.</h1>
            </div>
            <div className='flex'>
           <img 
            //  src= {Image1}
             src = {mydata.image}
            className = "ml-[30px] mt-[30px] item-center w-[300px]"/>
           
            {/* <p className="m-[30px] w-[350px]">
                {mydata.description}
            </p> */}
        </div>
        <p className='ml-[30px] mt-[30px] w-[650px]'>
                {mydata.description}
            </p>
      </div>
          
          
      <div className="w-[500px] ml-7 mt-[40px]">
         <div className = "bg-white  w-[300px] h-[80px] mt-[40px] ml-[20px] rounded-xl flex border-1 border-solid">
            {(mydata.state)?<img 
               src= {Done}
               className = " w-[80px]   rounded-xl"
             />:<img 
             src= {Active}
             className = " w-[80px]   rounded-xl"
           />}
            <div >
                <p className="ml-[40px] mt-4 text-xl font-light">{mydata.state?"Resolved":"Active"}</p>
                <hr className="border-1 ml-7"></hr>
                <p className="ml-[100px] mt-2 font-light text-sm">{toDate(mydata.postedAt)}</p>
            </div>

         </div>

         {mydata.user &&  
         <div className = "bg-white  w-[300px] h-[100px] mt-[40px] ml-[20px] rounded-xl flex">
         <img 
               src= {Image2}
               className = " w-[80px]   rounded-xl"
             />    
                 
             <div >
                <p className="ml-[40px] mt-4 text-xl font-light">{mydata.user.first_name} &nbsp;{mydata.user.last_name}</p> 
                {/* &nbsp;{mydata.user.last_name} </p> */}
                <hr className="border-1 ml-7"></hr>
                <p className="ml-[100px] mt-2 font-light text-sm">Total : 11 reports</p>
            </div>
            
         </div>
             
            }
         <div className = "bg-white  w-[300px] h-[80px] mt-[40px] ml-[20px] rounded-xl flex">
         <img 
               src= {Image3}
               className = " w-[80px]   rounded-xl"
             />            
             <div >
                <p className="ml-[40px] mt-4 text-xl font-light">Location</p>
                <hr className="border-1 ml-7"></hr>
                <p className="ml-[95px] mt-2 font-light text-sm">Arada, Addis Ababa</p>
            </div>
         </div>
                
      </div>

            {/* <ReportInfo data={mydata}/> */}
        </div>
}
        </>

    );
}

// import Image1 from '../../assets/img/broken_pipe.jpg';
// export default function ReportDetail({data}) {
//     return(
//         <div className=" bg-white w-[700px]  ml-5 drop-shadow-2xl mt-[30px] h-screen">
//             <div className=" w-[700px] h-[100px] rounded-2xl] -mt-[50px] drop-shadow-3xl" style={{backgroundColor: 'rgb(194 65 12)'}}>
//                 <p className = " ml-2" style={{color: 'rgb(194 65 12)'}}> Title</p>
//                 <h1 className="text-[25px] ml-[30px] text-white ]">Broken Pipe near arada area found.</h1>
//             </div>
//             <div className='flex'>
//            <img 
//             //  src= {Image1}
//              src = {data.image}
//             className = "ml-[30px] mt-[30px]   w-[300px]"/>
//             {/* <p className="m-[30px] w-[350px]">
//                There is a broken pipe near around arada area and we are facing issues. we can not getting water  now. considering this we are asking for some one who  can fix this issue so that we can get water in that area.
//                There is a broken pipe near around arada area and we are facing issues. we can not getting water  now. considering this we are asking for some one who  can fix this issue so that we can get water in that area.
//             </p> */}
//             <p className="m-[30px] w-[350px]">
//                 {data.description}
//             </p>
//         </div>
//         <p className='ml-[30px] mt-[30px] w-[650px]'>There is a broken pipe near around arada area and we are facing issues. we can not getting water  now. considering this we are asking for some one who  can fix this issue so that we can get water in that area.
//                There is a broken pipe near around arada area and we are facing issues. we can not getting water  now. considering this we are asking for some one who  can fix this issue so that we can get water in that area.
//         </p>
            
//       </div>
//     ); 
// }