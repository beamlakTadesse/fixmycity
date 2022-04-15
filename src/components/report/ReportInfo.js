import Image1 from '../../assets/img/tick.jpg';
import Image2 from '../../assets/img/profile.jpg';
import Image3 from '../../assets/img/location.png';
export default function ReportInfo() {
    return(
        <div className="w-[500px] ml-7 mt-[100px]">
         <div className = "bg-white  w-[300px] h-[80px] mt-[40px] ml-[20px] rounded-xl flex border-1 border-solid">
            <img 
               src= {Image1}
               className = " w-[80px]   rounded-xl"
             />
            <div >
                <p className="ml-[100px] mt-4 text-xl font-light">Resolved</p>
                <hr className="border-1 ml-7"></hr>
                <p className="ml-[100px] mt-2 font-light text-sm">1 month ago</p>
            </div>

         </div>
         <div className = "bg-white  w-[300px] h-[80px] mt-[40px] ml-[20px] rounded-xl flex">
         <img 
               src= {Image2}
               className = " w-[80px]   rounded-xl"
             />            
             <div >
                <p className="ml-[100px] mt-4 text-xl font-light">John Doe</p>
                <hr className="border-1 ml-7"></hr>
                <p className="ml-[100px] mt-2 font-light text-sm">Total : 11 reports</p>
            </div>
         </div>
         <div className = "bg-white  w-[300px] h-[80px] mt-[40px] ml-[20px] rounded-xl flex">
         <img 
               src= {Image3}
               className = " w-[80px]   rounded-xl"
             />            
             <div >
                <p className="ml-[100px] mt-4 text-xl font-light">Location</p>
                <hr className="border-1 ml-7"></hr>
                <p className="ml-[95px] mt-2 font-light text-sm">Arada, Addis Ababa</p>
            </div>
         </div>

      </div>
    );
}