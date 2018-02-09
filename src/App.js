
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Board from './Components/Board';

class App extends Component {
    constructor(progs) {
        super(progs);

        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            gameOver: false,
            counter: 9
        }
    }

    handleClick(i) {
        const currentSquares = this.state.squares;

        // Only set squares that are empty and we still have no winners
        if (currentSquares[i] === null && !this.checkWinner(currentSquares)) {
            currentSquares[i] = this.state.xIsNext ? "X" : "O";
            this.setState({
                squares: currentSquares,
                xIsNext: !this.state.xIsNext,
                counter: this.state.counter - 1
            });
        }
    }

    resetBoard() {
        this.setState({
            squares: Array(9).fill(null),
            xIsNext: true,
            counter: 9
        });
    }

    // All the possible winning positions
    checkWinner(squares) {
        const winLines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let i = 0; i < winLines.length; i++) {
            const [a, b, c] = winLines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    render() {

        let winner = this.checkWinner(this.state.squares);
        let status = "";
        if (winner) {
            status = "Winner: " + winner;
        } else if (this.state.counter === 0) {
            status = "Draw"
        } else {
            status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }

        return (
            <div className="col-md-6 col-md-offset-3">
                <h1 className="game-info">Tic Tac Toe </h1>
                <div>
                    <div className="status">{status}</div>
                    <Board
                        squares={this.state.squares}
                        onClick={i => this.handleClick(i)}
                    />
                </div>

                <div>
                <button className="reset" onClick={() => this.resetBoard()}>
                    Reset
                </button>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector(".container"));

