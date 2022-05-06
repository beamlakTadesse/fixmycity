import { useJwt } from "react-jwt";

export default function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  console.log(query);
  var vars = query.split("&");
  console.log(vars);
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    console.log(pair);
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}
export function isAuthenticated() {
  let token = localStorage.getItem("token");
  if (token) {
    return true;
  } else {
    return false;
  }
}

export function GetRole() {
  let token = localStorage.getItem("token");
  const { decodedToken, isExpired } = useJwt(token);
  console.log("get role......");

  console.log(decodedToken);
  console.log(isExpired);
}
