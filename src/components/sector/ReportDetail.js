import Image1 from '../../assets/img/broken_pipe.jpg';
export default function ReportDetail() {
    return(
        <div className=" bg-white w-[700px]  ml-5 drop-shadow-2xl mt-[30px] h-screen">
            <div className=" w-[700px] h-[100px] rounded-2xl] -mt-[50px] drop-shadow-3xl" style={{backgroundColor: 'rgb(194 65 12)'}}>
                <p className = " ml-2" style={{color: 'rgb(194 65 12)'}}> Title</p>
                <h1 className="text-[25px] ml-[30px] text-white ]">Broken Pipe near arada area found.</h1>
            </div>
            <div className='flex'>
           <img 
             src= {Image1}
            className = "ml-[30px] mt-[30px]   w-[300px]"/>
            <p className="m-[30px] w-[350px]">
               There is a broken pipe near around arada area and we are facing issues. we can not getting water  now. considering this we are asking for some one who  can fix this issue so that we can get water in that area.
               There is a broken pipe near around arada area and we are facing issues. we can not getting water  now. considering this we are asking for some one who  can fix this issue so that we can get water in that area.
            </p>
        </div>
        <p className='ml-[30px] mt-[30px] w-[650px]'>There is a broken pipe near around arada area and we are facing issues. we can not getting water  now. considering this we are asking for some one who  can fix this issue so that we can get water in that area.
               There is a broken pipe near around arada area and we are facing issues. we can not getting water  now. considering this we are asking for some one who  can fix this issue so that we can get water in that area.
        </p>
            
      </div>
    ); 
}