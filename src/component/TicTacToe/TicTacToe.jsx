import React, { useState } from 'react'
import './TicTacToe.css'
import circle_icon from '../assets/circle.png'
import cross_icon from '../assets/cross.png'

const initialData = Array(9).fill('')
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columns
  [0, 4, 8],
  [2, 4, 6], // Diagonals
]

export default function TicTacToe() {
  const [data, setData] = useState(initialData)
  const [count, setCount] = useState(0)
  const [lock, setLock] = useState(false)
  const [winner, setWinner] = useState(null)

  const toggle = (index) => {
    if (lock || data[index] !== '') {
      return
    }

    const newData = [...data]
    newData[index] = count % 2 === 0 ? 'X' : 'O'
    setData(newData)
    setCount(count + 1)
    checkWin(newData)
  }

  const checkWin = (currentData) => {
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern
      if (
        currentData[a] &&
        currentData[a] === currentData[b] &&
        currentData[a] === currentData[c]
      ) {
        setLock(true)
        setWinner(currentData[a])
        break
      }
    }
  }

  const resetGame = () => {
    setData(initialData)
    setCount(0)
    setLock(false)
    setWinner(null)
  }

  return (
    <div className="container">
      {winner ? (
        <h1 className="win-title">
          <img
            src={winner === 'X' ? cross_icon : circle_icon}
            alt={winner === 'X' ? 'cross' : 'circle'}
          />{' '}
          WINS!
        </h1>
      ) : (
        <h1 className="title">Tic Tac Toe Game</h1>
      )}
      <div className="board">
        {[0, 1, 2].map((row) => (
          <div key={row} className="row">
            {[0, 1, 2].map((col) => {
              const index = row * 3 + col
              return (
                <div
                  key={index}
                  className="boxes"
                  onClick={() => toggle(index)}
                >
                  {data[index] === 'X' && <img src={cross_icon} alt="cross" />}
                  {data[index] === 'O' && (
                    <img src={circle_icon} alt="circle" />
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>
      <button className="reset" onClick={resetGame}>
        Reset
      </button>
    </div>
  )
}
