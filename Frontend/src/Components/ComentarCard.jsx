const CommentCard = ({ username="Pepe pene loco", service="Lustrada de sable oral", date="2024-10-30",msg}) => {
    return (
        <div className="comment-card">
            <div className="card-header">
                <h3 className="username">Emisor {username}</h3>
                <span className="comment-date">{new Date(date).toLocaleDateString()}</span>
            </div>
            <div className="card-body">
                <p className="service">Servicio: <strong>{service}</strong></p>
            </div>
            <textarea value={msg}/>
        </div>
    );
};
export default CommentCard