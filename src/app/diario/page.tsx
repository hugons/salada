import { redirect } from 'next/navigation'
import { readdirSync } from 'fs'
import { join } from 'path'

export default function Diario() {
  const puzzlesDir = join(process.cwd(), 'data', 'puzzles')
  const files = readdirSync(puzzlesDir)
  const puzzleIds = files.filter(file => file.endsWith('.json')).map(file => file.replace('.json', ''))

  const date = new Date().toISOString().split('T')[0]
  const seed = parseInt(date.replace(/-/g, ''))
  const index = seed % puzzleIds.length
  const selectedPuzzle = puzzleIds[index]

  redirect('/jogo/terras-001')
}
