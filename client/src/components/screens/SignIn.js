import { Link } from "react-router-dom";

export default function SignIn() {
    return(
        <div className="mycard">
            <div className="card card__auth">
                <h2>Fayzullo Aiogram</h2>
                <div class="input-field col s6">
                    <i class="material-icons prefix">email</i>
                    <input id="icon_prefix" type="text" class="validate"/>
                    <label for="icon_prefix">Pochta manzilingizni</label>
                </div>
                <div class="input-field col s6">
                    <i class="material-icons prefix">password</i>
                    <input id="icon_prefix" type="text" class="validate"/>
                    <label for="icon_prefix">Parolingiz</label>
                </div>
                <button className="waves-effect waves-light btn #0d471a blue darken-4">Kirish</button>
                <p>
                    <Link to="/signUp">Do not you have an account?</Link>
                </p>
            </div>
        </div>
    )
}