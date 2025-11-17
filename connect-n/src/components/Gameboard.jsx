import Hole from "./Hole";
import { useEffect, useState } from "react";
import PlayableSpace from "./PlayableSpace";
import Settings from "./Settings";

function Gameboard() {
    const [numRows, setNumRows] = useState(9);
    const [numCols, setNumCols] = useState(9);
    const [winner, setWinner] = useState("none");
    const [numConnections, setNumConnections] = useState(4);
    const [isRedTurn, setIsRedTurn] = useState(true);
    const [board, setBoard] = useState([]);
    const [showSettings, setShowSettings] = useState(true);

    useEffect(() => {
        setWinner("none");
        setBoard(
            Array.from({ length: numCols }, () =>
                Array.from({ length: numRows }, () => null)
            )
        );
    }, [numRows, numCols, numConnections]);

    useEffect(() => {
        calculateWin();
    }, [board]);

    function calculateWin() {
        if (board.length > 0) {
            checkColumns();
            checkRows();
            checkDiagonalsDownRight();
            checkDiagonalsUpRight();
            checkForTie();
        }
    }

    function checkColumns() {
        for (let i = 0; i < numCols; i++) {
            let count = 1;
            let lastValue = board[i][0];
            for (let j = 1; j < numRows; j++) {
                if (lastValue !== null && lastValue === board[i][j]) {
                    if (count === 0) {
                        count = 2;
                    } else {
                        count++;
                    }
                    if (count === numConnections) {
                        setWinner(board[i][j]);
                    }
                } else {
                    count = 0;
                }
                lastValue = board[i][j];
            }
        }
    }

    function checkRows() {
        for (let i = 0; i < numRows; i++) {
            let count = 1;
            let lastValue = board[0][i];
            for (let j = 1; j < numCols; j++) {
                if (lastValue !== null && lastValue === board[j][i]) {
                    if (count === 0) {
                        count = 2;
                    } else {
                        count++;
                    }
                    if (count === numConnections) {
                        setWinner(board[j][i]);
                    }
                } else {
                    count = 0;
                }
                lastValue = board[j][i];
            }
        }
    }

    function checkDiagonalsDownRight() {
        for (let col = 0; col < numCols; col++) {
            for (let row = 0; row < numRows; row++) {

                let lastValue = board[col][row];
                if (lastValue === null) continue;

                let count = 1;

                for (let step = 1; step < numConnections; step++) {
                    let c = col + step;
                    let r = row + step;

                    if (c >= numCols || r >= numRows) break;

                    if (board[c][r] === lastValue) {
                        count++;
                        if (count === numConnections) {
                            setWinner(lastValue);
                        }
                    } else {
                        break;
                    }
                }
            }
        }
    }

    function checkDiagonalsUpRight() {
        for (let col = 0; col < numCols; col++) {
            for (let row = 0; row < numRows; row++) {

                let lastValue = board[col][row];
                if (lastValue === null) continue;

                let count = 1;

                for (let step = 1; step < numConnections; step++) {
                    let c = col + step;
                    let r = row - step;

                    if (c >= numCols || r < 0) break;

                    if (board[c][r] === lastValue) {
                        count++;
                        if (count === numConnections) {
                            setWinner(lastValue);
                        }
                    } else {
                        break;
                    }
                }
            }
        }
    }

    function checkForTie() {
        for (let i = 0; i < numCols; i++) {
            if (board[i].includes(null)) {
                return true;
            }
        }
        setWinner("tie");
    }

    function reset() {
        setWinner("none");
        setBoard(
            Array.from({ length: numCols }, () =>
                Array.from({ length: numRows }, () => null)
            )
        );
    }

    return (
        <>
            <Settings numCols={numCols} numRows={numRows} numConnections={numConnections} showSettings={showSettings}
                setNumConnections={setNumConnections} setNumCols={setNumCols} setNumRows={setNumRows} />
            <img className="settings-gear" src="/gear.png" alt="Settings" onClick={() => setShowSettings(prev => !prev)} />

            {winner === 'red' && <div className="result red"><span>Red</span> Wins!</div>}
            {winner === 'yellow' && <div className="result yellow"><span>Yellow</span> Wins!</div>}
            {winner === 'tie' && <div className="result red">It's a tie</div>}
            {winner !== 'none' && <div className="reset-btn" onClick={reset}>New Game</div>}

            <div style={{ padding: "20px 20px 0 20px" }}>
                <div className="row">
                    {Array.from({ length: numCols }).map((_, i) =>
                        <PlayableSpace isRedTurn={isRedTurn} setIsRedTurn={setIsRedTurn} winner={winner}
                            board={board} setBoard={setBoard} col={i} key={i} />
                    )}
                </div>
            </div>
            <div className="game-board">
                {board.length === numCols && board[0].length === numRows &&
                    <div className="row">
                        {Array.from({ length: numCols }).map((_, col) =>
                            <div key={"col" + col}>
                                {Array.from({ length: numRows }).map((_, row) =>
                                    <Hole color={board.length > 0 ? board[col][row] : ""} key={col + ":" + row} />
                                )}
                            </div>
                        )}
                    </div>
                }
            </div>
        </>
    )
}

export default Gameboard;