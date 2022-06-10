import { useContext } from "react";
import { UserContext } from "../context/userProvider";

const useUser = () => {
  return useContext(UserContext);
};

export default useUser;
