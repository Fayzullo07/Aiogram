import { useContext } from "react";
import {UserContext} from '../App.js'
import { Link, Outlet } from "react-router-dom";
export default function Navbar() {
    const {state} = useContext(UserContext);

    const renderNav = () => {
        if (state) {
            return [
                <>
                    <li><Link to="/profile">Mening profilim</Link></li>
                    <li><Link to="/createpost">Maqola yozish</Link></li>
                </>
            ]
        } else {
            return [
                <li><Link to="/signIn">Kirish</Link></li>
            ]
        }
    }
    return (
        <>
        <nav className="#424242 grey darken-3" style={{height: '10vh'}}> 
            <div className="nav-wrapper container navBg #424242 grey darken-3">
                <Link to={state? "/": "/signin"} className="brand-logo left">Fayzullo Aiogram</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-left">
                    {renderNav()}
                </ul>
            </div>
        </nav>
        <Outlet/>
        </>
    )
}