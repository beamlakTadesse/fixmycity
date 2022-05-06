import React, {useState, useEffect} from "react";
// import ReportDetail from "components/report/ReportDetail";
// import ReportInfo from "components/report/ReportInfo";
import { useParams } from "react-router-dom";
import Image1 from '../../assets/img/tick.jpg';
import Image2 from '../../assets/img/profile.jpg';
import Done from '../../assets/img/done.png';
import Active from '../../assets/img/active1.png';
import Image3 from '../../assets/img/location.png';
// import { Button } from "./shared/Button";
import { authHeader } from "helpers";
import { Button, Heading5, ModalFooter } from '@material-tailwind/react';

import ModalBody from "@material-tailwind/react/ModalBody";
import ModalTitle from "@material-tailwind/react/ModalHeader"
import Modal from "@material-tailwind/react/Modal";
export default function ReportDet() {
    let { id } = useParams()
    const [mydata ,setData]= useState({});
    const url = `http://localhost:8000/v1/report/${id}/`;

    
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
const [submitted, setSubmitted] = useState(false);

function handleDeleteCancel() {

  setSubmitted(false)

}


const resolveReport = async () => {
       
  try {
      // const response = await fetch(url);
      const requestOptions = {
        method: 'PATCH',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body:JSON.stringify({"state":true,})
        // JSON.stringify(announcement)
    };

    const response = await fetch(url, requestOptions);
      const json = await response.json();
      setData(json);
       
      console.log("Report Status: ", json.state);
    } catch (error) {
      console.log("error", error);
    }
  };
const addToSpamReport = async () => {
  // const url = `http://localhost:8000/v1/report/${id}/`;
  try {
      const requestOptions = {
          method: 'PATCH',
          headers: { ...authHeader(), 'Content-Type': 'application/json' },
          body:JSON.stringify({"spamStatus":true,})
      };
  
      const response = await fetch(url, requestOptions);
      
      const json = await response.json();
      setData(json);
       setSubmitted(false);
      console.log("Sectors: ", json.user.first_name);
    } catch (error) {
      console.log("error", error);
    }
  };

  const removeSpamReport = async () => {
      try {
          const requestOptions = {
            method: 'PATCH',
            headers: { ...authHeader(), 'Content-Type': 'application/json' },
            body:JSON.stringify({"spamStatus":false,})
            
        };
    
        const response = await fetch(url, requestOptions);

          const json = await response.json();
          setData(json);
           
          console.log("Spam Report: ", json.spamStatus);
          setSubmitted(false);
        } catch (error) {
          console.log("error", error);
        }
      };
  

function toDate(date) {
    return new Date(date).toDateString();
}
    return(
        <>
            {mydata && 
       
        <div className = "flex  mb-5 " >
                 
            <div className=" bg-white w-[700px]  ml-5 drop-shadow-2xl mt-[30px] h-screen">
            <div className=" w-[700px] h-[100px] rounded-2xl] -mt-[50px] drop-shadow-3xl" style={{backgroundColor: 'rgb(135,206,235)'}}>
                {/* <p className = " ml-2" style={{color: 'rgb(194 65 12)'}}> Title</p> */}
                <h1 className="text-[25px] ml-[30px] pt-[30px] text-white ]">Broken Pipe near arada area found.</h1>
            </div>
            <div className='flex'>
           <img 
            //  src= {Image1}
             src = {mydata.image}
            className = "ml-[30px] mt-[30px] item-center w-[300px]"/>
           <div>
           <p className="m-[30px] w-[350px]">
                {mydata.description}
            </p>
            { mydata.tag &&
                <div className="flex">
                    
                       { Object.keys(mydata.tag).map((oneKey,i)=>{
                            return(
                                <>
                                <h3 className="m-2 font-bold pl-1 text-lg text-[#5865F2]"><
                                    a href="#">&#35;{mydata.tag[oneKey]}</a>
                                </h3>                             
                                </>
                               
                            )
                        }) 
                    }
                   
                </div>
            }
           </div>
            
            
        </div>
        {!mydata.state && !mydata.spamStatus &&

        <Button className='ml-[30px] mt-[30px]' style={{backgroundColor: 'rgb(34,139,34)'}} 
         onClick={resolveReport}>
            <h3 className="m-2 font-bold pl-1 text-lg text-[#ffffff]">Resolve</h3></Button>
            }         
        {/* <p className='ml-[30px] mt-[30px] w-[650px]'>
                {mydata.description}
            </p> */}
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
         <div className = "bg-white  w-[200px] h-[80px] mt-[40px] ml-[20px] rounded-xl flex">
        
             <div >
             {(!mydata.spamStatus)?
                <>
                   <Button className='ml-[30px] mt-[30px]' style={{backgroundColor: 'rgb(178,34,34)'}} 
                onClick={() =>
                  setSubmitted(!submitted)}>
                <h3 className="m-2 font-bold pl-1 text-lg text-[#ffffff]">Reject</h3></Button>
                  <Modal size="lg" active={submitted} toggler={() => setSubmitted(false)}>
                                                <ModalTitle>
                                                    <Heading5>
                                                        Confirm Delete
                                                    </Heading5>
                                                </ModalTitle>
                                                <ModalBody>
                                                    <p>
                                                        Are you sure you want to add this report to spam
                                                    </p>
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button onClick={() => addToSpamReport()
                                                    }
                                                    >Confirm</Button>
                                                    <Button onClick={() => handleDeleteCancel()}> Cancel</Button>
                                                </ModalFooter>

                                            </Modal>
                </>:<>  <Button className='ml-[30px] mt-[30px]' style={{backgroundColor: 'rgb(178,34,34)'}} 
                onClick={() =>
                  setSubmitted(!submitted)}>
                <h3 className="m-2 font-bold pl-1 text-lg text-[#ffffff]">Add to reports</h3></Button>
                <Modal size="lg" active={submitted} toggler={() => setSubmitted(false)}>
                                                <ModalTitle>
                                                    <Heading5>
                                                        Confirm Delete
                                                    </Heading5>
                                                </ModalTitle>
                                                <ModalBody>
                                                    <p>
                                                        Are you sure you want to remove this report to spam
                                                    </p>
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button onClick={() => removeSpamReport()
                                                    }
                                                    >Confirm</Button>
                                                    <Button onClick={() => handleDeleteCancel()}> Cancel</Button>
                                                </ModalFooter>

                                            </Modal>
                </>
            }  
            </div>

         </div>
                
      </div>

            {/* <ReportInfo data={mydata}/> */}
        </div>
}
        </>

    );
}
