/**
 * Agri2rist Hub – useIntersection Hook
 * Wraps IntersectionObserver for performant lazy-load and enter-viewport effects.
 */
import { useEffect, useRef, useState } from "react";

interface UseIntersectionOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean; // stop observing after first intersection (default: true)
}

export function useIntersection<T extends Element = HTMLDivElement>(
  options: UseIntersectionOptions = {}
): [React.RefObject<T>, boolean] {
  const { threshold = 0.1, rootMargin = "0px", once = true } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, isVisible];
}
