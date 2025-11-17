import CounterInput from "./CounterInput";

function Settings({ numCols, numRows, setNumCols, setNumRows, numConnections, setNumConnections, showSettings }) {

    return (
        <div className={"setting-panel " + (showSettings ? "" : "disabled")}>
            <label>Number of Columns</label>
            <CounterInput val={numCols} setVal={setNumCols} min={4} max={20} />
            <label>Number of Rows</label>
            <CounterInput val={numRows} setVal={setNumRows} min={4} max={20} />
            <label>Number of Connections</label>
            <CounterInput val={numConnections} setVal={setNumConnections} min={3} max={10} />
        </div>
    );
}

export default Settings;