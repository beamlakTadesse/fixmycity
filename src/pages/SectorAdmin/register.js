import { Input, Image, Button } from "@material-tailwind/react";
import getQueryVariable from "helpers/utils";
import { useState, useEffect } from "react";
import { useNavigate, Route, useLocation } from "react-router-dom";
import { url } from "helpers/strings";
export default function Register() {
  let location = useLocation();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    token: "",
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }
  const [submitted, setSubmitted] = useState(false);
  const [confirmPass, setconfirmPass] = useState("");
  const [confirm, setConfirm] = useState(false);
  function handleConfirmChange(e) {
    e.persist();
    setconfirmPass(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log(submitted);
    setSubmitted(true);
    var token = getToken();
    console.log(token);
    setInputs((inputs) => ({ ...inputs, token: getToken() }));
    console.log(inputs);
    if (password === confirmPass) {
      if (username && password && last_name && first_name) {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(inputs),
        };
        try {
          fetch(`${url}/v1/admins/email-verify/`, requestOptions).then(
            async (response) => {
              const data = await response.json();

              // check for error response
              if (!response.ok) {
                console.log(data);

                // get error message from body or default to response status
              } else {
                navigate(`/login`);
              }
            }
          );
        } catch (e) {}
      }
    } else {
    }
  }
  function getToken() {
    return getQueryVariable("token");
  }
  const [mains, setMains] = useState([]);
  const [myEmpty, setIsEmpty] = useState(true);
  const [sectors, setSectors] = useState([]);
  useEffect(() => {
    // mounted.current = true;
    const url1 = `${url}/v1/admins/sector/sector`;

    const fetchData = async () => {
      try {
        const response = await fetch(url1);

        const json = await response.json();

        if (json.results.length === 0) {
          setIsEmpty(true);
        } else {
          setSectors(json.results);

          setIsEmpty(false);
        }
        setMains([
          "EthioTelecom",
          "Water and Sewage",
          "Roads Authority",
          "ELPA",
        ]);
        // console.log("Sectors: ", json.sectors[0].district_name);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);
  const [checkedList, setCheckedList] = useState(sectors);
  const [checked, setChecked] = useState(false);
  const changeList = (id, checked) => {};
  const { username, password, first_name, last_name } = inputs;
  return (
    <div className=" font-family-karla">
      <div className="w-full flex md:ml-40 flex-wrap">
        <div className="w-full bg-white md:w-1/2 flex justify-center flex-col">
          <div></div>
          <div className="flex justify-center font-bold text-2xl pt-12 md:pl-12 md:-mb-24">
            Personal Information
          </div>

          <div className="flex flex-col md:justify-start my-auto pt-8 md:pt-16 px-8 md:px-24 lg:px-32">
            <form
              className="flex flex-col pt-3 md:pt-8"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col pt-4">
                <Input
                  type="text"
                  id="first_name"
                  name="first_name"
                  placeholder="first Name"
                  onChange={handleChange}
                  value={first_name}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              {submitted && !first_name && (
                <div className="text-red-400">first name is required</div>
              )}
              <div className="flex flex-col pt-4">
                <Input
                  type="text"
                  id="last_name"
                  name="last_name"
                  placeholder="last Name"
                  onChange={handleChange}
                  value={last_name}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              {submitted && !last_name && (
                <div className="text-red-400">last name is required</div>
              )}
              <div className="flex flex-col pt-4">
                <Input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="username"
                  onChange={handleChange}
                  value={username}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              {submitted && !username && (
                <div className="text-red-400">Username is required</div>
              )}

              <div class="flex flex-col pt-4">
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="Password"
                />
              </div>
              {submitted && !password && (
                <div className="text-red-400">password is required</div>
              )}
              <div class="flex flex-col pt-4">
                <Input
                  type="password"
                  id="confirmPass"
                  name="confirmPass"
                  value={confirmPass}
                  onChange={handleConfirmChange}
                  placeholder="confirm password"
                />
              </div>
              {submitted && !confirmPass && (
                <div className="text-red-400">password is required</div>
              )}
              {submitted &&
                confirmPass &&
                password &&
                confirmPass !== password && (
                  <div className="text-red-400">check password</div>
                )}

              <div>
                <h2>Select Sector</h2>
                {sectors &&
                  Object.keys(sectors).map((oneKey, i) => {
                    return (
                      <div>
                        <input
                          className="accent-emerald-100"
                          type="radio"
                          name="options"
                          value={sectors[oneKey].id}
                          checked={checked}
                          onChange={(e) => setChecked(e.target.checked)}
                        />
                        <lable>{sectors[oneKey].district_name}</lable>
                      </div>
                    );
                  })}
              </div>
              <Button
                color="brown"
                onSubmit={handleSubmit}
                type="submit"
                value="Log In"
                className="flex justify-center bg-purple text-lg hover:bg-gray-700 p-2 mt-8"
              >
                Register
              </Button>
            </form>
            <div className="text-center pt-12 pb-12"></div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
