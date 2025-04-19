import React from "react";
import StackNavigator from "./StackNavigator";
import { ThemeContextProvider } from "../constants/ThemeContext";
import QueryClientProvider from "../lib/QueryClientProvider";

const Route = () => {
  return (
    <ThemeContextProvider>
      <QueryClientProvider>
        <StackNavigator />
      </QueryClientProvider>
    </ThemeContextProvider>
  );
};

export default Route;
