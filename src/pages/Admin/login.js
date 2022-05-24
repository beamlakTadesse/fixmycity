import { Input, Image, Button } from "@material-tailwind/react";
import logo from "../../assets/img/fix.jpg";
import addis from "../../assets/img/addis.jpg";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setRole } from "../../helpers/utils";

export default function LogIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }
  const [submitted, setSubmitted] = useState(false);
  const [loginState, setLoginState] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log(submitted);
    setSubmitted(true);
    if (username && password) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      };
      try {
        fetch(
          `http://localhost:8000/v1/admins/login_superadmin/`,
          requestOptions
        )
          .then((response) => response.json())
          .then((res) => {
            if (res.message) {
              setLoginState(true);
              setLoginMessage(res.message);
              localStorage.setItem("token", res.token.access);
              setRole(res.token);
              navigate(`/admin/dashboard`);
            } else {
              setLoginState(false);
              setLoginMessage(res.detail);
            }
            console.log(res);
          });
      } catch (e) {
        navigate(`/login`);
      }
    }
  }
  const { username, password } = inputs;
  return (
    <div className="bg-white font-family-karla">
      <div className="w-full flex flex-wrap">
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex justify-center pt-8">
            {submitted && <div className="text-red-400">{loginMessage}</div>}
          </div>
          <div className="flex justify-center pt-12 md:pl-12 md:-mb-24">
            <Image src={logo}></Image>
          </div>

          <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <form
              className="flex flex-col pt-3 md:pt-8"
              onSubmit={handleSubmit}
            >
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
              <Button
                onSubmit={handleSubmit}
                type="submit"
                value="Log In"
                className="flex justify-center bg-brown text-lg hover:bg-gray-700 p-2 mt-8"
              >
                LogIn
              </Button>
            </form>
            <div className="text-center pt-12 pb-12">
              <p>
                <a href="register.html" class="underline font-semibold">
                  Forgot password?
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="w-1/2 shadow-2xl">
          <Image
            className="object-cover w-full h-screen hidden md:block"
            src={addis}
          />
        </div>
      </div>
    </div>
  );
}
