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
      val: null,
      prevBlockIndex: null,
      goodGuess: 0,
      badGuess: 0,
      score: 100
     };
  }
  
    
  renderSquare(index) {
    return (
      <div className="column">
      <Square
          value={this.state.squares[index]}
          root={this}
          id={index}
        />
      </div>
    )
  }

  setStateValue(val, id) {
    this.setState({val: val, prevBlockIndex: id})
  }

  incrementBadGuess() {
    let badGuess = this.state.badGuess
    badGuess++
    let score = this.state.score
    score = score - 5
    this.setState({ badGuess, score })
    if (score === 0) {
      alert("You have lost the game")
      this.resetGame()
    }
  }

  incrementGoodGuess() {
    let goodGuess = this.state.goodGuess
    goodGuess++
    let score = this.state.score
    score = score + 10
    this.setState({ goodGuess, score })
    let blocks = [...document.querySelectorAll(".block")]
    let checkwin = blocks.filter(block => { if (block.innerHTML === "") return block })
    if (checkwin.length === 0) {
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
      val: null,
      prevBlockIndex: null,
      goodGuess: 0,
      badGuess: 0,
      score: 100
    });
    let blocks = document.querySelectorAll(".block")
    blocks.forEach(block => {
      block.innerHTML = ""
      block.classList.remove('valid')
    })
  }

  render() {
    return (
      <div id="board">
        <h5 className="score">Bad Guess: {this.state.badGuess}</h5>
        <h5 className="score">Score: {this.state.score}</h5>
        <h5 className="score">Good Guess: {this.state.goodGuess}</h5>
        <div className="row">
          { this.renderSquare(0)}
          { this.renderSquare(1)}
          { this.renderSquare(2)}
          { this.renderSquare(3)}
        </div>
        <div className="row">
          { this.renderSquare(4)}
          { this.renderSquare(5)}
          { this.renderSquare(6)}
          { this.renderSquare(7)}
        </div>
        <div className="row">
          { this.renderSquare(8)}
          { this.renderSquare(9)}
          { this.renderSquare(10)}
          { this.renderSquare(11)}

        </div>
        <div className="row">
          { this.renderSquare(12)}
          { this.renderSquare(13)}
          { this.renderSquare(14)}
          { this.renderSquare(15)}
        </div>
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
      onClick={
        (ev) => {
          if (ev.target.innerHTML === "") {
            ev.target.innerText = props.value
            let val = props.root.state.val
            if (val === null)
              props.root.setStateValue(props.value, props.id)
            else {
              let el = ev.target
              let prevEl = document.getElementById(props.root.state.prevBlockIndex)
              if (val !== props.value) {
                let blocks = document.querySelectorAll(".block")
                blocks.forEach(block => block.setAttribute("disabled", true))
                props.root.incrementBadGuess()
                setTimeout(() => {
                  el.innerHTML = ""
                  prevEl.innerHTML = ""
                  blocks.forEach(block => block.removeAttribute("disabled"))
                }, 1000)
              } else {
                props.root.incrementGoodGuess()
                el.classList.add('valid')
                prevEl.classList.add('valid')
              }
              props.root.setStateValue(null)
            }
          }
      }
    }></button>
  )
}