import { useState } from "react";
import Playground from "../components/Playground/Playground";
import { EActivePlayer } from "../types/enums/ActivePlayerEnum";
import "./App.css";

function App() {
	const [activePlayer, setActivePlayer] = useState<EActivePlayer>(EActivePlayer.None);
	return (
		<div className="App" onContextMenu={(e) => e.preventDefault()}>
			<Playground activePlayer={activePlayer} setActivePlayer={setActivePlayer} />
			<button
				className="start__game"
				onClick={() => setActivePlayer(EActivePlayer.P1)}
				disabled={activePlayer === EActivePlayer.None ? false : true}
			>
				Start the Game!
			</button>
		</div>
	);
}

export default App;
