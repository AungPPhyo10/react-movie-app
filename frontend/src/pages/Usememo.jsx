import {useMemo, useState} from 'react';

function Usememo() {
    const [count, setCount] = useState(60);
    const [score, setScore] = useState(0);

    // cache result of an expensive function, use ONLY when necessary to optimize performance
    const expensiveCount = useMemo(() => {
        for (let i=0; i<100000; i++) {
            // this could be an example of an expensive function
        }
        return count**2;
    }, [count])     // add dependency to determine when this compution runs (whenever count changes)
    
    return (
    <div>
        <u>useMemo hook</u>
        <br/>
        {expensiveCount}
        <br/><br/>
        <button type="button" onClick={(event) => setScore(score+1)}>Add</button>
        <br/>
        Score : {score}
    </div>
    )
}

export default Usememo;