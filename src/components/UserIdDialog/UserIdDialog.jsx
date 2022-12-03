import { useState } from "react"


export default function UserIdDialog({ setUserId }) {
    const [stringId, setStringId] = useState();
    return (
        <div>
             <label for="fname">UserId:</label>
            <input type="text" id="fname" onChange={(e) => setStringId(e.target.value)} name="fname" ></input>
            <br></br>
            <button onClick={() => setUserId(stringId)}>click me</button>
        </div>
    )
}