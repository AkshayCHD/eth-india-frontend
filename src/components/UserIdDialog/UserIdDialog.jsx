import { useState } from "react"

const UserIdDialog = ({ setUserId }) => {
    const [stringId, setStringId] = useState();
	return (
		<div className="landingPage">
			<img
				src="lp.svg"
				alt=""
			/>
			<div className="form">
				<h3>Enter your User ID to play</h3>
                <input type="text" placeholder="Enter your user id here..." id="fname" onChange={(e) => setStringId(e.target.value)} name="fname" ></input>
				<button onClick={() => setUserId(stringId)}>
					Play Now <span className="arrow">🡪</span>
				</button>
			</div>
		</div>
	);
};

export default UserIdDialog;