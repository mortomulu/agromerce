import { ReactElement, ReactNode } from "react"
import { NextPage } from "next"
import Navbar from "@/components/navbar/Navbar";

interface TypeLayout {
    children?: ReactNode;
  }

const AdminLayout : NextPage<TypeLayout> = (props) : ReactElement => {
    return (
        <div>
            <Navbar/>
            <div>{props?.children}</div>
        </div>
    )
} 

export default AdminLayout