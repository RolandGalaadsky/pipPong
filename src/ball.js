import React from 'react';


class Ball extends React.Component {
    constructor(props) {
        super(props);
        const {tableWidth, tableHeight, diameter, xSpeed, ySpeed} = this.props;
        this.returnStartPosition = () => returnStartBallPosition(tableHeight, tableWidth, diameter);
        this.ballStyle = {width: diameter, height: diameter};
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.diameter = diameter;
        this.changePosition = this.changePosition.bind(this);
        this.state = {
            position: this.returnStartPosition(),
        }
    }
    componentDidMount() {
        this.interval = setInterval(this.changePosition, 25);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    setYSpeed(speed) {
        this.ySpeed = speed;
    }
    setXSpeed(speed) {
        this.xSpeed = speed;
    }
    changePosition() {
        this.changeYSpeed();
        this.changeXSpeed();
        const {xSpeed, ySpeed} = this;
        let position = {...this.state.position};
        position = returnPosition(position, xSpeed, ySpeed);
        this.setState({position});
    }
    changeYSpeed() {
        let position = {...this.state.position};
        const {ySpeed, diameter} = this;
        const maxBottomPosition = this.props.tableHeight;
        const maxTopPosition = 0;
        const topPosition = position.top;
        const newYSpeed = returnYSpeed(topPosition, ySpeed, diameter, maxTopPosition, maxBottomPosition);
        this.setYSpeed(newYSpeed);
    }
    changeXSpeed() {
        let position = {...this.state.position};
        const {tableWidth, leftPaleTopPosition, rightPaleTopPosition, paleWidth, paleHeight} = this.props;
        const {xSpeed, diameter} = this;
        const maxLeftPosition = paleWidth;
        const maxRightPosition = tableWidth-paleWidth;
        const leftPosition = position.left;
        const rightPosition = position.left+diameter;
        const topPosition = position.top;
        if (leftPosition <= maxLeftPosition) {
            if (isOut(diameter, topPosition, leftPaleTopPosition, paleHeight)) {
                position = this.returnStartPosition();
                this.setState({position});
                this.props.changeScore("rightScore");
            } else {
                this.setXSpeed(-xSpeed);
            }
        }
        if (rightPosition >= maxRightPosition) {
            if (isOut(diameter, topPosition, rightPaleTopPosition, paleHeight)) {
                position = this.returnStartPosition();
                this.setState({position});
                this.props.changeScore("leftScore");
            } else {
                this.setXSpeed(-xSpeed);
            }
        }
    }
    render() {
        const style = {...this.state.position, ...this.ballStyle};
        return (
            <div style={style} className="ball tableElements">

            </div>);
    }
}

function returnStartBallPosition(tableHeight, tableWidth, diameter) {
    const TOPPOSITION = Math.random()*(tableHeight - diameter);
    const LEFTCENTERPOSITION = (tableWidth - diameter) / 2;
    return ({
        top: TOPPOSITION,
        left: LEFTCENTERPOSITION,
    });
}

function returnPosition(position, xSpeed, ySpeed) {
    const top = position.top + ySpeed;
    const left = position.left + xSpeed;
    return {top, left};
}

function returnYSpeed(topPosition, ySpeed, diameter, maxTopPosition, maxBottomPosition) {
    const top = topPosition;
    const bottom = topPosition + diameter;
    if (top <= maxTopPosition || bottom >= maxBottomPosition) {
        return -ySpeed;
    } else {
        return ySpeed;
    }
}

function isOut(diameter, topPosition, PaleTopPosition, paleHeight) {
    const bottomPosition = topPosition+diameter;
    const PaleBottomPosition = PaleTopPosition + paleHeight;
    const condition1 = topPosition >= PaleTopPosition && topPosition <= PaleBottomPosition;
    const condition2 = bottomPosition >= PaleTopPosition && bottomPosition <= PaleBottomPosition;
    return !(condition1 || condition2);
}

export default Ball;