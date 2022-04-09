import { useContext } from "react";
import { UserContext } from "../App.js";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const renderNav = () => {
    if (state) {
      return [
        <>
          <li>
            <Link to="/profile">
              <i className="medium material-icons">person</i>
            </Link>
          </li>
          <li>
            {" "}
            <Link to="/createpost">
              <i className="medium material-icons">playlist_add</i>
            </Link>{" "}
          </li>
          <li>
            <Link
              style={{ color: "red" }}
              onClick={() => {
                localStorage.clear();
                dispatch({ type: "CLEAR" });
                navigate("/signin");
              }}
              className="large material-icons"
              to="/signin"
            >
              <i className="medium material-icons">exit_to_app</i>
            </Link>{" "}
          </li>
        </>,
      ];
    } else {
      return [
        <li>
          {" "}
          <Link to="/signin">
            <i className="medium material-icons">input</i>
          </Link>{" "}
        </li>,
      ];
    }
  };
  return (
    <>
      <div className="navBar">
        <div className="navigationBar">
          <div className="mainPage">
            <Link to={state ? "/" : "/signin"}>
              <i className="medium material-icons">home</i>
            </Link>
          </div>
          <div className="navLink">
            <ul>{renderNav()}</ul>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}
