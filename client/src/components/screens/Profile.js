import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import Loader from "../Loader";

export default function Profile() {
  const [profile, setProfile] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState("");

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

  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "Fayzullo");
      data.append("cloud_name", "du5hfz4yk");
      fetch("https://api.cloudinary.com/v1_1/du5hfz4yk/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          fetch("http://localhost:5001/updatephoto", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Fayzullo " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              photo: data.url,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              localStorage.setItem(
                "user",
                JSON.stringify({ ...state, photo: result.photo })
              );
              dispatch({ type: "UPDATEPHOTO", payload: result.photo });
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [image]);

  // useEffect(() => {
  //   if(image){
  //     const data = new FormData();
  //     data.append("file", image);
  //     data.append("upload_preset", "Fayzullo");
  //     data.append("cloud_name", "du5hfz4yk");
  //     fetch("https://api.cloudinary.com/v1_1/du5hfz4yk/image/upload", {
  //       method: "post",
  //       body: data
  //     }).then(res => res.json()).then((data) => {
  //       console.log(data)
  //       setUrl(data.url);
  //       localStorage.setItem("user", JSON.stringify({...state, photo: data.url}))
  //       dispatch({type: "UPDATEPHOTO", payload: data.url})
  //     }).catch((err) => {
  //       console.log(err)
  //     }) 
  //   }
  // }, [image])

  const updatePhoto = (file) => {
    setImage(file)
    
  }

  return (
    <>
      {!profile ? (
        <Loader />
      ) : (
        <div className="profile">
          <div className="profileMain">
            <div className="how">
              <img
                className="profileImg"
                src={state ? state.photo: "Loading"}
                alt="Profile_Photo"
              />
              <div className="middleS">
                <button onClick={() => setShowModal(true)} className="btn">
                  <i className="material-icons">add_a_photo</i>
                </button>
              </div>
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
      {showModal ? (
          <div className="modal2" onClick={() => setShowModal(false)}>
            <div className="modal_content1" onClick={(e) => e.stopPropagation()}>
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
                <div className="file-field input-field">
                  <div className="btn">
                  <i className="material-icons">add_a_photo</i>
                    <input type="file" onChange={(e) => updatePhoto(e.target.files[0])} />
                  </div>
                  <div className="file-path-wrapper">
                    <input
                      className="file-path validate"
                      type="text"
                      placeholder="Upload one or more files"
                    />
                  </div>
                </div>
              </div>
              <div className="modalFooter">
                <button className="btn" onClick={() => setShowModal(false)}>Save Image</button>
              </div>
            </div>
          </div>
        ) : null}
    </>
  );
}
