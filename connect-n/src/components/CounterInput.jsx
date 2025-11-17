function CounterInput({ val, setVal, min, max }) {

    function handleSub() {
        if (val > min) {
            setVal(prev => prev - 1);
        }
    }

    function handleAdd() {
        if (val < max) {
            setVal(prev => prev + 1);
        }
    }

    return (
        <div className="counter">
            <div className="counter-btn" onClick={handleSub}>-</div>
            <div className="counter-input">{val}</div>
            <div className="counter-btn" onClick={handleAdd}>+</div>
        </div>
    )
}

export default CounterInput;