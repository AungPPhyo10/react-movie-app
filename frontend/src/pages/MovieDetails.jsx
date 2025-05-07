import React from 'react'
import {useParams, Link} from 'react-router-dom';
import {useState, useEffect} from "react";
import {getMovieDetails} from '../services/api.js';
import '../css/MovieDetails.css';

function MovieDetails() {
  const {id} = useParams();
  const [movieInfo, setMovieInfo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(()=> {
    const fetchMovieDetails = async () => {
      try {
        const details = await getMovieDetails(id);
        setMovieInfo(details)
      } catch (error) {
        console.error(error)
        setError(error)
      } finally {
        setLoading(false);
      }
    }
    fetchMovieDetails();
  },[id])

  if (loading) return <h3 className="info-message">Loading...</h3>;
  if (error) return <h3 className="info-message">Error encountered! Please try again later!</h3>
  if (!movieInfo) return <h3 className="info-message">Movie not found</h3>;

  return (
    <div className="movie-details">
      <Link to="/" className="back-button">⟵ Go Back</Link>
      <div className="details-content">
        <div className="image-side">
          <img src={`https://image.tmdb.org/t/p/w500${movieInfo.backdrop_path}`} alt={movieInfo.title} />
          <p className="tagline">"{movieInfo.tagline}"</p>
        </div>
        <div className="info-side">
          <h2>{movieInfo.original_title}</h2>
          <p><strong>Release Date:</strong> {movieInfo.release_date}</p>
          <p><strong>Runtime:</strong> {movieInfo.runtime} min</p>
          <p><strong>Genres:</strong></p>
          <ul>
            {movieInfo.genres.map(g => (
              <li key={g.id}>{g.name}</li>
            ))}
          </ul>
          <p><strong>Overview:</strong><br />{movieInfo.overview}</p>
          <p><strong>Budget:</strong> ${movieInfo.budget?.toLocaleString()}</p>
          <a href={movieInfo.homepage} target="_blank" rel="noopener noreferrer" className="link-button">Visit Movie Page</a>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;