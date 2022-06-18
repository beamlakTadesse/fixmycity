import { url } from "helpers/strings";
import { getUserId } from "helpers/utils";
import React, { createContext, useState, useEffect } from "react";

// Create two context:
// UserContext: to query the context state
// UserDispatchContext: to mutate the context state
const UserContext = createContext(undefined);
const UserDispatchContext = createContext(undefined);

// A "provider" is used to encapsulate only the
// components that needs the state in this context
function UserProvider({ children }) {
  const [userDetails, setUserDetails] = useState({
    // firstname: "John ",
    // lastname: "Doe",
    // phone_number: "",
    // ProfileImage: "",
  });
  const token = localStorage.getItem("token");
  console.log(token);
  const userId = getUserId(token);
  const url1 = `${url}/v1/admins/users/` + userId;
  const fetchData = async () => {
    // setIsLoading(true);
    try {
      const response = await fetch(url1);

      const json = await response.json();

      if (json) {
        // setUsers(json.user);
        // setImage(
        //   `http://res.cloudinary.com/shetechs/${json.user.ProfileImage}`
        // );
        setUserDetails(
          json.user
          // firstname: users.firstname,
          // lastname: users.lastname,
          // phone_number: users.phone_number,
          // ProfileImage: image,
        );
      }
    } catch (error) {}
    setTimeout(() => {}, 1500);
  };
  useEffect(() => {
    fetchData();
  });

  return (
    <UserContext.Provider value={userDetails}>
      <UserDispatchContext.Provider value={setUserDetails}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext, UserDispatchContext };
