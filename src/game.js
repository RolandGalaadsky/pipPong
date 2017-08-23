import React from 'react';
import Table from './table';


class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: <Info />,
            isMusic: true,
            audioTheme: "audioInfo",
            isScoreTab: false,
            leftScore: 0,
            rightScore: 0,
        };
        this.showTable = this.showTable.bind(this);
        this.showInfo = this.showInfo.bind(this);
        this.toggleMusic = this.toggleMusic.bind(this);
        this.changeScore = this.changeScore.bind(this);
        this.resetScore = this.resetScore.bind(this);
        this.tableParameters = {
            ...this.props.gameParameters,
            changeScore: this.changeScore,
        }
    }
    componentDidMount() {
        const {isMusic, audioTheme} = this.state;
        toggleMusic(isMusic, audioTheme);
    }
    componentWillUpdate(nextProps, nextState) {
        const {isMusic, audioTheme} = nextState;
        toggleMusic(isMusic, audioTheme);
    }
    componentDidUpdate(nextProps, prevState) {
        const currentAudioTheme = this.state.audioTheme;
        const oldAudioTheme = prevState.audioTheme;
        if (currentAudioTheme !== oldAudioTheme) {
            toggleMusic(false, oldAudioTheme);
        }
    }
    showTable() {
        this.setState({
            content: <Table {...this.tableParameters} />,
            audioTheme: "fight",
            isScoreTab: true,
        });
        this.resetScore();
    }
    showInfo() {
        this.setState({
            content: <Info />,
            audioTheme: "audioInfo",
            isScoreTab: false,
        });
        this.resetScore();
    }
    toggleMusic() {
        this.setState({
            isMusic: !this.state.isMusic,
        });
    }
    changeScore(side) {
        this.setState({
            [side]: this.state[side]+1,
        });

    }
    resetScore() {
        this.setState({
            leftScore: 0,
            rightScore: 0,
        })
    }
    render() {
        const {isMusic, audioTheme} = this.state;
        const isStartHighlight = (audioTheme === "fight");
        const displayParameters = {...{"content":"", "isScoreTab":"", "leftScore":"", "rightScore":""}, ...this.state};
        return(
            <div>
                <Display {...displayParameters} />
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
    const WINNERSSCORE = 10;
    const {isScoreTab, leftScore, rightScore, content} = props;
    const scoreTab = isScoreTab ? <ScoreTab {...{leftScore, rightScore}} /> : null;
    let winner = "";
    if (leftScore === WINNERSSCORE) {
        winner = <Winner winner="left" />;
    }
    if (rightScore === WINNERSSCORE) {
        winner = <Winner winner="right" />;
    }
    let children = winner ? winner : content;
    return (
        <div id="game">
            {scoreTab}
            {children}
        </div>
    );
}

function Player(props) {
    const {name, score, side} = props;
    return(
        <div className={`player ${side}`}>
            <p>{name}</p>
            <p>{score}</p>
        </div>
    );
}

function ScoreTab(props) {
    const {leftScore, rightScore} = props;
    return (<div className="player-container">
                <Player score={leftScore} name="Left Player" side="left" />
                <Player score={rightScore} name="Right Player" side="right"/>
            </div>);
}

function PipBoyButton(props) {
    const {name, isHighlight, onClick} = props;
    const highlight = isHighlight ? "pip-boy-button-highlight" : '';
    function handle(e) {
        e.preventDefault();
        onClick();
    }
    return(
        <div className="button-container">
            <p className="pip-boy-button-name">{name}</p>
            <button className={`pip-boy-button ${highlight}`} onClick={handle} />
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
    const theme = props.theme;
    return (
        <audio id={theme} loop>
            <source src={`${theme}.mp3`} />
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