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
                src={state.photo}
                alt="Profile_Photo"
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
