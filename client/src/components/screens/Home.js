import { useEffect, useState } from "react";
import "./css/Home.css";
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
        console.log(data);
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
            })}
          </div>
          <div className="right__side">
          <div className="card home__card">
              <h4>Fayzullo</h4>
              <div className="card-image">
                <img
                  src="https://images.unsplash.com/photo-1491466424936-e304919aada7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8d2FsbHBhcGVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  alt="img"
                />
              </div>
              <div className="card-content">
                <i className="material-icons" style={{ color: "red" }}>
                  favorite
                </i>
                <h6>Title</h6>
                <p>It is my first post</p>
                <input type="text" placeholder="add a comment" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
