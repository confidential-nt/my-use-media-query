import { useEffect, useState } from 'react';

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl';

const BREAK_POINTS: Record<Breakpoint, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

type MediaQueryInput =
  | string
  | {
      above: Breakpoint;
      below?: Breakpoint;
      between?: never;
    }
  | {
      above?: Breakpoint;
      below: Breakpoint;
      between?: never;
    }
  | {
      between: [Breakpoint, Breakpoint];
      above?: never;
      below?: never;
    };

export default function useMediaQuery(input: MediaQueryInput): boolean {
  let query = '';
  if (typeof input === 'string') {
    query = input;
  } else {
    const { above, below, between } = input;

    if (between && (above || below)) {
      throw new Error(
        'useMediaQuery: You can only use "between" or "above"/"below" at a time.'
      );
    }

    if (between) {
      const [minKey, maxKey] = between;
      query = `(min-width: ${BREAK_POINTS[minKey]}px) and (max-width: ${BREAK_POINTS[maxKey]}px)`;
    } else if (above && below) {
      query = `(min-width: ${BREAK_POINTS[above]}px) and (max-width: ${BREAK_POINTS[below]}px)`;
    } else if (above) {
      query = `(min-width: ${BREAK_POINTS[above]}px)`;
    } else if (below) {
      query = `(max-width: ${BREAK_POINTS[below]}px)`;
    } else {
      throw new Error(
        'useMediaQuery: Invalid input. Please provide a valid media query string or breakpoint configuration.'
      );
    }
  }
  const [matches, setMatches] = useState(() => {
    return typeof window !== 'undefined'
      ? window.matchMedia(query).matches
      : false;
  });

  useEffect(() => {
    console.log(`Media query: ${query}`);
    const mediaQuery = window.matchMedia(query);
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);

    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}
