import { Link, Outlet } from "react-router-dom";
export default function Navbar() {
    return (
        <>
        <nav className="white"> 
            <div className="nav-wrapper container navBg">
                <Link to="/" className="brand-logo">Fayzullo Aiogram</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link to="/signIn">Kirish</Link></li>
                    <li><Link to="/signUp">Ro'yhatdan o'tish</Link></li>
                    <li><Link to="/profile">Mening profilim</Link></li>
                    <li><Link to="/createpost">Maqola yozish</Link></li>
                </ul>
            </div>
        </nav>
        <Outlet/>
        </>
    )
}