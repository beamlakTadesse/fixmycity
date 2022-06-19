import { url } from "helpers/strings";
import React, { useReducer, createContext, useState } from "react";

export const AnnContext = createContext();
var data = [];
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
  ann: data,
  loading: false,
  error: null,
};
const url1 = `${url}/v1/announcment/getOwnAnnouncment/`;

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      console.log(action.payload);
      return {
        ann: [...state.ann, action.payload],
      };
    case "EDIT": {
      const newArray = [...state.ann];
      const index = state.ann.findIndex((ann) => ann.id == action.payload.id);
      state.ann.forEach((ann) => {
        if (ann.id == action.payload.id) {
          newArray[index] = action.payload;
        }
      });

      newArray[index] = action.payload;

      return {
        ann: newArray,
      };
    }
    case "LIST":
      return {
        ann: action.payload,
      };
    case "DEL":
      return {
        ann: state.ann.filter((contact) => contact.id !== action.payload),
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

export const AnnContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AnnContext.Provider value={[state, dispatch]}>
      {props.children}
    </AnnContext.Provider>
  );
};
