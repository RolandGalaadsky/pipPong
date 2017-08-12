import React from 'react';
import Table from './table';


class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: <Info />,
            isMusic: true,
            audioTheme: "audioInfo",
            scoreTab: false,
            leftScore: 0,
            rightScore: 0,
        };
        this.showTable = this.showTable.bind(this);
        this.showInfo = this.showInfo.bind(this);
        this.toggleMusic = this.toggleMusic.bind(this);
        this.changeScore = this.changeScore.bind(this);
        this.resetScore = this.resetScore.bind(this);
    }
    componentDidMount() {
        toggleMusic(this.state.isMusic, this.state.audioTheme);
    }
    componentWillUpdate(nextProps, nextState) {
        toggleMusic(nextState.isMusic, nextState.audioTheme);
    }
    componentDidUpdate(nextProps, prevState) {
        if (this.state.audioTheme !== prevState.audioTheme) {
            toggleMusic(false, prevState.audioTheme);
        }
    }
    showTable() {
        this.setState({
            content: <Table {...this.props.gameParameters} changeScore={this.changeScore} />,
            audioTheme: "fight",
            scoreTab: true,
        });
        this.resetScore();
    }
    showInfo() {
        this.setState({
            content: <Info />,
            audioTheme: "audioInfo",
            scoreTab: false,
        });
        this.resetScore();
    }
    toggleMusic() {
        this.setState({
            isMusic: !this.state.isMusic,
        });
    }
    changeScore(side) {
        if (this.state.leftScore !== 10 && this.state.rightScore !== 10) {
            this.setState({
                [side]: this.state[side]+1,
            });
        }
    }
    resetScore() {
        this.setState({
            leftScore: 0,
            rightScore: 0,
        })
    }
    render() {
        const {content, isMusic, audioTheme, scoreTab, leftScore, rightScore} = this.state;
        const isStartHighlight = (audioTheme === "fight");
        return(
            <div>
                <Display children={content} isScoreTab={scoreTab}
                         leftScore={leftScore} rightScore={rightScore} />
                <div id="pip-boy-buttons">
                    <PipBoyButton name="start" onClick={this.showTable} isHighlight={isStartHighlight} />
                    <PipBoyButton name="info" onClick={this.showInfo} isHighlight={!isStartHighlight} />
                    <PipBoyButton name="music"  onClick={this.toggleMusic} isHighlight={isMusic} />
                </div>
                <Audio theme={"fight"} />
                <Audio theme={"audioInfo"} />
            </div>);
    }
}

function Display(props) {
    const scoreTab = props.isScoreTab ? <ScoreTab leftScore={props.leftScore} rightScore={props.rightScore} /> : null;
    let winner = "";
    if (props.leftScore === 10) {
        winner = <Winner winner="left" />;
    }
    if (props.rightScore === 10) {
        winner = <Winner winner="right" />;
    }
    let children = winner ? winner : props.children;
    return (
        <div id="game">
            {scoreTab}
            {children}
        </div>
    );
}

function Player(props) {
    return(
        <div className={`player ${props.side}`}>
            <p>{props.name}</p>
            <p>{props.score}</p>
        </div>
    );
}

function ScoreTab(props) {
    return (<div className="player-container">
                <Player score={props.leftScore} name="Left Player" side="left" />
                <Player score={props.rightScore} name="Right Player" side="right"/>
            </div>);
}

function PipBoyButton(props) {
    const highlight = props.isHighlight ? "pip-boy-button-highlight" : '';
    return(
        <div className="button-container">
            <p className="pip-boy-button-name">{props.name}</p>
            <button className={`pip-boy-button ${highlight}`} onClick={(e) => {e.preventDefault(); props.onClick()}}></button>
        </div>
    );
}

function Info() {
    return (
        <div id="info">
            <h1>Welcome to Pip-Pong</h1>
            <p>This is just a ping pong that you can play with your friend on your Pip-Boy 3000</p>
            <div>
                <img src="vaultboy1.png" alt="vault-boy"/>
            </div>
            <div className="player-moves">
                <h2>Left Player</h2>
                <p>W &uArr;</p>
                <p>S &dArr;</p>
            </div>
            <div className="player-moves">
                <h2>Right Player</h2>
                <p>Arrow Up   <span>&uArr;</span></p>
                <p>Arrow Down &dArr;</p>
            </div>
            <div>To start Press Start Button</div>
        </div>

    );
}

function toggleMusic(isMusic, theme) {
    const aud = document.getElementById(theme);
    isMusic ? aud.play() : aud.pause();
}

function Audio(props) {
    return (
        <audio id={props.theme} loop>
            <source src={`${props.theme}.mp3`} />
        </audio>
    );
}

function Winner(props) {
    return(
        <div id="winner">
            <h1>The winner is {props.winner}!</h1>
            <p>To Start againg press Start</p>
        </div>
    );
}

export default Game;