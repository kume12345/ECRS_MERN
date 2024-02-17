import { Outlet, NavLink, ScrollRestoration } from "react-router-dom"
import Breadcrumbs from "../components/Breadcrumbs"


export default function RootLayout() {
  return (
    <div className="root-layout">
      
      <ScrollRestoration />
      <header>
        <nav>
          <h1>EarthGuard</h1>
          <NavLink to="/">Home</NavLink>
          <NavLink to="system">Report</NavLink>
          <NavLink to="about">About</NavLink>
          <NavLink to="contact">Contact</NavLink>
        </nav>
        <Breadcrumbs />
      </header>
      <main>
        <div className="pages">

        
        <Outlet />
        </div>
      </main>
    </div>
  )
}
