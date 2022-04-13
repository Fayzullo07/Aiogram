import { useState } from "react";
import { Link } from "react-router-dom";
import "./css/SignIn.css";
import M from "materialize-css";
import Login from "./LoginPage/Login";

export default function SignIn() {
  const [regName, setRegName] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [logEmail, setLogEmail] = useState("");
  const [logPassword, setLogPassword] = useState("");
  const [clicked, setClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const postData = () => {
    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        regEmail
      )
    ) {
      M.toast({
        html: "Email manzilingizni to'g'ri kiriting",
        classes: "rounded #ff1744 red accent-3",
      });
      return;
    }
    fetch("http://localhost:5001/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: regName,
        email: regEmail,
        password: regPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({
            html: data.error,
            classes: "rounded #ff1744 red accent-3",
          });
        } else {
          M.toast({
            html: data.msg,
            classes: "rounded #76ff03 light-green accent-3",
          });
          setClicked(!clicked);
        }
      });
  };

  return (
    <>
      <section>
        <div className={clicked ? "container active" : "container"}>
          <div className="user signinBx">
            <div className="imgBx">
              <img
                src="https://images.unsplash.com/photo-1631624215749-b10b3dd7bca7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGhhY2tpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                alt="sign"
              />
            </div>
            <div className="formBx">
              <Login
                logEmail={logEmail}
                logPassword={logPassword}
                setLogEmail={setLogEmail}
                setLogPassword={setLogPassword}
                clicked={clicked}
                setClicked={setClicked}
              />
            </div>
          </div>
          <div className="user signupBx">
            <div className="formBx">
              <div className="form">
                <h2 style={{ margin: 0 }}>Ro'yhatdan o'tish</h2>
                <div class="containers">
                  <img
                    src="https://res.cloudinary.com/du5hfz4yk/image/upload/v1649849712/3f9470b34a8e3f526dbdb022f9f19cf7_uis4gs.jpg"
                    alt="Avatar"
                    class="images"
                  />
                  <div class="middles">
                    <button onClick={() => setShowModal(true)} class="btn">
                      <i className="material-icons">add_a_photo</i>
                    </button>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Ismingiz"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email Manzilingiz"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Parolingiz"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                />
                <button
                  className="btn"
                  type="submit"
                  onClick={() => postData()}
                >
                  Ro'yhatdan o'tish
                </button>
                <p className="signup">
                  Accountingiz bormi ?
                  <Link to="#" onClick={() => setClicked(!clicked)}>
                    Accountga kirish
                  </Link>
                </p>
              </div>
            </div>
            <div className="imgBx">
              <img
                src="https://images.unsplash.com/photo-1635407640793-72dd329d218a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aGFja2luZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                alt="sign"
              />
            </div>
          </div>
        </div>
        {showModal ? (
          <div className="modal1">
            <div className="modal_content1">
              <div className="modalHeader">
                <i
                  style={{ cursor: "pointer" }}
                  className="material-icons"
                  onClick={() => setShowModal(false)}
                >
                  close
                </i>
                <h4>Add Your Account Photo</h4>
              </div>
              <div className="modalContent">
                <div class="file-field input-field">
                  <div class="btn">
                  <i className="material-icons">add_a_photo</i>
                    <input type="file" multiple />
                  </div>
                  <div class="file-path-wrapper">
                    <input
                      class="file-path validate"
                      type="text"
                      placeholder="Upload one or more files"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </>
  );
  // return(
  //     <div classNameName="mycard">
  //         <div classNameName="card card__auth">
  //             <h2>Fayzullo Aiogram</h2>
  //             <div className="input-field col s6">
  //                 <i className="material-icons prefix">email</i>
  //                 <input id="icon_prefix" type="text" className="validate"/>
  //                 <label for="icon_prefix">Pochta manzilingizni</label>
  //             </div>
  //             <div className="input-field col s6">
  //                 <i className="material-icons prefix">password</i>
  //                 <input id="icon_prefix" type="text" className="validate"/>
  //                 <label for="icon_prefix">Parolingiz</label>
  //             </div>
  //             <button classNameName="waves-effect waves-light btn #0d471a blue darken-4">Kirish</button>
  //             <p>
  //                 <Link to="/signUp">Do not you have an account?</Link>
  //             </p>
  //         </div>
  //     </div>
  // )
}
