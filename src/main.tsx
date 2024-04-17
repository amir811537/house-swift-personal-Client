import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import MyRoute from "./Route/MyRoute.tsx";

import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence } from "framer-motion";
import AuthProvider from "./Providers/AuthProvider/AuthProvider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import AuthProvider from "./Providers/AuthProvider.tsx";
// import { AuthProvider } from "./Providers/AuthProvider.tsx";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <AnimatePresence>
            <RouterProvider router={MyRoute}></RouterProvider>
          </AnimatePresence>
        </HelmetProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
