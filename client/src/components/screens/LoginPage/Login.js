import { Link, useNavigate } from "react-router-dom";
import M from "materialize-css";
export default function Login(props) {
    const navigate = useNavigate();
    const {logEmail, logPassword, setLogEmail, setLogPassword, clicked, setClicked} = props;

    const logData = () => {
        if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(logEmail)){
          M.toast({html: "Email manzilingizni to'g'ri kiriting", classes: "rounded #ff1744 red accent-3"});
          return
        }
  
        fetch("http://localhost:5001/signIn", {
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: logEmail,
            password: logPassword
          })
        }).then(res => res.json()).then(data => {
          if (data.error) {
            M.toast({html: data.error, classes: "rounded #ff1744 red accent-3"});
          } else {
            M.toast({html: "Muvafiqiyatli kirish qildingiz", classes: "rounded #76ff03 light-green accent-3"});
            navigate("/")
          }
        })
      }

  return (
    <div className="form">
      <h2>Kirish</h2>
      <input
        type="text"
        placeholder="Emailingiz"
        value={logEmail}
        onChange={(e) => setLogEmail(e.target.value)}
      />
      <input
        type="password"
        name=""
        placeholder="Parolingiz"
        value={logPassword}
        onChange={(e) => setLogPassword(e.target.value)}
      />
      <button className="btn" type="submit" onClick={() => logData()}>
        Profilga kirish
      </button>
      <p className="signup">
        Accountingiz yo'qmi?
        <Link to="#" onClick={() => setClicked(!clicked)}>
          Ro'yhatdan o'tish
        </Link>
      </p>
    </div>
  );
}
