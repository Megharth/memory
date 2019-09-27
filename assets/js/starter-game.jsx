import React from 'react';
import ReactDOM from 'react-dom';

export default function game_init(root) {
  ReactDOM.render(<Starter />, root);
}

class Starter extends React.Component {
  constructor(props) {
    super(props);
    let squares = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H']
    squares.sort((a,b) => 0.5 - Math.random())
    this.state = { 
      squares: squares,
      squareVal: Array(16).fill(null),
      val: null,
      prevBlockIndex: null,
      goodGuess: 0,
      badGuess: 0,
      score: 100,
      disabled: false
     };
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

  displayValue(index) {
    const val = this.state.squares[index]
    const squareVal = this.state.squareVal
    if (squareVal[index] === null) { 
      squareVal[index] = val
      this.setState({ squareVal })
      this.checkMatch(val, index)
    }
  }

  checkMatch(val, index) {
    if (this.state.val !== null) {
      if (val === this.state.val) {
        this.incrementGoodGuess()
      }
      else {
        this.setState({disabled: true})
        setTimeout(() => this.incrementBadGuess(index), 1000)
      }
    }
    else {
      this.setState({ val: val, prevBlockIndex: index })
    }
  }

  incrementBadGuess(index) {
    let badGuess = this.state.badGuess
    let score = this.state.score
    let squareVal = this.state.squareVal
    const prevBlockIndex = this.state.prevBlockIndex

    badGuess++
    score = score - 5
    squareVal[index] = null
    squareVal[prevBlockIndex] = null
    
    this.setState({ squareVal, badGuess, score, val: null, prevBlockIndex: null, disabled: false })
    if (score === 0) {
      alert("You have lost the game")
      this.resetGame()
    }
  }

  incrementGoodGuess() {
    let goodGuess = this.state.goodGuess
    let score = this.state.score
    
    goodGuess++
    score = score + 10
    this.setState({ goodGuess, score, val:null, prevBlockIndex:null })
    
    let blocks = this.state.squareVal
    let checkwin = blocks.indexOf(null)
    if (checkwin === -1) {
      setTimeout(() => {
        alert("You have won the game! Game will now reset...")
        this.resetGame()
      }, 1000)
    }
  }

  resetGame() {
    let squares = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H']
    squares.sort((a,b) => 0.5 - Math.random())
    this.setState({ 
      squares: squares,
      squareVal: Array(16).fill(null),
      val: null,
      prevBlockIndex: null,
      goodGuess: 0,
      badGuess: 0,
      score: 100
    });
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

  render() {
    return (
      <div id="board">
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
    >{props.value}</button>
  )
}
