import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "App";
import reportWebVitals from "./reportWebVitals";
import { configureFakeBackend, store } from "./helpers";
import { Provider } from "react-redux";
import { AuthProvider } from "./context/authProvider";
// configureFakeBackend();
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        {/* <Provider > */}
        <AuthProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
