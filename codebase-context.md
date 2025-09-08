# New Salad - Jogo de Palavras

## 📋 Resumo do Projeto

New Salad é uma aplicação web de jogo de palavras inspirada no Word Salad, desenvolvida em Next.js 14 com React 18 e TypeScript. O jogo permite aos utilizadores encontrar palavras escondidas numa grelha, com funcionalidades avançadas como validação em tempo real, timer, partilha de resultados e PWA instalável.

## 🎯 Funcionalidades Implementadas

### ✅ Funcionalidades Core
- **Jogo Diário**: Puzzle que muda automaticamente todos os dias baseado na data
- **Múltiplos Puzzles**: Suporte para diferentes temas (capitais, animais, teste)
- **Seleção Inteligente**: Drag & drop ou click para selecionar palavras
- **Validação Automática**: Verifica se o caminho e letras correspondem à palavra
- **Timer em Tempo Real**: Cronómetro que conta o tempo de jogo
- **Sistema de Pontuação**: Guarda melhores tempos localmente

### ✅ Funcionalidades Avançadas
- **Partilha de Resultados**: Gera grid emoji + tempo para partilhar
- **Dicas**: Mostra primeira letra de palavras não encontradas
- **Leaderboard Local**: Armazenamento de melhores tempos no dispositivo
- **PWA Completa**: Instalável offline com manifest e service worker
- **Responsive Design**: Funciona perfeitamente em mobile e desktop
- **Fade Out Inteligente**: Letras desaparecem quando não necessárias
- **Suporte Touch**: Otimizado para dispositivos móveis

### ✅ UX/UI
- **Interface Intuitiva**: Design limpo com Tailwind CSS
- **Feedback Visual**: Destaque de seleção e palavras encontradas
- **Animações Suaves**: Transições CSS para melhor experiência
- **Português de Portugal**: Linguagem nativa

## 🏗️ Arquitetura do Projeto

### 📁 Estrutura de Ficheiros

```
newSalad/
├── data/
│   └── puzzles/
│       ├── capitais-001.json    # Puzzle das capitais
│       ├── bears-001.json       # Puzzle dos ursos
│       └── test-001.json        # Puzzle de teste
├── public/
│   └── manifest.json            # PWA manifest
├── src/
│   ├── app/
│   │   ├── diario/
│   │   │   └── page.tsx         # Página do puzzle diário
│   │   ├── jogo/
│   │   │   └── [id]/
│   │   │       └── page.tsx     # Página dinâmica de puzzles
│   │   ├── catalogo/
│   │   │   └── page.tsx         # Catálogo de puzzles
│   │   ├── layout.tsx           # Layout principal
│   │   ├── page.tsx             # Página inicial
│   │   └── globals.css          # Estilos globais
│   ├── components/
│   │   └── Game.tsx             # Componente principal do jogo
│   └── types/
│       └── puzzle.ts            # Tipos TypeScript
├── package.json                  # Dependências
├── next.config.js               # Configuração Next.js
├── tsconfig.json                # Configuração TypeScript
├── tailwind.config.js           # Configuração Tailwind
└── postcss.config.js            # Configuração PostCSS
```

### 🗂️ Formato dos Dados

Cada puzzle é um ficheiro JSON com a seguinte estrutura:

```json
{
  "id": "capitais-001",
  "title": "Capitais do Mundo",
  "theme": "Capitais",
  "size": 4,
  "grid": "PARE\nBIMO\nALSY\nCTOK",
  "words": [
    {
      "key": "paris",
      "display": "PARIS",
      "path": [[0,0],[0,1],[0,2],[1,1],[2,2]]
    }
  ]
}
```

- **id**: Identificador único do puzzle
- **title**: Título do puzzle
- **theme**: Tema/categoria
- **size**: Dimensão da grelha (NxN)
- **grid**: String com quebras de linha representando a grelha
- **words**: Array de palavras com chave, display e caminho

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Next.js 14**: Framework React com App Router
- **React 18**: Biblioteca para interfaces
- **TypeScript**: Tipagem estática
- **Tailwind CSS**: Framework CSS utilitário

### Funcionalidades
- **PWA**: Progressive Web App com manifest
- **Local Storage**: Persistência de dados locais
- **Touch Events**: Suporte nativo para mobile
- **CSS Transitions**: Animações suaves

### Desenvolvimento
- **ESLint**: Linting de código
- **PostCSS**: Processamento CSS
- **Autoprefixer**: Prefixos CSS automáticos

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação
```bash
# Clonar repositório
git clone <repo-url>
cd newSalad

# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev
```

### Acesso
- **Página Inicial**: http://localhost:3000
- **Jogo Diário**: http://localhost:3000/diario
- **Catálogo**: http://localhost:3000/catalogo
- **Puzzle Específico**: http://localhost:3000/jogo/[id]

## 🎮 Como Jogar

1. **Seleção**: Arraste o dedo/mouse ou clique nas letras adjacentes
2. **Validação**: O jogo verifica automaticamente se é uma palavra válida
3. **Feedback**: Palavras encontradas aparecem na lista
4. **Desaparecimento**: Letras não necessárias desaparecem com fade out
5. **Vitória**: Quando encontrares todas as palavras

## 🔧 Funcionalidades Técnicas

### Validação de Palavras
- Verifica se o caminho selecionado corresponde ao caminho armazenado
- Confirma se as letras formam exatamente a palavra
- Suporte para caminhos complexos (não só linhas retas)

### Sistema de Fade Out
- Calcula em tempo real quais letras são necessárias
- Aplica transição CSS suave de 2 segundos
- Remove interações de letras invisíveis

### PWA
- Manifest configurado para instalação
- Funciona offline para puzzles carregados
- Design responsivo otimizado

### Persistência
- Melhores tempos guardados em localStorage
- Estado do jogo mantido durante sessão
- Suporte para múltiplos puzzles

## 📊 Algoritmos Implementados

### Verificação de Adjacência
```typescript
const dr = Math.abs(row - last[0])
const dc = Math.abs(col - last[1])
if (dr <= 1 && dc <= 1 && !(dr === 0 && dc === 0)) {
  // Adjacente
}
```

### Validação de Palavras
```typescript
const pathStr = currentPath.map(([r, c]) => `${r},${c}`).join(';')
const wordLetters = currentPath.map(([r, c]) => grid[r][c]).join('')
const matchedWord = puzzle.words.find(word =>
  word.path.join(';') === pathStr &&
  word.display === wordLetters
)
```

### Visibilidade de Letras
```typescript
const isLetterVisible = (row: number, col: number) => {
  return puzzle.words.some(word =>
    !foundWords.has(word.key) &&
    word.path.some(([r, c]) => r === row && c === col)
  )
}
```

## 🎯 Melhorias Futuras

- [ ] Sistema de utilizadores e leaderboard global
- [ ] Mais temas de puzzles
- [ ] Modo multiplayer
- [ ] Dificuldade progressiva
- [ ] Suporte para diferentes idiomas
- [ ] Animações mais avançadas
- [ ] Sons e efeitos sonoros

## 📝 Notas de Desenvolvimento

### Decisões Técnicas
- **Next.js App Router**: Para melhor performance e SEO
- **Client Components**: Para interatividade complexa
- **Tailwind CSS**: Para desenvolvimento rápido e consistente
- **TypeScript**: Para melhor manutenção e debugging

### Otimizações
- **Lazy Loading**: Componentes carregados sob demanda
- **Memoização**: Prevenção de re-renders desnecessários
- **CSS Transitions**: Animações performáticas
- **Touch Optimization**: Experiência nativa em mobile

## 🤝 Contribuição

Para contribuir:
1. Fork o projeto
2. Cria uma branch para a feature
3. Commit das mudanças
4. Push para a branch
5. Abre um Pull Request

## 📄 Licença

Este projeto é open source sob a licença MIT.

---

**Desenvolvido com ❤️ para amantes de jogos de palavras!**
