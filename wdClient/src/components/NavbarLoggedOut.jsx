import { Link } from 'react-router-dom'

export default function NavbarLoggedOut() {
  return (
    <nav className="nav">
    <Link className="navbar-brand" to="/"><img src="https://res.cloudinary.com/dqzjo5wsl/image/upload/v1686301470/watchadoin/xseovpeuapuiazq5j2j0.png"/></Link>
    <div className="signYlogin">
        <Link to="/signup">Sign up |</Link>
        <Link to="/login">Log in</Link>
    </div>
</nav>
  )
}
