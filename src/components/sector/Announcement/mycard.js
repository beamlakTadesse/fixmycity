import Image from "@material-tailwind/react/Image";
// import thumb from "../public/thumb.svg";
// import thumb from '../../../assets/img/aawsa.png';
import thumb from "../../../assets/img/aara.jpg";
import React, { useState } from "react";
// import { FaReact } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
// import { AiOutlineClockCircle } from "react-icons/ai";
import { VscChecklist } from "react-icons/vsc";
import { FaPlay } from "react-icons/fa";
import { MoonIcon } from "@heroicons/react/solid";
import { SunIcon } from "@heroicons/react/solid";

export default function AnnouncementCard({
  title,
  description,
  image,
  date,
  sector,
  address,
}) {
  function toDate(date) {
    return new Date(date).toDateString();
  }

  const [readMore, setReadMore] = useState(false);
  const extraContent = sector && (
    <div>
      <div className="flex mt-[20px]">
        <span className="mr-[7px] text-[#424bb6]">Posted BY: </span>
        <p className="extra-content">{sector}</p>
      </div>

      <div className="flex mt-[20px]">
        <span className="mr-[7px] text-[#424bb6]">Address: </span>
        <p className="extra-content">{address}</p>
      </div>
    </div>
  );

  const linkName = readMore ? (
    <button
      color="brown"
      className="md:m-2 m-auto mt-5 bg-[#5865F2] shadow-md shadow-[#5865f28a]  pt-2 pb-2 pl-6 pr-4 rounded-xl flex flex-row justify-center items-center hover:bg-[#DEB887] ease-linear duration-300"
    >
      <FaPlay className="animate-ping" size={8} color="#fff" />
      <h1 className="text-white text-md font-semibold pl-2">See Less</h1>
    </button>
  ) : (
    <button
      color="brown"
      className="md:m-2 m-auto mt-5  shadow-md shadow-[#5865f28a]  pt-2 pb-2 pl-6 pr-4 rounded-xl flex flex-row justify-center items-center hover:bg-[#DEB887] ease-linear duration-300"
    >
      <FaPlay className="animate-ping" size={8} color="#fff" />
      <h1 className="text-white text-md font-semibold pl-2">See Detail</h1>
    </button>
  );

  {
    /* </div> */
  }

  return (
    <div className="md:h-auto w-full h-auto p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-lg dark:shadow-slate-700 flex flex-col ease-linear duration-300 md:flex-row-reverse">
      <div className=" h-full w-[24.5rem] shadow-md rounded-2xl basis-2/3 relative">
        {/* <div className=" text-white z-10 bg-[#5865F2] absolute pl-8 pr-8 pb-2 pt-2  rounded-tl-2xl rounded-br-2xl font-semibold">
          <h1>FREE</h1>
        </div> */}
        {image && (
          <div className="h-full w-full relative border-2 border-white rounded-2xl">
            <Image
              src={image}
              alt="thumbnail"
              layout="fill"
              objectFit="cover"
              className=" rounded-2xl"
            />
          </div>
        )}
      </div>

      <div className=" h-full w-full mr-2 rounded-2xl ">
        <div className=" pt-4 pr-2 pl-2 flex flex-row  flex-wrap">
          <div className="flex flex-row items-left m-2">
            <p className="m-2 font-bold pl-1 text-lg text-[#5865F2]">
              #weather
            </p>
          </div>

          <div className="flex flex-row items-left m-2">
            <p className="m-2 font-bold pl-1 text-lg text-[#5865F2]">
              #roadsauthority
            </p>
          </div>

          {/* <div className="flex flex-row items-left m-2">
            <p className="m-2 font-bold pl-1 text-lg text-[#5865F2]">{title}</p>
        </div> */}
        </div>

        <h2 className="m-2 text-4xl font-bold dark:text-white">{title}</h2>
        <p className="m-2  font-normal dark:text-white">{description}</p>

        {readMore && extraContent}
        <a
          className="read-more-link"
          onClick={() => {
            setReadMore(!readMore);
          }}
        >
          <h2>{linkName}</h2>
        </a>

        <div className="grid grid-cols-1 xl:grid-cols-1">
          <div className="xl:col-start-2 xl:col-end-2 px-3 mb-14 mr-8">
            {/* <AiOutlineClockCircle size={20} className="dark:text-white" /> */}
            <h1 className="pl-1 dark:text-white">{toDate(date)}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
