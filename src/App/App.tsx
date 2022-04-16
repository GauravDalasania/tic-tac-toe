import TTT from "../components/TTTGame/TTT";
import "./App.css";

function App() {
	return (
		<div className="App" onContextMenu={(e) => e.preventDefault()}>
			<TTT />
		</div>
	);
}

export default App;
