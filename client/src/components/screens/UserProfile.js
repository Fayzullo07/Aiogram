import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../App";
import { useParams } from "react-router-dom";
import Loader from "../Loader";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const { state, dispatch } = useContext(UserContext);
  const {userId} = useParams();

  useEffect(() => {
      fetch(`http://localhost:5001/user/${userId}`, {
        headers: {
          Authorization: "Fayzullo " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setProfile(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }, [profile]);

  const followUser = () => {
    fetch("http://localhost:5001/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Fayzullo " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId
      })
    }).then(res => res.json()).then(data => {
      console.log(data);
    })
  }

  const unFollowUser = () => {
    fetch("http://localhost:5001/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Fayzullo " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        unfollow: userId
      })
    }).then(res => res.json()).then(data => {
      console.log(data);
    })
  }

  return (
    <>
    {!profile ? <Loader/> : (
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
            <h4>{profile.user ? profile.user.name : "loading..."}</h4>
            <div className="infoProfile">
              <p>{profile.posts.length} posts</p>
              <p>99 followes</p>
              <p>99 following</p>
            </div>
            <button>Follow</button>
          </div>
        </div>
        <div className="gallery">
          {profile.posts.map((item) => {
            return (
              <div className="img-item">
                <img src={item.photo} alt={item._id} />
              </div>
            );
          })}
        </div>
      </div>

    )}
    </>
  );
};

export default UserProfile;
