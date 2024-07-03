import { Navigate, Outlet, Link } from "react-router-dom"
import axios from 'axios'
import DashboardHeader from "../../components/DashboardHeader"
import DashboardFooter from "../../components/DashboardFooter"
import DashboardSideBar from "../../components/SideBar"

function DashboardLayout() {
  if(!localStorage["token"]) return (<p>Unauthorized!</p>)
    return (
      <>
        <DashboardHeader />
        <div className="flex">
        <DashboardSideBar />
          <Outlet />
        </div>
      </>
    )
}

export default DashboardLayout;