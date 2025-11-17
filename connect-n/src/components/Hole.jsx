function Hole({color}) {
    return (
        <div className={"hole " + (color !== null ? color:"") }></div>
    )
}

export default Hole;