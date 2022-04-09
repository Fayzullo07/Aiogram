import { useContext, useEffect, useState } from "react";
import "./css/Home.css";
import HomeSideBar from "./HomeSideBar";
import {UserContext} from "../../App";

export default function Home() {
  const [data, setData] = useState([]);
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
  }, []);

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
                        
                          
                            <p>{item.likes.length}</p>
                            <h4>{item.title}</h4>
                            <p>{item.body}</p>
                            <input type="text" placeholder="add a comment" />
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
