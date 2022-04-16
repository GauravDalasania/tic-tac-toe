import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { EActivePlayer } from "../../types/enums/ActivePlayerEnum";
import { EPlayerMark } from "../../types/enums/PlayerMarkEnum";
import "./TTT.css";

const TTT = () => {
	const initialGameInfo = Array.from({ length: 3 }, (_) => Array.from({ length: 3 }, (_) => EPlayerMark.None));
	const [gameInfo, setGameInfo] = useState<EPlayerMark[][]>(initialGameInfo);
	const [activePlayer, setActivePlayer] = useState<EActivePlayer>(EActivePlayer.None);
	const [winner, setWinner] = useState<EActivePlayer>(EActivePlayer.None);
	const divRef = useRef<HTMLDivElement>(null);

	const handlePlaygroundClick = (e: React.MouseEvent<HTMLElement>) => {
		if (activePlayer === EActivePlayer.None) return;
		if (winner !== EActivePlayer.None) {
			divRef.current?.classList.add("disabled");
			return;
		}
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

		flushSync(() => {
			setGameInfo((prevGameInfo) => {
				const updatedRowArr = [...prevGameInfo[arrRow]];
				updatedRowArr.splice(arrCol, 1, currentMark);
				prevGameInfo[arrRow] = updatedRowArr;
				return [...prevGameInfo];
			});
		});
		checkForWinner(arrRow, arrCol, activePlayer, currentMark);
	};

	const checkForWinner = (row: number, col: number, activePlayer: EActivePlayer, currentMark: EPlayerMark) => {
		const isDiagonal = row === col || row + col === 2;
		let lineWithEqualMarkFound = false;
		for (let i = 0; i < 3; i++) {
			if (gameInfo[row][i] === currentMark) {
				lineWithEqualMarkFound = true;
			} else {
				lineWithEqualMarkFound = false;
				break;
			}
		}

		if (lineWithEqualMarkFound === true) {
			return setWinner(activePlayer);
		}

		for (let i = 0; i < 3; i++) {
			if (gameInfo[i][col] === currentMark) {
				lineWithEqualMarkFound = true;
			} else {
				lineWithEqualMarkFound = false;
				break;
			}
		}
		if (lineWithEqualMarkFound === true) {
			return setWinner(activePlayer);
		}

		if (isDiagonal) {
			for (let i = 0; i < 3; i++) {
				if (gameInfo[i][i] === currentMark) {
					lineWithEqualMarkFound = true;
				} else {
					lineWithEqualMarkFound = false;
					break;
				}
			}
			if (lineWithEqualMarkFound === true) {
				return setWinner(activePlayer);
			}
			for (let i = 0; i < 3; i++) {
				if (gameInfo[i][2 - i] === currentMark) {
					lineWithEqualMarkFound = true;
				} else {
					lineWithEqualMarkFound = false;
					break;
				}
			}
			if (lineWithEqualMarkFound === true) {
				return setWinner(activePlayer);
			}
		}
	};

	// useEffect(() => {
	// 	if (winner !== EActivePlayer.None) {
	// 		resetPlayground();
	// 	}
	// }, [winner]);

	const resetPlayground = () => {
		setGameInfo(initialGameInfo);
		setActivePlayer(EActivePlayer.None);
		const gridElementArr = document.querySelectorAll(".playground__box");
		for (let i = 0; i < gridElementArr.length; i++) {
			gridElementArr[i].setAttribute("class", "playground__box");
		}
		divRef.current?.classList.remove("disabled");
	};

	const handleReset = () => {
		resetPlayground();
		setWinner(EActivePlayer.None);
	};

	return (
		<div className="ttt__game">
			<div className="playground" onClick={handlePlaygroundClick} ref={divRef}>
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
			{winner !== EActivePlayer.None && <div className="winner__name">{`Winner is Player --> ${winner}`}</div>}
			<div className="playground__buttons">
				<button
					className="start__game btn"
					onClick={() => setActivePlayer(EActivePlayer.P1)}
					disabled={activePlayer === EActivePlayer.None ? false : true}
				>
					Start the Game!
				</button>
				<button className="playground__resetBtn btn" onClick={handleReset}>
					RESET
				</button>
			</div>
		</div>
	);
};

export default TTT;
