/**
 * Agri2rist Hub – Global Search Bar with autocomplete
 * Used in Navbar and as standalone on the search page.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, TrendingUp, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAutocompleteSuggestions } from "@/lib/search-engine";

const RECENT_KEY = "a2r_recent_searches";
const MAX_RECENT = 6;

function getRecent(): string[] {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]"); }
  catch { return []; }
}
function saveRecent(q: string) {
  const recent = [q, ...getRecent().filter((r) => r !== q)].slice(0, MAX_RECENT);
  localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
}

interface SearchBarProps {
  className?: string;
  inputClassName?: string;
  placeholder?: string;
  autoFocus?: boolean;
  onSearch?: (query: string) => void;
  /** If true, renders as an inline expanding bar (Navbar mode) */
  compact?: boolean;
}

export function SearchBar({
  className,
  inputClassName,
  placeholder = "Search products, SKU, scientific name, farm…",
  autoFocus = false,
  onSearch,
  compact = false,
}: SearchBarProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [activeIdx, setActiveIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounced autocomplete
  useEffect(() => {
    const t = setTimeout(() => {
      if (query.length >= 2) {
        setSuggestions(getAutocompleteSuggestions(query, 7));
      } else {
        setSuggestions([]);
      }
    }, 200);
    return () => clearTimeout(t);
  }, [query]);

  // Load recent on focus
  const handleFocus = () => {
    setRecent(getRecent());
    setOpen(true);
    setActiveIdx(-1);
  };

  // Click-outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const submit = useCallback(
    (q: string) => {
      const trimmed = q.trim();
      if (!trimmed) return;
      saveRecent(trimmed);
      setOpen(false);
      setQuery(trimmed);
      if (onSearch) {
        onSearch(trimmed);
      } else {
        navigate(`/marketplace?q=${encodeURIComponent(trimmed)}`);
      }
    },
    [navigate, onSearch]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const list = suggestions.length ? suggestions : recent;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, list.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIdx >= 0 && list[activeIdx]) {
        submit(list[activeIdx]);
      } else {
        submit(query);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const showDropdown = open && (suggestions.length > 0 || (query.length === 0 && recent.length > 0));
  const displayList = query.length >= 2 ? suggestions : recent;
  const isRecent = query.length < 2;

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="relative flex items-center">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
        />
        <input
          ref={inputRef}
          type="search"
          value={query}
          autoFocus={autoFocus}
          placeholder={placeholder}
          onChange={(e) => { setQuery(e.target.value); setActiveIdx(-1); }}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          className={cn(
            "w-full pl-9 pr-8 py-2 rounded-lg border border-input bg-background text-sm text-foreground",
            "placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
            "transition-all",
            inputClassName
          )}
          aria-label="Search marketplace"
          aria-expanded={showDropdown}
          aria-haspopup="listbox"
          role="combobox"
          autoComplete="off"
        />
        {query && (
          <button
            onClick={() => { setQuery(""); inputRef.current?.focus(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div
          className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden"
          role="listbox"
        >
          {/* Section header */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
            {isRecent ? (
              <><Clock size={12} className="text-muted-foreground" /><span className="text-xs text-muted-foreground">Recent searches</span></>
            ) : (
              <><Search size={12} className="text-muted-foreground" /><span className="text-xs text-muted-foreground">Suggestions</span></>
            )}
          </div>

          {displayList.map((item, idx) => (
            <button
              key={item}
              onClick={() => submit(item)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors",
                idx === activeIdx ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
              )}
              role="option"
              aria-selected={idx === activeIdx}
            >
              {isRecent
                ? <Clock size={13} className="text-muted-foreground flex-shrink-0" />
                : <Search size={13} className="text-muted-foreground flex-shrink-0" />}
              <span className="flex-1 truncate">{item}</span>
              <ArrowRight size={11} className="text-muted-foreground flex-shrink-0" />
            </button>
          ))}

          {/* View all results link */}
          {query.length >= 2 && (
            <button
              onClick={() => submit(query)}
              className="w-full flex items-center gap-2 px-4 py-3 text-sm font-semibold text-primary hover:bg-primary/5 border-t border-border transition-colors"
            >
              <TrendingUp size={13} />
              Search all results for &ldquo;{query}&rdquo;
            </button>
          )}
        </div>
      )}
    </div>
  );
}
