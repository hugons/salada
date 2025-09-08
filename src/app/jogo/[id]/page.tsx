import { readFileSync } from 'fs'
import { join } from 'path'
import Game from '@/components/Game'
import { Puzzle } from '@/types/puzzle'
import { notFound } from 'next/navigation'

interface PageProps {
  params: { id: string }
}

export default function Jogo({ params }: PageProps) {
  try {
    const filePath = join(process.cwd(), 'data', 'puzzles', `${params.id}.json`)
    const fileContents = readFileSync(filePath, 'utf8')
    const puzzle: Puzzle = JSON.parse(fileContents)
    return <Game puzzle={puzzle} />
  } catch {
    notFound()
  }
}
