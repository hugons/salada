import { readdirSync } from 'fs'
import { join } from 'path'
import Link from 'next/link'

export default function Catalogo() {
  const puzzlesDir = join(process.cwd(), 'data', 'puzzles')
  const files = readdirSync(puzzlesDir)
  const puzzleIds = files.filter(file => file.endsWith('.json')).map(file => file.replace('.json', ''))

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Catálogo de Puzzles</h1>
      <ul>
        {puzzleIds.map(id => (
          <li key={id} className="mb-2">
            <Link href={`/jogo/${id}`} className="text-blue-500 hover:underline">
              Puzzle {id}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
