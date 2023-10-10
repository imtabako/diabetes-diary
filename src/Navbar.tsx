import {Link, useMatch, useResolvedPath} from "react-router-dom";

import './Navbar.css'

function Navbar() {
  return (
    <nav className="nav">
      <ul>
        <AppLink to="/today">Today</AppLink>
        <AppLink to="/">List</AppLink>
        <AppLink to="/graphs">Graphs</AppLink>
        <AppLink to="/stats">Statistics</AppLink>
      </ul>
    </nav>
  )
}

function AppLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({path: resolvedPath.pathname, end: true})

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}

export default Navbar
