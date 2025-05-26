import './css/App.css'
import Favourites from './pages/Favourites'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Actors from './pages/Actors'
import MovieDetails from './pages/MovieDetails'
import {Routes, Route} from 'react-router-dom'
import {MovieProvider} from './contexts/MovieContext'
/**
If named export => use {MovieCard} to import
If default export => use MovieCard to import 
*/

function App() {

  return (
    // wrap around the MovieProvider context to pass states
    <MovieProvider>   
      <Navbar />
      <main className="main-content">
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/actors" element={<Actors/>} />
          <Route path="/favourites" element={<Favourites/>} />
          <Route path="/movie/:id" element={<MovieDetails/>} />
      </Routes>
      </main>
    </MovieProvider>
    
  )
}

export default App

/** NOTES :
- React SWAPS components based on the routes
- Component swap, page re-rendering only happens with react-router-dom
- The current app is SPA(Single Page Application), Navigation should happen inside React
- Using manual page links will reload the whole app and page, and DOES NOT CONSERVE app state
*/
