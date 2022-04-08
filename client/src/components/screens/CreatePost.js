import { useState } from "react";
import { useNavigate } from "react-router-dom";
import M from "materialize-css";

export default function CreatePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "Fayzullo");
    data.append("cloud_name", "du5hfz4yk");
    fetch("https://api.cloudinary.com/v1_1/du5hfz4yk/image/upload", {
      method: "post",
      body: data
    }).then(res => res.json()).then((data) => {
      console.log(data)
      setUrl(data.secure_url);
    }).catch((err) => {
      console.log(err)
    })

    fetch("http://localhost:5001/createpost", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        body,
        pic: url
      })
    }).then(res => res.json()).then(() => {
      console.log(data);
      if (data.error) {
        M.toast({html: data.error, classes: "rounded #ff1744 red accent-3"})
      } else {
        M.toast({html: data.msg, classes: "rounded #76ff03 light-green accent-3"})
        navigate("/")
      }
    })
  }

  return (
    <div className="card cardPost">
      <div className="card-image">
        <img
          src={!url? "https://images.unsplash.com/photo-1575980861964-fab2c3a7cc24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8dGFrZSUyMHBob3RvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60": url}
          alt="imgphoto"
        />
        <span className="card-title">Rasm joylang</span>
        <div className="btn-floating halfway-fab waves-effect waves-light red">
          <div className="file-field input-field">
            <div className="moved_center pb-2">
              <span>
                <i className="material-icons">add</i>
              </span>
              <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="hidden" />
            </div>
          </div>
        </div>
      </div>
      <div className="card-content center-align">
        <div className="input-field col s6">
          <i className="material-icons prefix">subtitles</i>
          <input id="icon_prefix" type="text" className="validate" value={title} onChange={(e) => setTitle(e.target.value)}/>
          <label htmlFor="icon_prefix">Sarlavha</label>
        </div>
        <div className="input-field col s6">
          <i className="material-icons prefix">content_paste</i>
          <input id="icon_prefix" type="text" className="validate" value={body} onChange={(e) => setBody(e.target.value)} />
          <label htmlFor="icon_prefix">Maqola</label>
        </div>
        <button className="btn" onClick={() => postDetails()}>Maqola qo'shish</button>
      </div>
    </div>
  );
}

// 2Anev6hM2DgGrh(