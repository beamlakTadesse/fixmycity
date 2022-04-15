import Image1 from '../../assets/img/tick.jpg';
import Image2 from '../../assets/img/profile.jpg';
import Image3 from '../../assets/img/location.png';
export default function ReportInfo() {
    return(
        <div className="w-[500px] border-2 border-solid ml-6 mt-7">
         <div className = "bg-white border-2 border-solid  w-[300px] h-[150px] mt-[40px] ml-[20px] rounded-xl drop-shadow-2xl">
         <img 
             src= {Image1}
             className = " w-[90px] ml-[10px] -mt-[30px] drop-shadow-2xl rounded-xl"/>
            <p className="text-inherit  ml-[180px] text-2xl">Resolved</p>
            <hr className=""></hr>
            <p className=" mt-[13px] ml-[100px]">1 month ago</p>

         </div>
         <div className = "bg-white border-2 border-solid  w-[300px] h-[150px] mt-[40px] ml-[20px] rounded-xl drop-shadow-2xl">
         <img 
             src= {Image2 }
             className = " w-[90px] ml-[10px] -mt-[30px] drop-shadow-2xl rounded-xl"/>
            
            <p className="text-inherit  ml-[180px] text-2xl">John Doe</p>
            <hr className=""></hr>
            <p className=" mt-[13px] ml-[100px]">Total : 11 reports</p>

         </div>
         <div className = "bg-white border-2 border-solid  w-[300px] h-[150px] mt-[40px] ml-[20px] rounded-xl drop-shadow-2xl">
         <img 
             src= {Image3}
             className = " w-[90px] ml-[10px] -mt-[30px] drop-shadow-2xl rounded-xl"/>
            
            
            <p className=" mt-[13px] ml-[50px]">Arada, Addis Ababa</p>

         </div>

      </div>
    );
}