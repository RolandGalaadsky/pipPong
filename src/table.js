import React from 'react';
import Pale from './pale';
import Ball from './ball';


class Table extends React.Component {
    constructor(props) {
        super(props);
        this.keyPress = this.keyPress.bind(this);
        this.keyRelated = this.keyRelated.bind(this);
        this.changePalePosition = this.changePalePosition.bind(this);
        const {tableStyle, paleStyle, paleSpeed, ballParameters, changeScore} = this.props;
        this.state = {
            pressedKeys: [],
            left: {
                position: {},
            },
            right: {
                position: {},
            },
        };
        this.generalPaleParameters = {
            tableHeight: tableStyle.height,
            tableWidth: tableStyle.width,
            paleStyle: paleStyle,
            speed: paleSpeed,
            changePositionInTable: this.changePalePosition,
        };
        this.ballParameters = {
            ...ballParameters,
            tableHeight: tableStyle.height,
            tableWidth: tableStyle.width,
            paleHeight: paleStyle.height,
            paleWidth: paleStyle.width,
            changeScore: changeScore,
        };
    }
    componentDidMount() {
        const table = document.getElementById("table");
        table.focus();
        table.onblur = () => table.focus();
    }
    keyToggle(key, flag) {
        const pressedKeys = [...this.state.pressedKeys];
        pressedKeys[key] = flag;
        this.setState({pressedKeys});
    }
    keyPress(e) {
        this.keyToggle(e.keyCode, true);
    }
    keyRelated(e) {
        this.keyToggle(e.keyCode, false);
    }
    changePalePosition(side, position) {
        this.setState({[side]: {position: position}});
    }
    render() {
        const {generalPaleParameters, ballParameters} = this;
        const {tableStyle} = this.props;
        const keys = this.state.pressedKeys;
        const W = keys[87];
        const S = keys[83];
        const ARROWUP = keys[38];
        const ARROWDOWN = keys[40];
        return (
            <div id="table" tabIndex={0} style={tableStyle} onKeyDown={this.keyPress}  onKeyUp={this.keyRelated}>
                <Pale {...generalPaleParameters}
                        side="left"
                        up={W}
                        down={S}
                        position={this.state.left.position} />
                <Net height={tableStyle.height}/>
                <Ball {...ballParameters}
                      leftPaleTopPosition={this.state.left.position.top}
                      rightPaleTopPosition={this.state.right.position.top}/>
                <Pale {...generalPaleParameters}
                        side="right"
                        up={ARROWUP}
                        down={ARROWDOWN}
                        position={this.state.right.position}/>
            </div>
        );
    }
}

function Net(props) {
    return (
        <hr style={{height: props.height-20}} />
    );
}


export default Table;