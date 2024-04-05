import { Navigate, Outlet, Link } from "react-router-dom"
import axios from 'axios'
import DashboardHeader from "../../components/DashboardHeader"
import DashboardFooter from "../../components/DashboardFooter"
import DashboardSideBar from "../../components/SideBar"
import homeImage1 from '/home-products-image-1.png'

function DashboardLayout() {
    return (
      <>
        <div className="flex">
        <DashboardSideBar />
          <Outlet />
        </div>
      </>
    )
}

export default DashboardLayout;