"use client";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "../redux";

export const SessionProviderClient = ({ children }: any) => {
  return (
    <div>
      <SessionProvider>
        <Provider store={store}>
            {children}
        </Provider>
      </SessionProvider>
    </div>
  );
};
