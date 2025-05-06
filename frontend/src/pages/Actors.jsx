import ActorCard from '../components/ActorCard';
import {useState, useEffect} from "react";
import {getPopularActors, searchActors} from "../services/api.js";
import '../css/Actors.css';

function Actors() {
    const [searchQuery, setSearchQuery] = useState("");
    const [actors, setActors] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const loadPopularActors = async() => {
            try {
                setLoading(true);
                const popularActors = await getPopularActors()
                setActors(popularActors);
            } catch (error) {
                console.error(error);
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        loadPopularActors();
    }, [])

    const handleSearch = async (e) => {
        e.preventDefault();     // disables auto refresh when submitting form
        
        if (!searchQuery.trim()) return;
        if (loading) return;        // does not allow double search
        setLoading(true);           // set loading status to true again

        try {
            const searchResults = await searchActors(searchQuery)
            setActors(searchResults);
            setError(null);
        } catch (err) {
            console.error(err);
            setError("Failed to search actors...")
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="actor-page">
            <form onSubmit={handleSearch} className="search-form">
                <input type="text" placeholder="Search for an actor" className="search-input" 
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                <button type="submit" className="search-button">Search</button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {loading ? <div className="loading">Loading...</div> :
                <div className="actors-grid">   
                    {actors.map(
                        (actor) => (
                        actor.name.toLowerCase().startsWith(searchQuery) &&
                        <ActorCard actor={actor} key={actor.id}/>   
                        )
                    )} 
                </div>
            }   
        </div>
    )
}

export default Actors;