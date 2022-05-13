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
import TransferRadio from "./transferReport";
import DropdownRender from "./shared/dropDown";


import { createPopper } from "@popperjs/core";

export default function ReportDet() {
    let color = "gray";
    let { id } = useParams()
    const [mydata ,setData]= useState({});
    const [selected, setSelected] = useState(0);


      // ###########################  DROPDOWN #######
      const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
    const btnDropdownRef = React.createRef();
    const popoverDropdownRef = React.createRef();
    const openDropdownPopover = () => {
      createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
        placement: "bottom-start"
      });
      setDropdownPopoverShow(true);
    };
    const closeDropdownPopover = () => {
      setDropdownPopoverShow(false);
    };
    // bg colors
    let bgColor;
    color === "gray"
      ? (bgColor = "bg-slate-700")
      : (bgColor = "bg-" + color + "-500");

    // ###########################  DROPDOWN #######
    const url = `http://localhost:8000/v1/report/${id}/`;


    
useEffect(() => {
  // mounted.current = true;
  // const url = `http://localhost:8000/v1/report/${id}`;


  const fetchData = async () => {
    try {
      const response = await fetch(url);
     
      const json = await response.json();
      setData(json);
      if(!json.state){
        ReadReport(url)
      }
      console.log("Resolved_At: ", json.resolvedAt);

      console.log("postedAt: ", json.postedAt);

      console.log("Sectors: ", json);
    } catch (error) {
      console.log("error", error);
    }
  };

    fetchData();

}, []);
const [submitted, setSubmitted] = useState(false);
const [spamSubmitted, setSpamSubmitted] = useState(false);
const [removeSubmitted, setRemoveSubmitted] = useState(false);
const [rejectSubmitted, setRejectSubmitted] = useState(false);

function handleDeleteCancel() {

  setSubmitted(false)
  setRemoveSubmitted(false);
  setSpamSubmitted(false);
  setRejectSubmitted(false);
}


const resolveReport = async () => {
       
  try {
      const requestOptions = {
        method: 'PATCH',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body:JSON.stringify({"status":"RESOLVED",})
        // JSON.stringify(announcement)
    };

    const response = await fetch(url, requestOptions);
      const json = await response.json();
      setData(json.report);
       
      console.log("Report Status: ", json.state);
    } catch (error) {
      console.log("error", error);
    }
  };



const rejectReport = async () => {
       
  try {
      const requestOptions = {
        method: 'PATCH',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body:JSON.stringify({"status":"REJECTED",})
        // JSON.stringify(announcement)
    };

    const response = await fetch(url, requestOptions);
      const json = await response.json();
      setData(json.report);
      setRejectSubmitted(false);

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
      if(json){
        setData(json.report);

      }
       setSpamSubmitted(false);
      console.log("Sectors: ", json.user.first_name);
    } catch (error) {
      console.log("error", error);
    }
  };

  const ReadReport = async (url) => {
    try {
        const requestOptions = {
          method: 'PATCH',
          headers: { ...authHeader(), 'Content-Type': 'application/json' },
          body:JSON.stringify({"state":true})
          
      };
  
      const response = await fetch(url, requestOptions);

        const json = await response.json();
        console.log("READDDDDDDDD")
        // setData(json);
         
        // console.log("Spam Report: ", json.spamStatus);
        setSubmitted(false);
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
          setData(json.report);
           
          console.log("Spam Report: ", json.spamStatus);
          setRemoveSubmitted(false);
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
                <h1 className="text-[25px] ml-[30px] pt-[30px] text-white ]">Reported Issue</h1>
            </div>
            <div className='flex'>
          {
            mydata.image && <img 
             src = {mydata.image}
            className = "ml-[30px] mt-[30px] item-center w-[300px]"/>
          }
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
        
{mydata.like_count &&
<Button className='ml-[30px] mt-[30px]' style={{backgroundColor: 'rgb(255,255,255)',opacity:'0.9'
}} >
    <h3 className="m-2 font-bold pl-1 text-lg text-[rgb(153,153,153)]">👍 {mydata.like_count}</h3></Button>
}
        {!mydata.state && !mydata.spamStatus &&

        <Button className='ml-[30px] mt-[30px]' style={{backgroundColor: 'rgb(34,139,34)'}} 
         onClick={resolveReport}>
            <h3 className="m-2 font-bold pl-1 text-lg text-[#ffffff]">Resolve</h3></Button>
            }         
        
      </div>
          
          
      <div className="w-[500px] ml-7 mt-[40px]">
         <div className = "bg-white  w-[300px] h-[80px] mt-[40px] ml-[20px] rounded-xl flex border-1 border-solid">
            {(mydata.status==="UNRESOLVED")?<img 
               src= {Active}
               className = " w-[80px]   rounded-xl"
             />:<img 
             src= {(mydata.status==="RESOLVED")?Done:Active}
             className = " w-[80px]   rounded-xl"
           />}
            <div >
                <p className="ml-[40px] mt-4 text-xl font-light">{mydata.status==="RESOLVED"?"Resolved":(mydata.status==="UNRESOLVED")?"Active":"Rejected"}</p>
                <hr className="border-1 ml-7"></hr>
               {
                 (mydata.status=="UNRESOLVED")?<p className="ml-[100px] mt-2 font-light text-sm">{toDate(mydata.postedAt)}</p>
                  :<p className="ml-[100px] mt-2 font-light text-sm">{toDate(mydata.updatedAt)}</p>
                  } 
                    </div>

         </div>

         {mydata.user &&  
         <div className = "bg-white  w-[300px] h-[100px] mt-[40px] ml-[20px] rounded-xl flex">
         <img 
               src= {(mydata.user.image)?mydata.user.image:Image2}
               className = " w-[80px]   rounded-xl"
             />    
                 
             <div >
                <p className="ml-[40px] mt-4 text-xl font-light">{mydata.user.first_name} &nbsp;{mydata.user.last_name}</p> 
                {/* &nbsp;{mydata.user.last_name} </p> */}
                <hr className="border-1 ml-7"></hr>
                <p className="ml-[100px] mt-2 font-light text-sm">{mydata.user.phone_number}</p>
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


            {/* ########### DROPDOWN ######### */}

            <div className="flex flex-wrap mt-[40px] ml-[20px]">
          <div className="w-full sm:w-6/12 md:w-4/12 px-4">
            <div className="absolute inline-flex align-middle w-full">
              <button
                className={
                  "text-white font-bold text-sm px-6 py-3 camelcase rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 bg-black"
                }
                type="button"
                ref={btnDropdownRef}
                onClick={() => {
                  dropdownPopoverShow
                    ? closeDropdownPopover()
                    : openDropdownPopover();
                }}
              >
                Other Option
                {/* {color === "white" ? "White Dropdown" : color + " Dropdown"} */}
              </button>
              <div
                ref={popoverDropdownRef}
                className={
                  (dropdownPopoverShow ? "block " : "hidden ") +
                  (color === "gray" ? "bg-black " : bgColor + " ") +
                  "text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1"
                }
                style={{ minWidth: "12rem" }}
              >
                <div
                style={{cursor: "pointer"}}
                  // href="#pablo"
                  className={
                    "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent " +
                    (color === "white" ? " text-slate-700" : "text-white")
                  }
                  
                  onClick={() =>{
                    setSubmitted(!submitted);
                    closeDropdownPopover();
                  }}
                >
                  Transfer
                </div>





                <div
                   style={{cursor: "pointer"}}
                  className={
                    "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent " +
                    (color === "white" ? " text-slate-700" : "text-white")
                  }
                  onClick={(!mydata.spamStatus)?() =>{
                    setSpamSubmitted(!spamSubmitted);
                    closeDropdownPopover();
                  }:() =>
                    {setRemoveSubmitted(!removeSubmitted);
                      closeDropdownPopover();
                    }
                  }
                >
                  {(!mydata.spamStatus)?"Add to Spam":"Remove From Spam"}
                </div>

                {!mydata.status==="REJECTED" &&
                <div
                 style={{cursor: "pointer"}}
                  className={
                    "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent " +
                    (color === "white" ? " text-slate-700" : "text-white")
                  }
                  onClick={() => {
                    setRejectSubmitted(!rejectSubmitted);
                    closeDropdownPopover();
                  }}
                >
                  Reject Report
                </div>
}
               
              </div>
            </div>
          </div>
        </div>
            
            </div>
            </div>
            }
     {/* ################## DROPDOWN ############ */}







         {/* ################ Modal */}
                {/* ############# 1 */}
         <Modal size="lg" active={spamSubmitted} toggler={() => setSpamSubmitted(false)}>
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

              {/* ############### 2 */}

                                            <Modal size="lg" active={removeSubmitted} toggler={() => setRemoveSubmitted(false)}>
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


                                            {/* ############ 3 */}
                                            <Modal size="lg" active={submitted} toggler={() => setSubmitted(false)}>
                                                <ModalTitle>
                                                    <Heading5>
                                                      Transfer Report to other Sector
                                                    </Heading5>
                                                </ModalTitle>
                                                <ModalBody>
                                                    <TransferRadio report={mydata.id} submitted={submitted} setSubmitted={setSubmitted} />
                                                </ModalBody>
                                                <ModalFooter>
                                                    
                                                    <Button onClick={() => handleDeleteCancel()}> Cancel</Button>
                                                </ModalFooter>

                                            </Modal>


                                  {/* ############ MODAL 4 */}
                                  <Modal size="lg" active={rejectSubmitted} 
                                  toggler={() => setRejectSubmitted(false)}
                                  >
                                                <ModalTitle>
                                                    <Heading5>
                                                        Confirm Delete
                                                    </Heading5>
                                                </ModalTitle>
                                                <ModalBody>
                                                    <p>
                                                        Are you sure you want to Reject this report
                                                    </p>
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button onClick={() => rejectReport()
                                                    }
                                                    >Confirm</Button>
                                                    <Button onClick={() => handleDeleteCancel()}> Cancel</Button>
                                                </ModalFooter>

                                            </Modal>

          {/* ####################### MODAL */}
      {/* </div> */}

            {/* <ReportInfo data={mydata}/> */}

        </>

    );
}
