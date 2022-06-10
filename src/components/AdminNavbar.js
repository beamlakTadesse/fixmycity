import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import NavbarInput from "@material-tailwind/react/NavbarInput";
import Image from "@material-tailwind/react/Image";
import Dropdown from "@material-tailwind/react/Dropdown";
import DropdownItem from "@material-tailwind/react/DropdownItem";
import ProfilePicture from "assets/img/profile.jpg";
import { Logout } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { isSectorAdmin } from "helpers/utils";
import useAuth from "../hooks/auth";
import { NavLink } from "react-router-dom";
import { url } from "helpers/strings";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { getUserId } from "helpers/utils";
import { UserContext, UserDispatchContext } from "context/userProvider";

export default function AdminNavbar({ showSidebar, setShowSidebar }) {
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [users, setUsers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [image, setImage] = useState("");

  function Logout() {
    navigate(`/login`);

    localStorage.removeItem("token");

    setAuth({});

    // setAuthTokens();
    // setRol();
  }

  const userDetails = useContext(UserContext);
  const setUserDetails = useContext(UserDispatchContext);

  const token = localStorage.getItem("token");

  const userId = getUserId(token);
  const url1 = `${url}/v1/admins/users/` + userId;
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url1);

      const json = await response.json();

      if (json) {
        setUsers(json.user);
        setImage(
          `http://res.cloudinary.com/shetechs/${json.user.ProfileImage}`
        );
        setUserDetails({
          firstname: users.firstname,
          lastname: users.lastname,
          phone_number: users.phone_number,
          ProfileImage: image,
        });
      }
    } catch (error) {
      console.log("error", error);
      setError(true);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    console.log("wert7687oilkcgxfdtrytuyiu");
  };

  const loadUserFromServer = useCallback(async () => {
    fetchData();
  }, []); //

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <nav className="bg-gray-800  py-6 px-3">
      <div className="container max-w-full mx-auto flex items-center justify-between md:pr-8 md:pl-10">
        <div className="md:hidden">
          <Button
            color="transparent"
            buttonType="link"
            size="lg"
            iconOnly
            rounded
            ripple="light"
            onClick={() => setShowSidebar("left-0")}
          >
            <Icon name="menu" size="2xl" color="white" />
          </Button>
          <div
            className={`absolute top-2 md:hidden ${
              showSidebar === "left-0" ? "left-64" : "-left-64"
            } z-50 transition-all duration-300`}
          >
            <Button
              color="transparent"
              buttonType="link"
              size="lg"
              iconOnly
              rounded
              ripple="light"
              onClick={() => setShowSidebar("-left-64")}
            >
              <Icon name="close" size="2xl" color="white" />
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center w-full">
          <h4 className="uppercase text-white text-sm tracking-wider mt-1">
            {location === "/"
              ? "DASHBOARD"
              : location.toUpperCase().replace("/", "")}
          </h4>

          <div className="flex">
            {/* <NavbarInput placeholder="Search" /> */}

            <div className="-mr-4 ml-6">
              <Dropdown
                color="transparent"
                buttonText={
                  <div className="w-12">
                    {image ? (
                      <Image src={image} rounded />
                    ) : (
                      <Image src={ProfilePicture} rounded />
                    )}
                  </div>
                }
                rounded
                style={{
                  padding: 0,
                  color: "transparent",
                }}
              >
                <DropdownItem color="brown">
                  <NavLink to="/help">Help</NavLink>
                </DropdownItem>
                <DropdownItem color="brown" onClick={Logout}>
                  Logout
                </DropdownItem>
                {/* <DropdownItem color="lightBlue">
                                    Something Else
                                </DropdownItem> */}
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
