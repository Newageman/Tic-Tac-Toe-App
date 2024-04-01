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

  const toggle = (index) => {
    if (lock || index < 0 || index >= 9 || data[index] !== '') {
      return
    }

    const newData = [...data]
    newData[index] = count % 2 === 0 ? 'X' : 'O'
    setData(newData)
    setCount(count + 1)
    checkWin(newData)
  }

  const checkWin = (currentData) => {
    if (!currentData) {
      return
    }

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern
      if (
        currentData[a] &&
        currentData[a] === currentData[b] &&
        currentData[a] === currentData[c]
      ) {
        setLock(true)
        break
      }
    }
  }

  const resetGame = () => {
    setData(initialData.slice())
    setCount(0)
    setLock(false)
  }

  return (
    <div className="container">
      <h1 className="title">Tic Tac Toe Game</h1>
      <div className="board">
        {Array.from({ length: 3 }, (_, row) => (
          <div key={row} className="row">
            {Array.from({ length: 3 }, (_, col) => {
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
