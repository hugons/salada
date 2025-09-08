'use client'

import { useState, useEffect } from 'react'
import { Puzzle } from '@/types/puzzle'

interface GameProps {
  puzzle: Puzzle
}

export default function Game({ puzzle }: GameProps) {
  const grid = puzzle.grid.split('\n').map(row => row.split(''))
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set())
  const [currentPath, setCurrentPath] = useState<number[][]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [time, setTime] = useState(0)
  const [gameWon, setGameWon] = useState(false)
  const [bestTime, setBestTime] = useState<number | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(t => t + 1)
    }, 1000)

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault()
      }
    }

    document.addEventListener('touchmove', handleGlobalTouchMove, { passive: false })

    return () => {
      clearInterval(interval)
      document.removeEventListener('touchmove', handleGlobalTouchMove)
    }
  }, [isDragging])

  useEffect(() => {
    if (foundWords.size === puzzle.words.length) {
      setGameWon(true)
      if (!bestTime || time < bestTime) {
        setBestTime(time)
        localStorage.setItem(`newsalad-${puzzle.id}`, time.toString())
      }
    }
  }, [foundWords, puzzle.words.length, time, bestTime, puzzle.id])

  useEffect(() => {
    const stored = localStorage.getItem(`newsalad-${puzzle.id}`)
    if (stored) {
      setBestTime(parseInt(stored))
    }
  }, [puzzle.id])

  const handleMouseDown = (e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault()
    setIsDragging(true)
    setCurrentPath([[row, col]])
  }
  const handleMouseEnter = (row: number, col: number) => {
    if (isDragging) {
      setCurrentPath(prev => [...prev, [row, col]])
    }
  }

  const handleMouseUp = () => {
    if (isDragging) {
      // Check if path matches any word
      const pathStr = currentPath.map(([r, c]) => `${r},${c}`).join(';')
      const wordLetters = currentPath.map(([r, c]) => grid[r][c]).join('')
      const matchedWord = puzzle.words.find(word => {
        const wordPathStr = word.path.map(([r, c]) => `${r},${c}`).join(';')
        return pathStr === wordPathStr && wordLetters === word.display
      })
      if (matchedWord && !foundWords.has(matchedWord.key)) {
        setFoundWords(prev => new Set([...prev, matchedWord.key]))
      }
      setCurrentPath([])
      setIsDragging(false)
    }
  }

  const handleTouchStart = (e: React.TouchEvent, row: number, col: number) => {
    e.preventDefault()
    setIsDragging(true)
    setCurrentPath([[row, col]])
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault()
    if (!isDragging) return
    const touch = e.touches[0]
    const element = document.elementFromPoint(touch.clientX, touch.clientY)
    if (element && element.id) {
      const [r, c] = element.id.split('-').map(Number)
      if (!isNaN(r) && !isNaN(c)) {
        setCurrentPath(prev => {
          const last = prev[prev.length - 1]
          if (last[0] !== r || last[1] !== c) {
            return [...prev, [r, c]]
          }
          return prev
        })
      }
    }
  }

  const handleTouchEnd = () => {
    handleMouseUp()
  }

  const isInCurrentPath = (row: number, col: number) => {
    return currentPath.some(([r, c]) => r === row && c === col)
  }

  const isInFoundPath = (row: number, col: number) => {
    for (const word of puzzle.words) {
      if (foundWords.has(word.key)) {
        if (word.path.some(([r, c]) => r === row && c === col)) {
          return true
        }
      }
    }
    return false
  }

  const isLetterVisible = (row: number, col: number) => {
    for (const word of puzzle.words) {
      if (!foundWords.has(word.key)) {
        if (word.path.some(([r, c]) => r === row && c === col)) {
          return true
        }
      }
    }
    return false
  }

  const handleClick = (row: number, col: number) => {
    const clickedCell = [row, col];
    if (currentPath.length === 0) {
      setCurrentPath([clickedCell]);
    } else {
      const lastCell = currentPath[currentPath.length - 1];
      const isSameAsLast = lastCell[0] === row && lastCell[1] === col;
      const isAdjacent = Math.abs(row - lastCell[0]) <= 1 && Math.abs(col - lastCell[1]) <= 1;
      const isAlreadyInPath = currentPath.some(([r, c]) => r === row && c === col);

      if (isSameAsLast) {
        // If the last cell is clicked again, remove it (backtrack)
        setCurrentPath(prev => prev.slice(0, -1));
      } else if (isAdjacent && !isAlreadyInPath) {
        // If adjacent and not already in path, add it
        setCurrentPath(prev => [...prev, clickedCell]);
      } else {
        // Otherwise, start a new path
        setCurrentPath([clickedCell]);
      }
    }
  };

  const handleClearPath = () => {
    setCurrentPath([]);
  };

  const handleVerify = () => {
    // Check if path matches any word
    const pathStr = currentPath.map(([r, c]) => `${r},${c}`).join(';')
    const wordLetters = currentPath.map(([r, c]) => grid[r][c]).join('')
    const matchedWord = puzzle.words.find(word => {
      const wordPathStr = word.path.map(([r, c]) => `${r},${c}`).join(';')
      return pathStr === wordPathStr && wordLetters === word.display
    })
    if (matchedWord && !foundWords.has(matchedWord.key)) {
      setFoundWords(prev => new Set([...prev, matchedWord.key]))
    }
    setCurrentPath([])
  }

  const generateShareText = () => {
    let grid = ''
    for (let r = 0; r < puzzle.size; r++) {
      for (let c = 0; c < puzzle.size; c++) {
        grid += isInFoundPath(r, c) ? '🟢' : '⚪'
      }
      grid += '\n'
    }
    return `New Salad - ${puzzle.title}\n${grid}Tempo: ${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, '0')}`
  }

  const handleShare = () => {
    const text = generateShareText()
    if (navigator.share) {
      navigator.share({
        title: 'New Salad',
        text: text,
      })
    } else {
      navigator.clipboard.writeText(text).then(() => {
        alert('Resultado copiado para a área de transferência!')
      })
    }
  }

  const handleHint = () => {
    const unfound = puzzle.words.find(word => !foundWords.has(word.key))
    if (unfound) {
      alert(`Primeira letra: ${unfound.display[0]}`)
    }
  }

  return (
    <div className="p-4 game-background">
      <h1 className="text-2xl font-bold mb-4">{puzzle.title}</h1>
      <div className="mb-4">Tempo: {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}</div>
      <div className="mb-4">Melhor tempo: {bestTime ? `${Math.floor(bestTime / 60)}:${(bestTime % 60).toString().padStart(2, '0')}` : 'N/A'}</div>
      <div className="game-grid" style={{ gridTemplateColumns: `repeat(${puzzle.size}, 80px)` }}>
        {grid.map((row, r) =>
          row.map((letter, c) => (
            <div
              id={`${r}-${c}`}
              key={`${r}-${c}`}
              className={`border cursor-pointer select-none transition-opacity duration-2000 ${
                isInCurrentPath(r, c) ? 'bg-blue-500' : /* Use a more distinct blue for selected cells */
                isInFoundPath(r, c) ? 'bg-green-500' : /* Use a more distinct green for found cells */
                'bg-d3d3d3' /* Use custom class for default cell background */
              } ${!isLetterVisible(r, c) ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
              onMouseDown={(e) => handleMouseDown(e, r, c)}
              onMouseEnter={() => handleMouseEnter(r, c)}
              onMouseUp={handleMouseUp}
              onTouchStart={(e) => handleTouchStart(e, r, c)}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onClick={() => handleClick(r, c)}
            >
              <span>{letter}</span>
            </div>
          ))
        )}
      </div>
      <div className="mb-4">
        {currentPath.length > 0 && (
          <div className="mt-2 flex items-center">
            <span className="mr-2">Selecionado: {currentPath.map(([r, c]) => grid[r][c]).join('')}</span>
            <button onClick={handleClearPath} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm">
              Limpar
            </button>
          </div>
        )}
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold">Palavras:</h2>
        <div className="grid grid-cols-2 gap-2">
          {puzzle.words
            .sort((a, b) => a.display.localeCompare(b.display))
            .map(word => (
              <div key={word.key} className="flex items-center">
                <span className="mr-2">{word.display.length} letras:</span>
                <span className={foundWords.has(word.key) ? 'text-green-600 font-bold' : 'text-gray-400'}>
                  {foundWords.has(word.key) ? word.display : '_'.repeat(word.display.length)}
                </span>
              </div>
            ))}
        </div>
        <button onClick={handleHint} className="mt-4 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">Dica</button>
      </div>
      {gameWon && (
        <div>
          <div className="text-green-600 font-bold">Parabéns! Completaste o puzzle em {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}</div>
          <button onClick={handleShare} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Partilhar</button>
        </div>
      )}
    </div>
  )
}
