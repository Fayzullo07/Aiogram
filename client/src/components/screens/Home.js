import { useContext, useEffect, useState } from "react";
import "./css/Home.css";
import HomeSideBar from "./HomeSideBar";
import {UserContext} from "../../App";
import M from "materialize-css";

export default function Home() {
  const [data, setData] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const {state} = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:5001/allpost", {
      headers: {
        Authorization: "Fayzullo " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data]);

  const likePost = (id) => {
    fetch("http://localhost:5001/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Fayzullo " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id
      })
    }).then((res) => res.json()).then((result) => {
      const newData = data.map((item) => {
        if(item._id === result._id) {
          return result;
        } else {
          return item;
        }
      });
      setData(newData);
      console.log(result);
    }).catch((err) => {
      console.log(err);
    })
  }

  const unlikePost = (id) => {
    fetch("http://localhost:5001/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Fayzullo " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id
      })
    }).then((res) => res.json()).then((result) => {
      const newData = data.map((item) => {
        if(item._id === result._id) {
          return result;
        } else {
          return item;
        }
      });
      setData(newData);
    }).catch((err) => {
      console.log(err);
    })
  }

  const commentPost = (text, postId) => {
    fetch("http://localhost:5001/comments", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Fayzullo " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text
      })
    }).then(res => res.json()).then((result) => {
        if(result.error) {
          M.toast({html: result.error, classes: 'rounded #ff1744 red accent-3'})
        }
        console.log(result)
    }).catch((err) => {
      console.log(err)
    })
  }

  const deletePost = (postId) => {
    fetch(`http://localhost:5001/deletepost/${postId}`, {
      method: "delete",
      headers: {
        Authorization: "Fayzullo " + localStorage.getItem("jwt"),
      }
    }).then(res => res.json()).then((result) => {
        console.log(result)
        M.toast({html: result.msg, classes: "rounded #76ff03 light-green accent-3"});
    }).catch((err) => {
      console.log(err)
    })
  }
  return (
    <div className="home">
      <div className="home">
        <div className="post__items">
          <div className="left__side">
            {data.map(item => {
                return (
                    <div className="card home__card" key={item._id}>
                        <h4 className="postedBy">{item.postedBy.name}</h4>
                        <div className="card-image">
                            <a href={item.photo}><img
                            src={item.photo}
                            alt={item._id}
                            /></a>
                        </div>
                        <div className="card-content">
                          {item.likes.includes(state._id) ? (
                            <i onClick={() => {
                              unlikePost(item._id);
                            }} className="material-icons like"  style={{ color: "red" }}>
                            favorite
                            </i>

                          ):(
                            <i onClick={() => {
                              likePost(item._id)
                            }} className="material-icons like">
                            favorite
                            </i>

                          )}
                        
                            <i onClick={() => setShowComments(!showComments)} style={{color: "green"}} className="material-icons like" >comment</i>
                            {item.postedBy._id === state._id && (
                              <i onClick={() => deletePost(item._id)} style={{color: "red"}} className="material-icons like">delete_forever</i>
                            )}
                            <p>{item.likes.length} likes</p>
                            <h4>{item.title}</h4>
                            <p>{item.body}</p>
                            {showComments? (
                              item.comments.map(s => (
                                <p key={s._id} >
                                  <b>{s.postedBy.name}: </b> {s.text}
                                </p>
                              ))

                            ):<p>Comments: {item.comments.length}</p>}
                            <form onSubmit={(e) => {
                              e.preventDefault();
                              commentPost(e.target[0].value, item._id);
                              e.target[0].value = "";
                            }}>
                              <input type="text" placeholder="add a comment" />
                            </form>
                        </div>
                    </div>
                )
            }).reverse()}
          </div>
          <div className="right__side">
          <h2 style={{color: "#fff", fontFamily: "'Grand Hotel', cursive"}}>Mening postlarim</h2>

            <HomeSideBar/>
          </div>
        </div>
      </div>
    </div>
  );
}
