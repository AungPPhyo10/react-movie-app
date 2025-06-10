import {useRef} from 'react';

function Useref() {
    const count = useRef(2);    // mutable value, does NOT re-render UI, will keep same reference between renders

    return (
    <div>
        <u>useRef hook example</u>
        <br/>
        <button type="button" onClick={() => count.current++ }>
            Click Me!
        </button>
        <br/>
        {count.current}
    </div>
    )
}

export default Useref;