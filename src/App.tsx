import { useState, useMemo, useCallback, useEffect } from 'react'
import { HashRouter, Routes, Route, NavLink, useSearchParams } from 'react-router-dom'
import {
  Search, Heart, Copy, Check, Sparkles, BookOpen, ExternalLink,
  Code, Pen, Megaphone, FlaskConical, Image, Zap, X,
} from 'lucide-react'
import { PROMPTS, CATEGORY_META, type Category, type Prompt } from './data/prompts'
import './index.css'

const CATEGORY_ICONS: Record<Category, typeof Code> = {
  coding: Code,
  writing: Pen,
  marketing: Megaphone,
  research: FlaskConical,
  'image-gen': Image,
  productivity: Zap,
}

function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem('prompt-vault-favorites')
      return stored ? new Set(JSON.parse(stored)) : new Set()
    } catch {
      return new Set()
    }
  })

  const toggle = useCallback((id: string) => {
    setFavorites(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      localStorage.setItem('prompt-vault-favorites', JSON.stringify([...next]))
      return next
    })
  }, [])

  return { favorites, toggle }
}

function PromptCard({ prompt, isFav, onToggleFav }: { prompt: Prompt; isFav: boolean; onToggleFav: () => void }) {
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const meta = CATEGORY_META[prompt.category]
  const Icon = CATEGORY_ICONS[prompt.category]

  async function copy() {
    await navigator.clipboard.writeText(prompt.prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="glass rounded-xl p-5 flex flex-col gap-3 group">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${meta.color}`} />
          <span className={`text-xs font-medium ${meta.color}`}>{meta.label}</span>
        </div>
        <button
          onClick={onToggleFav}
          className={`transition-colors ${isFav ? 'text-status-danger' : 'text-dim hover:text-status-danger'}`}
          title={isFav ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className="w-4 h-4" fill={isFav ? 'currentColor' : 'none'} />
        </button>
      </div>

      <h3 className="text-base font-semibold text-foreground">{prompt.title}</h3>

      <pre
        className={`text-sm text-muted-foreground whitespace-pre-wrap font-sans leading-relaxed ${
          expanded ? '' : 'line-clamp-4'
        }`}
      >
        {prompt.prompt}
      </pre>

      <div className="flex items-center justify-between mt-auto pt-2 border-t border-border">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-dim hover:text-foreground transition-colors"
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
        <div className="flex items-center gap-2">
          <div className="flex gap-1 flex-wrap">
            {prompt.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-full bg-surface-raised text-dim">
                {tag}
              </span>
            ))}
          </div>
          <button
            onClick={copy}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-accent-cyan/10 text-accent-cyan text-xs font-medium hover:bg-accent-cyan/20 transition-colors"
          >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  )
}

function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('q') ?? '')
  const [activeCategory, setActiveCategory] = useState<Category | 'all' | 'favorites'>(
    (searchParams.get('cat') as Category) ?? 'all'
  )
  const { favorites, toggle } = useFavorites()

  useEffect(() => {
    const params: Record<string, string> = {}
    if (search) params.q = search
    if (activeCategory !== 'all') params.cat = activeCategory
    setSearchParams(params, { replace: true })
  }, [search, activeCategory, setSearchParams])

  const filtered = useMemo(() => {
    return PROMPTS.filter(p => {
      if (activeCategory === 'favorites') return favorites.has(p.id)
      if (activeCategory !== 'all' && p.category !== activeCategory) return false
      if (!search) return true
      const q = search.toLowerCase()
      return (
        p.title.toLowerCase().includes(q) ||
        p.prompt.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      )
    })
  }, [search, activeCategory, favorites])

  const categories: (Category | 'all' | 'favorites')[] = ['all', ...Object.keys(CATEGORY_META) as Category[], 'favorites']

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-accent-cyan" />
            <h1 className="text-3xl font-bold text-foreground">AI Prompt Vault</h1>
          </div>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Curated collection of powerful AI prompts for developers, writers, marketers, and creators.
            Copy, customize, and use instantly.
          </p>
          <p className="text-sm text-dim mt-2">{PROMPTS.length} prompts across {Object.keys(CATEGORY_META).length} categories</p>
        </div>
      </header>

      {/* Search & Filters */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dim" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search prompts by title, content, or tag..."
            className="w-full pl-10 pr-10 py-3 bg-surface rounded-xl border border-border text-foreground text-sm focus:outline-none focus:border-accent-cyan/50"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-dim hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex gap-2 flex-wrap mb-6">
          {categories.map(cat => {
            const isActive = activeCategory === cat
            const label = cat === 'all' ? 'All' : cat === 'favorites' ? `Favorites (${favorites.size})` : CATEGORY_META[cat].label
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/40'
                    : 'bg-surface text-muted-foreground border border-border hover:text-foreground'
                }`}
              >
                {cat === 'favorites' && <Heart className="w-3 h-3 inline mr-1" />}
                {label}
              </button>
            )
          })}
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No prompts found.</p>
            <p className="text-sm text-dim mt-1">Try a different search or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map(p => (
              <PromptCard
                key={p.id}
                prompt={p}
                isFav={favorites.has(p.id)}
                onToggleFav={() => toggle(p.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center">
          <p className="text-sm text-muted-foreground">
            Built with ❤️ by{' '}
            <a href="https://github.com/CrashyCrash" target="_blank" rel="noopener noreferrer" className="text-accent-cyan hover:underline">
              Crash
            </a>
          </p>
          <div className="flex items-center justify-center gap-4 mt-3">
            <a
              href="https://buymeacoffee.com/crashycrash"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-accent-orange hover:underline"
            >
              ☕ Buy me a coffee
            </a>
            <a
              href="https://github.com/sponsors/CrashyCrash"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-accent-purple hover:underline"
            >
              💜 Sponsor
            </a>
            <a
              href="https://github.com/CrashyCrash/ai-prompt-vault"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              <ExternalLink className="w-3 h-3" /> GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function ResourcesPage() {
  const resources = [
    { name: 'ChatGPT', desc: 'OpenAI\'s conversational AI', url: 'https://chat.openai.com/' },
    { name: 'Claude', desc: 'Anthropic\'s AI assistant', url: 'https://claude.ai/' },
    { name: 'Midjourney', desc: 'AI image generation', url: 'https://midjourney.com/' },
    { name: 'Stable Diffusion', desc: 'Open-source image generation', url: 'https://stability.ai/' },
    { name: 'GitHub Copilot', desc: 'AI-powered code completion', url: 'https://github.com/features/copilot' },
    { name: 'Cursor', desc: 'AI-first code editor', url: 'https://cursor.sh/' },
    { name: 'Perplexity', desc: 'AI-powered research engine', url: 'https://perplexity.ai/' },
    { name: 'Prompt Engineering Guide', desc: 'Comprehensive prompt techniques', url: 'https://www.promptingguide.ai/' },
  ]

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <NavLink to="/" className="text-xs text-accent-cyan hover:underline mb-6 block">← Back to Prompts</NavLink>
        <h1 className="text-2xl font-bold text-foreground mb-2">AI Resources</h1>
        <p className="text-sm text-muted-foreground mb-8">Curated tools and platforms for AI-powered productivity.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.map(r => (
            <a
              key={r.name}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-surface rounded-xl border border-border hover:border-border-active transition-colors group flex items-start gap-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground group-hover:text-accent-cyan">{r.name}</span>
                  <ExternalLink className="w-3 h-3 text-dim" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">{r.desc}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 p-6 bg-surface-raised rounded-xl border border-border text-center">
          <h2 className="text-lg font-bold text-foreground mb-2">Support AI Prompt Vault</h2>
          <p className="text-sm text-muted-foreground mb-4">Help keep this collection growing!</p>
          <div className="flex items-center justify-center gap-4">
            <a href="https://buymeacoffee.com/crashycrash" target="_blank" rel="noopener noreferrer"
               className="px-6 py-2 bg-accent-orange/15 text-accent-orange rounded-lg text-sm font-medium hover:bg-accent-orange/25 transition-colors">
              ☕ Buy me a coffee
            </a>
            <a href="https://github.com/sponsors/CrashyCrash" target="_blank" rel="noopener noreferrer"
               className="px-6 py-2 bg-accent-purple/15 text-accent-purple rounded-lg text-sm font-medium hover:bg-accent-purple/25 transition-colors">
              💜 Sponsor on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/resources" element={<ResourcesPage />} />
    </Routes>
  )
}
