import '../css/ActorCard.css';

function ActorCard({actor}) {

    const gender_status = actor.gender == 2 ? "Male" : "Female";
    const movies = actor.known_for;
    const actor_movies = [];
    if (actor.known_for_department == "Acting") {       // check whether actor or not
        for (let i=0; i<movies.length; i++) {
            actor_movies.push(movies[i].title);
        }
    }  

    return (
        <div className="actor-card">
        <div className="actor-photo">
            <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name}/> 
        </div>
        <div className="actor-info">
            <h3>{actor.name}</h3>
            <p><strong>Gender :</strong> {gender_status}</p>
            <p><strong>Popularity :</strong> {actor.popularity}</p>
            <p><strong>Movies :</strong> {actor_movies.join(" , ")}</p>
        </div>
        </div>
    )
}

export default ActorCard;