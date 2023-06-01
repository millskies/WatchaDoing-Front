import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="nav">
    <h3 className="logo"><Link to="/">WatchaDoin?</Link></h3>
    <div className="profile">
        <Link className="link" to="/notifications">Notifications</Link>
        <Link className="link" to="/menu">Menu</Link>
    </div>
</nav>
  )
}
