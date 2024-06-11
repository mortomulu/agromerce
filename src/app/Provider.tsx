"use client"
import { Provider } from "react-redux";
import { store } from "../redux";


export const ProviderClient = ({children} : any) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}