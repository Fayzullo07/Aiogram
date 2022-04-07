import { Link, Outlet } from "react-router-dom";
export default function Navbar() {
    return (
        <>
        <nav className="#424242 grey darken-3" style={{height: '10vh'}}> 
            <div className="nav-wrapper container navBg #424242 grey darken-3">
                <Link to="/" className="brand-logo left">Fayzullo Aiogram</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-left">
                    <li><Link to="/signIn">Kirish</Link></li>
                    <li><Link to="/profile">Mening profilim</Link></li>
                    <li><Link to="/createpost">Maqola yozish</Link></li>
                </ul>
            </div>
        </nav>
        <Outlet/>
        </>
    )
}