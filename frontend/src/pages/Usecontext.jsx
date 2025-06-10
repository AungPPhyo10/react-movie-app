import {createContext, useContext} from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import Useref from './Useref';
import Usecallback from './Usecallback';
import Usememo from './Usememo';
import Usereducer from './Usereducer';

const moods = {
    happy: 'Yayy!',
    sad: 'Hmm...',
    angry: 'Grghhhh!'
}

const MoodContext = createContext(moods);       // create context to share data without pasisng props

function Usecontext() {
    // context provider needs a value parameter
    return (
        <MoodContext.Provider value={moods.angry}>
            <MoodText/>
        </MoodContext.Provider>
    )
} 

function MoodText() {
    
    const mood = useContext(MoodContext);       // consume value from nearest parent provider
    return <div>
        <h2>{mood}</h2>
        <br/>
        <Routes>
            <Route path="/useref" element={<Useref />} />
            <Route path="/usereducer" element={<Usereducer />} />
            <Route path="/usememo" element={<Usememo/>} />
            <Route path="/usecallback" element={<Usecallback />} />
        </Routes>
        <br/>
        
        <ul>
            <li><Link to="/usecontext/useref" className="nav-link">useRef hook</Link></li>
            <li><Link to="/usecontext/usereducer" className="nav-link">useReducer hook</Link></li>
            <li><Link to="/usecontext/usememo" className="nav-link">useMemo hook</Link></li>
            <li><Link to="/usecontext/usecallback" className="nav-link">useCallback hook</Link></li>
        </ul>
        
    </div>
}

export default Usecontext;
