import { useState } from "react";
import { Link } from "react-router-dom";
import "./css/SignIn.css"
export default function SignIn() {
    const [regName, setRegName] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [clicked, setClicked] = useState(false);

    const postData = () => {
      fetch("http://localhost:5001/signUp", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: regName,
          email: regEmail,
          password: regPassword
        })
      }).then(res => res.json()).then(data => console.log(data))
    }

    return (
        <>
        <section>
          <div className={clicked ? "container active": "container"}>
            <div className="user signinBx">
              <div className="imgBx"><img src="https://images.unsplash.com/photo-1576859958081-27de5c70262a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80" alt="sign"/></div>
              <div className="formBx">
                <div className="form">
                  <h2>Kirish</h2>
                  <input type="text" name="" placeholder="Ismingiz yoki Emailingiz" />
                  <input type="password" name="" placeholder="Parolingiz" />
                  <input type="submit" name="" value="Login" />
                  <p className="signup">
                    Accountingiz yo'qmi?<Link to="#" onClick={() => setClicked(!clicked)}>
                      Ro'yhatdan o'tish
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="user signupBx">
              <div className="formBx">
                <div className="form">
                  <h2>Ro'yhatdan o'tish</h2>
                  <input type="text" placeholder="Ismingiz" value={regName} onChange={(e) => setRegName(e.target.value)}/>
                  <input type="email" placeholder="Email Manzilingiz" value={regEmail} onChange={(e) => setRegEmail(e.target.value)}/>
                  <input type="password" placeholder="Parolingiz" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} />
                  <button className="btn" type="submit" onClick={() => postData()}>Ro'yhatdan o'tish</button>
                  <p className="signup">
                    Accountingiz bormi ?
                    <Link to="#" onClick={() => setClicked(!clicked)}>Accountga kirish</Link>
                  </p>
                </div>
              </div>
              <div className="imgBx"><img src="https://images.unsplash.com/photo-1628972799193-1a6be77e183e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80" alt="sign"/></div>
            </div>
          </div>
        </section>
     
      </>
    )
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