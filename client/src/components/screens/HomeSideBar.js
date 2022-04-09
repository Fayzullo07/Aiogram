import { useEffect, useState } from "react";

export default function HomeSideBar() {
  const [profile, setProfile] = useState([]);
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
  }, [profile]);

  return (
    <>
      {profile.map((item) => {
        return (
          <div className="card" key={item._id}>
            <div className="card-image">
              <a href={item.photo} target="_blank">
                <img src={item.photo} alt={item._id} />
              </a>
            </div>
            <div className="card-content">
            <h4 className="postedBy1">{item.postedBy.name}</h4>
              <b>{item.title}</b>
              <p>{item.body}</p>
            </div>
          </div>
        );
      }).reverse()}
    </>
  );
}
