import Link from "next/link";
import { Search, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 glass border-b border-white/10 dark:border-white/5">
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/30">
            A
          </div>
          <span className="font-semibold text-xl tracking-tight hidden sm:block">Antigravity</span>
        </Link>
        <div className="hidden md:flex items-center gap-1 text-sm font-medium text-foreground/80">
          <Link href="/projects" className="px-3 py-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors">Projects</Link>
          <Link href="/leaderboard" className="px-3 py-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors">Leaderboard</Link>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="pl-9 pr-4 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-primary/50 focus:bg-transparent outline-none transition-all w-64 text-sm"
          />
        </div>
        
        <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path></svg>
        </button>
        <button className="flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors border border-primary/20">
          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="w-3.5 h-3.5" />
          </div>
          <span className="text-sm font-medium">Sign In</span>
        </button>
      </div>
    </nav>
  );
}
