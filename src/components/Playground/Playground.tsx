import { useState } from "react";
import "./Playground.css";

enum EActivePlayer {
	None,
	P1,
	P2,
}

const Playground = () => {
	const [activePlayer, setActivePlayer] = useState<EActivePlayer>(EActivePlayer.None);

	const handlePlaygroundClick = (e: React.MouseEvent<HTMLElement>) => {
		if (activePlayer === EActivePlayer.None) return;

		let target = e.target as HTMLElement;
		let targetElementId = null;
		if (target.tagName === "DIV") {
			targetElementId = target.getAttribute("id");
		}
	};

	return (
		<>
			<div className="playground" onClick={handlePlaygroundClick}>
				<div className="playground__box" id="box-1"></div>
				<div className="playground__box" id="box-2"></div>
				<div className="playground__box" id="box-3"></div>
				<div className="playground__box" id="box-4"></div>
				<div className="playground__box" id="box-5"></div>
				<div className="playground__box" id="box-6"></div>
				<div className="playground__box" id="box-7"></div>
				<div className="playground__box" id="box-8"></div>
				<div className="playground__box" id="box-9"></div>
			</div>

			<button
				className="start__game"
				onClick={() => setActivePlayer(EActivePlayer.P1)}
				disabled={activePlayer === EActivePlayer.None ? false : true}
			>
				Start the Game!
			</button>
		</>
	);
};

export default Playground;
