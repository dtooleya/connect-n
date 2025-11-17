function PlayableSpace({ isRedTurn, setIsRedTurn, board, setBoard, col, winner }) {

    function handleClick() {
        if (winner !== "none") {
            return;
        }
        const temp = board.map(column => [...column]);
        for (let i = board[col].length - 1; i >= 0; i--) {
            if (board[col][i] === null) {
                temp[col][i] = isRedTurn ? "red" : "yellow";
                setBoard(temp);
                setIsRedTurn(prev => !prev);
                return;
            }
        }
    }

    return (
        <div className={"playable-space " + (isRedTurn ? "red-turn" : "yellow-turn")} onClick={handleClick}></div>
    )
}

export default PlayableSpace;