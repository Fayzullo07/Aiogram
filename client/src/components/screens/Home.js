import { useEffect, useState } from "react";
import "./css/Home.css";
import HomeSideBar from "./HomeSideBar";

export default function Home() {
  const [data, setData] = useState([]);
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
                            <a href={item.photo} target="_blank"><img
                            src={item.photo}
                            alt={item._id}
                            /></a>
                        </div>
                        <div className="card-content">
                            <i className="material-icons" style={{ color: "red" }}>
                            favorite
                            </i>
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
