import { Navigate, Outlet, Link } from "react-router-dom"
import axios from 'axios'
import Header from "../components/Header"
import Footer from "../components/Footer"

function Layout() {
    return (
      <>
        <Header />
          <Outlet />
        <Footer />
      </>
    )
}

export default Layout;