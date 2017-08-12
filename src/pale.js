import React from 'react';


class Pale extends React.Component {
    constructor(props) {
        super(props);
        const {side, tableHeight, tableWidth, paleStyle, position} = this.props;
        this.height = paleStyle.height;
        this.width = paleStyle.width;
        this.startPosition = returnStartPalePosition(side, tableHeight, tableWidth, this.height, this.width);
        this.setPosition(position);
        this.changePosition = this.changePosition.bind(this);
    }
    setPosition(position) {
        const tableHeight = this.props.tableHeight;
        const height= this.height;
        this.position = isEmptyPosition(position) ? this.startPosition : returnValidPalePosition(position, tableHeight, height);
    }
    getPosition() {
        return {...this.position};
    }
    componentDidMount() {
        this.interval = setInterval(this.changePosition, 25);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    changePosition() {
        const {side, up, down, speed, changePositionInTable} = this.props;
        let position = this.getPosition();
        const newPosition = returnNewPosition(up, down, speed, position);
        this.setPosition(newPosition);
        changePositionInTable(side, newPosition);
    }
    render(){
        const {paleStyle} = this.props;
        const position = this.getPosition();
        const style = {...paleStyle, ...position};
        return (
            <div style={style} className="pale tableElements">

            </div>);
    }
}

function isEmptyPosition(position) {
    return Object.keys(position).length === 0;
}

function returnStartPalePosition(side, tableHeight, tableWidth, paleHeight, paleWidth) {
    const LEFTPOSITION = side === "left" ? 0 : tableWidth-paleWidth;
    const TOPPOSITION = (tableHeight - paleHeight)/2;
    return ({
        top: TOPPOSITION,
        left: LEFTPOSITION,
    });
}

function returnValidPalePosition(position, tableHeight, paleHeight) {
    let newPosition = position;
    if (position.top <= 0) {
        newPosition.top = 0;
    } else if (position.top + paleHeight >= tableHeight) {
        newPosition.top = tableHeight-paleHeight;
    }
    return newPosition;
}

function returnNewPosition(up, down, speed, position) {
    speed = (() => {
        if (up) {
            return -speed;
        } else if (down) {
            return speed;
        } else {
            return 0;
        }
    })();
    return {...position, top: position.top+speed};
}


export default Pale;