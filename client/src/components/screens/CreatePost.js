export default function CreatePost() {
    return (
        <div className="card input-field postCard">
            <h2>Maqola</h2>
            <input type="text" placeholder="title" />
            <input type="text" placeholder="body" />
            <div class="file-field input-field">
            <div className="btn">
                <span>File</span>
                <input type="file" />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
            <button className="waves-effect waves-light btn">Maqola qo'shish</button>
        </div>
    )
}