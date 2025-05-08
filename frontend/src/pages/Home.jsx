import MovieCard from '../components/MovieCard';
import GenreCard from '../components/GenreCard';
import {searchMovies, getPopularMovies, getGenres} from "../services/api.js";
import {useState, useEffect, useRef} from "react";     // State = live memory of component, updates UI(renders) whenever there's a change
import '../css/Home.css'

function Home () {
    // searchQuery=current value , setSearchQuery=function to update memory
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);        // state to store fetched movie data
    const [genres, setGenres] = useState([]);        // state to store fetched genres
    const [error, setError] = useState(null);        // state to store error   
    const [loading, setLoading] = useState(true);    // state to store loading status
    const lastSearch = useRef("");

    // useEffect allows to add side effects to components and define when they should run, like setTimeOut, calling APIs
    // run the function once the component mounts
    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies);       // update the current state to fetched data array
            } catch (err) {
                console.log(err)
                setError("Failed to load movies...");
            } finally {
                setLoading(false);
            }
        }
        loadPopularMovies();
    }, [])      // empty array - run this effect only once when the component mounts    
    // ***** Preserve the movie data array and display its data unless there's a state change ******

    useEffect(() => {
        const loadGenres = async() => {
            try {
                const genreList = await getGenres()
                setGenres(genreList);
            } catch (err) {
                console.log(err)
                setError("Failed to load genres");
            } finally {
                setLoading(false);
            }
        }
        loadGenres();
    }, [])

    const handleSearch = async (e) => {
        e.preventDefault();     // disables auto refresh when submitting form
        
        if (!searchQuery.trim()) return;
        if (loading) return;        // does not allow double search
        setLoading(true);           // set loading status to true again
        lastSearch.current = searchQuery;

        try {
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        } catch (err) {
            console.log(err)
            setError("Failed to search movies...")
        } finally {
            setLoading(false)
        }

        // setSearchQuery("------");    // can set the search bar to empty at last
    
    }

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input type="text" placeholder="Search for a movie" className="search-input" 
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                <button type="submit" className="search-button">Search</button>
            </form>
            <p className="last-search">Last Searched : {lastSearch.current}</p>

            {error && <div className="error-message">{error}</div>}

            {loading ? <div className="loading">Loading...</div> :
                <div className="movies-grid">
                    {movies.map(
                        (movie) => (
                        movie.title.toLowerCase().startsWith(searchQuery) &&
                        <MovieCard movie={movie} key={movie.id}/>   // tell React to use key(id) as unique identifier
                        )
                    )} 
                </div>
            }

            <br/>  
            <hr/>
            <br/>
            
            <div className="genre-row">
            <h2 align="center">Movie Genres</h2>
            {genres.map((genre) => (
                <GenreCard key={genre.id} genre={genre} />
            ))}
            </div>
        </div>
    );
}

export default Home;

/** NOTES :
- React only re-renders only when there's a state change
*/
