const ColorBoxes = (props) => {
    const strengthColors = {
        "too weak": '#F64A4A',
        "weak": '#FB7C58',
        "medium": '#F8CD65',
        "strong": '#A4FFAF'
    }
    //for box's count
    const highlightedCount = {
        "too weak": 1,
        "weak": 2,
        "medium": 3,
        "strong": 4
    }
    const totalCount = Object.keys(highlightedCount).length;

    const highlightedColor = strengthColors[props.type];

    const boxes = [];
    // Highlighted boxes
    for (let i = 1; i <= highlightedCount[props.type]; i++) {
        boxes.push(<span key={i} className="box" style={{backgroundColor: highlightedColor, borderColor: highlightedColor }}></span>);
    }

    // Unhighlighted boxes
    for (let i = highlightedCount[props.type] + 1; i <= totalCount; i++) {
        boxes.push(<span key={i} className="box"/>);
    }
    
    return <div className="boxes">{boxes}</div>;
}

export default ColorBoxes;