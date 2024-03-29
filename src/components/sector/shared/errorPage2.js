import React, { useState } from "react";
import ErrorI from "assets/img/broken_pipe.jpg";

// let history = useHistory();

export default function ErrorPage2({ pathname }) {
  const [url, setUrl] = useState("http://localhost:3000");
  // if(pathname){
  //   setUrl(url+pathname);
  // }
  return (
    <>
      <div class="flex items-center justify-center w-full h-screen">
        <div class="px-4 lg:py-12">
          <div class="lg:gap-4 lg:flex">
            <div class="flex flex-col items-center justify-center md:py-24 lg:py-32">
              <h1 class="font-bold text-blue-600 text-9xl">404</h1>
              <p class="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                <span class="text-red-500">Oops!</span> Page not found
              </p>
              <p class="mb-8 text-center text-gray-500 md:text-lg">
                The page you’re looking for doesn’t exist.
              </p>
              <a
                href={url}
                class="px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100"
                // onClick={history.push(url)}
              >
                Reload
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
