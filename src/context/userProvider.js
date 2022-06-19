import { url } from "helpers/strings";
import { getUserId } from "helpers/utils";
import React, { useReducer, createContext, useState } from "react";

export const UserContext = createContext();
var data = {};
const fetchData = async () => {
  try {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    const response = await fetch(url1, requestOptions);

    const json = await response.json();

    if (response.ok) {
      data = json;
    }
  } catch (e) {}
};
fetchData();

const initialState = {
  user: data,
  loading: false,
  error: null,
};

const token = localStorage.getItem("token");

const userId = getUserId(token);
const url1 = `${url}/v1/admins/users/` + userId;

const reducer = (state, action) => {
  switch (action.type) {
    case "EDIT":
      return {
        user: [...state.user, action.payload],
      };
    case "LIST":
      return {
        user: action.payload,
      };

    case "START":
      return {
        loading: true,
      };
    case "COMPLETE":
      return {
        loading: false,
      };
    default:
      throw new Error();
  }
};

export const UserContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};
