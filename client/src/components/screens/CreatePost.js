import {Link} from 'react-router-dom';

export default function CreatePost() {
  return (
    <div className="card cardPost">
      <div className="card-image">
        <img src="https://images.unsplash.com/photo-1575980861964-fab2c3a7cc24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8dGFrZSUyMHBob3RvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt='imgphoto'/>
        <span className="card-title">Rasm joylang</span>
        <Link to='/' className="btn-floating halfway-fab waves-effect waves-light red">
            <div className="file-field input-field">
                <div className="moved_center pb-2">
                    <span><i className="material-icons">add</i></span>
                    <input type="file"/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                </div>
            </div>
        </Link>
      </div>
      <div className="card-content">
        <div className="input-field col s6">
          <i className="material-icons prefix">subtitles</i>
          <input id="icon_prefix" type="text" className="validate" />
          <label htmlFor="icon_prefix">Sarlavha</label>
        </div>
        <div className="input-field col s6">
          <i className="material-icons prefix">content_paste</i>
          <input id="icon_prefix" type="text" className="validate"/>
          <label htmlFor="icon_prefix">Maqola</label>
        </div>
      </div>
    </div>
  );
}
