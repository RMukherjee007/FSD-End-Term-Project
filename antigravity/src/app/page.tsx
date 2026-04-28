import Link from "next/link";
import { ArrowRight, Search, Star, GitFork, Users, Activity } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-start w-full">
      {/* Hero Section */}
      <section className="relative w-full min-h-[85vh] flex flex-col items-center justify-center overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-background z-0" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-normal z-0 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-400/20 rounded-full blur-[100px] mix-blend-normal z-0" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] z-0 opacity-20 dark:opacity-10" />

        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto mt-[-5vh]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-8 animate-fade-in text-sm font-medium border-primary/30 text-primary">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-ping"></span>
            Introducing Antigravity v0.1
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/60 leading-[1.1]">
            Defy Gravity. <br />
            Launch Your Open Source Career.
          </h1>
          
          <p className="text-lg sm:text-xl text-foreground/70 mb-10 max-w-2xl leading-relaxed">
            Discover, track, and contribute to the most impactful open-source projects. Our premium platform analyzes metadata to find the perfect repository for your skill level.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link 
              href="/projects" 
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all"
            >
              Start Exploring
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/leaderboard" 
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 glass text-foreground rounded-full font-medium text-lg hover:bg-white/10 dark:hover:bg-white/5 transition-all"
            >
              <Activity className="w-5 h-5" />
              View Leaderboard
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Search & Filter Glass Container */}
      <section className="relative z-20 w-full max-w-5xl px-6 -mt-24 mb-32">
        <div className="glass rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col gap-6">
          <div className="flex items-center gap-4 bg-background/50 rounded-2xl p-2 border border-white/10">
            <Search className="w-6 h-6 ml-3 text-foreground/50" />
            <input 
              type="text" 
              placeholder="Search by language, framework, or topic..." 
              className="w-full bg-transparent border-none outline-none text-lg py-2"
            />
            <button className="hidden sm:block px-6 py-2 bg-primary text-white rounded-xl font-medium shadow-md">
              Search
            </button>
          </div>
          
          <div className="flex flex-wrap gap-3 items-center justify-center sm:justify-start">
            <span className="text-sm font-medium text-foreground/50 mr-2">Trending:</span>
            {['React', 'TypeScript', 'Next.js', 'Python', 'Rust', 'Machine Learning'].map(tag => (
              <button key={tag} className="px-3 py-1.5 text-sm rounded-full glass hover:bg-white/10 hover:text-primary transition-colors">
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
