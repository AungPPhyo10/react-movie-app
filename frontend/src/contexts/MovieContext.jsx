import {createContext, useState, useContext, useEffect} from "react"

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

// provide state to any of the component that are wrapped around it
export const MovieProvider = ({children}) => {
    const [favourites, setFavourites] = useState([])

    // whenever favourites state changes, update local storage favourites as well
    useEffect(() => {
        const storedFavs = localStorage.getItem("favourites")

        if (storedFavs) setFavourites(JSON.parse(storedFavs))
    }, [])

    useEffect(() => {
        localStorage.setItem('favourites', JSON.stringify(favourites))
    }, [favourites])

    const addToFavourites = (movie) => {
        setFavourites(prev => [...prev, movie])
    }

    const removeFromFavourites = (movieId) => {
        setFavourites(prev => prev.filter(movie => movie.id !== movieId))
    }
    
    const isFavourite = (movieId) => {
        return favourites.some(movie => movie.id === movieId)
    }

    const value = {
        favourites,
        addToFavourites,
        removeFromFavourites,
        isFavourite
    }
    
    // pass the favourites array and context functions
    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}


/** NOTES :
- children is anything that is inside of a component, e.g. <App> is children of <BrowserRouter>
*/