import React from "react";
import "./App.scss";
import { AppRoutes } from "./routes";
import { QueryClient, QueryClientProvider } from "react-query";
import { Header } from "./app/components/Header";
import { BrowserRouter } from "react-router-dom";
import { Test } from "./app/ErrorPage/test";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <AppRoutes />
        <Test/>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
