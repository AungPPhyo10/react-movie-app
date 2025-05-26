import {createContext, useState, useContext, useEffect} from "react"

const MovieContext = createContext();       // create context syntax

export const useMovieContext = () => useContext(MovieContext)       // use context, this will be used around components

// provide state to any of the component that are wrapped around it
export const MovieProvider = ({children}) => {
    const [favourites, setFavourites] = useState([])

    // on first load, fetch saved favourites from local storage and set state
    useEffect(() => {
        const storedFavs = localStorage.getItem("favourites")

        if (storedFavs) setFavourites(JSON.parse(storedFavs))
    }, [])      // empty array = no dependencies

    // run everytime 'favourites' state changes, syncs with localStorage
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