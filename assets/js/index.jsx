import React from 'react'
import ReactDom from 'react-dom'

export default function init_index(root) {
    ReactDom.render(<Index />, root)
}

class Index extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h1>Welcome to Memory Game</h1>
                <h3>Join a game</h3>
                <input type="text" id="gameName" />
                <button id="join-btn" onClick={() => {this.joinGame()}}>Join</button>
            </div>
        )
    }

    joinGame() {
        let gameName = document.getElementById("gameName").value
        document.location.replace("./game/" + gameName)
    }
}