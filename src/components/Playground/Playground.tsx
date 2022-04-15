import { Dispatch, SetStateAction, useState } from "react";
import "./Playground.css";
import { EActivePlayer } from "../../types/enums/ActivePlayerEnum";
import { EPlayerMark } from "../../types/enums/PlayerMarkEnum";

const initialGameInfo = Array.from({ length: 3 }, (_) => Array.from({ length: 3 }, (_) => EPlayerMark.None));

interface IPlaygroungProps {
	activePlayer: EActivePlayer;
	setActivePlayer: Dispatch<SetStateAction<EActivePlayer>>;
}

const Playground: React.FC<IPlaygroungProps> = ({ activePlayer, setActivePlayer }) => {
	const [gameInfo, setGameInfo] = useState<EPlayerMark[][]>(initialGameInfo);

	const handlePlaygroundClick = (e: React.MouseEvent<HTMLElement>) => {
		if (activePlayer === EActivePlayer.None) return;

		let target = e.target as HTMLElement;
		let targetElementId = null;
		let col;
		let row;
		if (target.tagName === "DIV") {
			targetElementId = target.getAttribute("id");
			row = target.getAttribute("row");
			col = target.getAttribute("col");
		}

		// check if event is originated from the grid boxex
		if (targetElementId?.includes("box-") && row && col) {
			drawMark(activePlayer, target, +row, +col);
		}
	};

	const drawMark = (activePlayer: EActivePlayer, targetElement: HTMLElement, row: number, col: number) => {
		const arrRow = row - 1;
		const arrCol = col - 1;
		const currentMark = activePlayer === EActivePlayer.P1 ? EPlayerMark.P1 : EPlayerMark.P2;
		// only allow to mark if it's not already been marked
		if (gameInfo[arrRow][arrCol] !== EPlayerMark.None) return;
		if (activePlayer === EActivePlayer.P1) {
			// add circle class to render cirlce, toggle active player
			targetElement.classList.add("circle");
			setActivePlayer(EActivePlayer.P2);
		} else if (activePlayer === EActivePlayer.P2) {
			targetElement.classList.add("cross");
			setActivePlayer(EActivePlayer.P1);
		}

		setGameInfo((prevGameInfo) => {
			const updatedRowArr = [...prevGameInfo[arrRow]];
			updatedRowArr.splice(arrCol, 1, currentMark);
			prevGameInfo[arrRow] = updatedRowArr;
			return [...prevGameInfo];
		});
		checkForWinner(arrRow, arrCol, activePlayer, currentMark);
	};

	const checkForWinner = (row: number, col: number, activePlayer: EActivePlayer, currentMark: EPlayerMark) => {
		// TODO: write logic to decide winner
	};

	return (
		<>
			<div className="playground" onClick={handlePlaygroundClick}>
				<div className="playground__box" id="box-1" row={1} col={1}></div>
				<div className="playground__box" id="box-2" row={1} col={2}></div>
				<div className="playground__box" id="box-3" row={1} col={3}></div>
				<div className="playground__box" id="box-4" row={2} col={1}></div>
				<div className="playground__box" id="box-5" row={2} col={2}></div>
				<div className="playground__box" id="box-6" row={2} col={3}></div>
				<div className="playground__box" id="box-7" row={3} col={1}></div>
				<div className="playground__box" id="box-8" row={3} col={2}></div>
				<div className="playground__box" id="box-9" row={3} col={3}></div>
			</div>
		</>
	);
};

export default Playground;
