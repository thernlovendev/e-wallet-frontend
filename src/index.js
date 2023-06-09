import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import "assets/css/nucleo-icons.css";
import "assets/css/nucleo-svg.css";
import "assets/css/soft-ui-dashboard.css";
import 'bootstrap/dist/css/bootstrap.min.css';

// Soft UI Dashboard React Context Provider
import { SoftUIControllerProvider } from "context";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
  <SoftUIControllerProvider>
    <App />
  </SoftUIControllerProvider>
</BrowserRouter>
)