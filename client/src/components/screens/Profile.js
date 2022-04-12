import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import Loader from "../Loader";

export default function Profile() {
  const [profile, setProfile] = useState([]);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:5001/mypost", {
      headers: {
        Authorization: "Fayzullo " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setProfile(result.myPost);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {!profile ? (
        <Loader />
      ) : (
        <div className="profile">
          <div className="profileMain">
            <div>
              <img
                className="profileImg"
                src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
            </div>
            <div>
              <h4>{state ? state.name : "loading..."}</h4>
              <div className="infoProfile">
                <p>{profile.length} posts</p>
                <p>{state ? state?.followers.length : "0"} followes</p>
                <Link to='/myfollowerpost'>
                  <p>{state ? state?.following.length : "0"} following</p>
                </Link>
              </div>
            </div>
          </div>

          <div className="gallery">
            {profile.length ? (
              profile.map((item) => {
                return (
                  <div className="img-item">
                    <img src={item.photo} alt={item._id} />
                  </div>
                );
              })
            ) : (
              <h1>No Photo</h1>
            )}
          </div>
        </div>
      )}
    </>
  );
}
