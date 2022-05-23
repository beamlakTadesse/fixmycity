import jwt_decode from "jwt-decode";
import React from "react";

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
let token = localStorage.getItem("token");
let role = getRole(token);

export function getToken() {
  return token;
}
export function isAuthenticated() {
  if (token) {
    return true;
  } else {
    return false;
  }
}
export function isSuperAdmin() {
  if (role == 1) {
    return true;
  } else {
    return false;
  }
}

export function isSectorAdmin() {
  if (role === 2) {
    console.log("role yeeeee");
    return true;
  } else {
    console.log("role nooooo");

    return false;
  }
}

export function setRole(token) {
  var decodedToken = jwt_decode(token.access);
  console.log(decodedToken);
  localStorage.setItem("userId", decodedToken.user_id);
  localStorage.setItem("role", decodedToken.role);
}
export function getRole() {
  if (token) {
    var decodedToken = jwt_decode(token);
    console.log(decodedToken);
    return decodedToken.role;
  } else {
    return "0";
  }
}
export function getUserId() {
  if (token) {
    var decodedToken = jwt_decode(token);
    console.log(decodedToken);
    return decodedToken.user_id;
  } else {
    return "0";
  }
}
