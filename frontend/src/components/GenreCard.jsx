import '../css/Genre.css'

function GenreCard({genre}) {
    return (
        <>
        <div className="genre-card" >
            <p>{genre.name}</p>
        </div>
        </>
    )
}

export default GenreCard;