import React from 'react';
import ReactDOM from 'react-dom';

export default function game_init(root, channel, gameName) {
  ReactDOM.render(<Starter channel={channel} gameName={gameName} />, root);
}

class Starter extends React.Component {
  constructor(props) {
    super(props);
    
    this.channel = props.channel
    this.channel.join()
      .receive("ok", resp => this.updateState(resp.state))
      .receive("error", resp => console.log("cant connet", resp))
            
    
    this.state = { 
      squares: [],
      squareVal: [],
      val: null,
      prevBlockIndex: null,
      goodGuess: 0,
      badGuess: 0,
      score: 100,
      disabled: true
    };
  }

  updateState(state) {
    this.setState(state)
  }

  displayValue(index) {
    this.channel.push("display_value", { index })
      .receive("ok", resp => this.updateState(resp.game))
        
    this.channel.push('check_match', { index })
      .receive("ok", resp => this.checkMatch(resp.game))
  }

  checkMatch(state) {
    if (state.badGuess > this.state.badGuess) {
      this.setState({ disabled: true })
      setTimeout(() => this.setState(state), 1000)
      if (state.score === 0) {
        alert("You have lost the game")
        this.resetGame()
      }
    } else {
      this.setState(state)      
      let blocks = this.state.squareVal
      let checkwin = blocks.indexOf(null)
      if (checkwin === -1) {
        setTimeout(() => {
          alert("You have won the game! Game will now reset...")
          this.resetGame()
        }, 1000)
      }
    }
  }

  resetGame() {
    this.channel.push('reset')
      .receive("ok", resp => this.updateState(resp.state))
  }

  createGrid() {
    let row = []
    for (let i = 0; i < 4; i++) {
      let col = []
      for (let j = 0; j < 4; j++)
        col.push(this.renderSquare((i*4)+j))
      row.push(<div className="row" key={i}>{col}</div>)
    }
    return row
  }

  renderSquare(index) {
    return (
      <div className="column" key={index}>
      <Square
          value={this.state.squareVal[index]}
          root={this}
          id={index}
          disabled={this.state.disabled}
        />
      </div>
    )
  }

  render() {
    return (
      <div id="board">
        <h3>Game: {this.props.gameName}</h3>
        <h5 className="score">Bad Guess: {this.state.badGuess}</h5>
        <h5 className="score">Score: {this.state.score}</h5>
        <h5 className="score">Good Guess: {this.state.goodGuess}</h5>
        {this.createGrid()}
        <button
          id="resetBtn"
          onClick={() => this.resetGame()}>Reset Game</button>
      </div>
    )
  }
    
}


function Square(props) {
  return (
    <button
      className="block"
      id={props.id}
      onClick={() => props.root.displayValue(props.id)}
      disabled={props.disabled}
    >{props.value == null ? null : String.fromCharCode(props.value)}</button>
  )
}
