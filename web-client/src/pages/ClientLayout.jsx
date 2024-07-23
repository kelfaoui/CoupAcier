import { Navigate, Outlet, Link } from "react-router-dom"
import axios from 'axios'
import DashboardHeader from "../components/DashboardHeader"
import DashboardFooter from "../components/DashboardFooter"
import DashboardSideBar from "../components/SideBar"
import ClientSidebar from "../components/ClientSidebar"
import Header from "../components/Header"

function ClientLayout() {
  if(!localStorage["token"]) return (<p>Unauthorized!</p>)
    return (
      <>
        <Header />
        <div className="flex">
        <ClientSidebar />
          <Outlet />
        </div>
      </>
    )
}

export default ClientLayout;