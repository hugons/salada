import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Salada de palavras</h1>
      <p className="text-lg mb-8">Jogo de palavras inspirado no Word Salad</p>
      <div className="flex gap-4">
        <Link href="/diario" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Puzzle Diário
        </Link>
        <Link href="/catalogo" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Catálogo
        </Link>
      </div>
    </main>
  )
}
