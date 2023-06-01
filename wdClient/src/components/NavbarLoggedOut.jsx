import "../css/NavbarLoggedOut.css"
import { Link } from 'react-router-dom'

export default function NavbarLoggedOut() {
  return (
    <nav className="nav">
    <h3 className="logo"><Link to="/">WatchaDoin?</Link></h3>
    <div className="signYlogin">
        <Link to="/signup">Sign up |</Link>
        <Link to="/login">Log in</Link>
    </div>
</nav>
  )
}
