/**
 * Agri2rist Hub – Performance Utilities
 * Web Vitals collection, memo helpers, and debounce/throttle utilities.
 */

// ─── WEB VITALS REPORTER ─────────────────────────────────────────────────────
// Logs Core Web Vitals to console in development; hook into analytics in prod.

type VitalName = "CLS" | "FID" | "FCP" | "LCP" | "TTFB" | "INP";

interface VitalEntry { name: VitalName; value: number; rating: "good" | "needs-improvement" | "poor" }

const THRESHOLDS: Record<VitalName, [number, number]> = {
  CLS:  [0.1,   0.25],
  FID:  [100,   300],
  FCP:  [1800,  3000],
  LCP:  [2500,  4000],
  TTFB: [800,   1800],
  INP:  [200,   500],
};

function rate(name: VitalName, value: number): VitalEntry["rating"] {
  const [good, poor] = THRESHOLDS[name] ?? [0, 0];
  if (value <= good) return "good";
  if (value <= poor) return "needs-improvement";
  return "poor";
}

export function reportWebVitals(onReport?: (entry: VitalEntry) => void): void {
  if (typeof window === "undefined" || !("PerformanceObserver" in window)) return;

  const report = (name: VitalName, value: number) => {
    const entry: VitalEntry = { name, value, rating: rate(name, value) };
    if (import.meta.env.DEV) {
      const color = entry.rating === "good" ? "green" : entry.rating === "needs-improvement" ? "orange" : "red";
      console.log(`%c[Web Vital] ${name}: ${value.toFixed(1)}ms (${entry.rating})`, `color:${color};font-weight:bold`);
    }
    onReport?.(entry);
  };

  // LCP
  try {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      if (entries.length) report("LCP", entries[entries.length - 1].startTime);
    }).observe({ type: "largest-contentful-paint", buffered: true });
  } catch { /* not supported */ }

  // FCP
  try {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if ((entry as PerformanceEntry & { name: string }).name === "first-contentful-paint") {
          report("FCP", entry.startTime);
        }
      }
    }).observe({ type: "paint", buffered: true });
  } catch { /* not supported */ }
}

// ─── DEBOUNCE ────────────────────────────────────────────────────────────────

export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// ─── THROTTLE ────────────────────────────────────────────────────────────────

export function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => { inThrottle = false; }, limit);
    }
  };
}

// ─── MEMOIZE ─────────────────────────────────────────────────────────────────

export function memoize<T extends (...args: unknown[]) => unknown>(fn: T): T {
  const cache = new Map<string, unknown>();
  return ((...args: unknown[]) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}
