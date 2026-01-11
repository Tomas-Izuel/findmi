"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface UseInfiniteScrollOptions<T> {
  fetchFn: (page: number) => Promise<{
    data: T[];
    hasMore: boolean;
  }>;
  prefetchThreshold?: number; // Porcentaje del scroll donde pre-fetchear (0-1)
}

interface UseInfiniteScrollReturn<T> {
  data: T[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  reset: () => void;
}

export function useInfiniteScroll<T>({
  fetchFn,
  prefetchThreshold = 0.5, // Pre-fetch al 50% del scroll
}: UseInfiniteScrollOptions<T>): UseInfiniteScrollReturn<T> {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const isFetchingRef = useRef(false);
  const prefetchedRef = useRef(false);

  // Fetch inicial
  const fetchInitial = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchFn(1);
      setData(result.data);
      setHasMore(result.hasMore);
      setPage(1);
      prefetchedRef.current = false;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar datos");
    } finally {
      setIsLoading(false);
    }
  }, [fetchFn]);

  // Pre-fetch siguiente página (sin mostrar loading)
  const prefetchNext = useCallback(async () => {
    if (prefetchedRef.current || isFetchingRef.current || !hasMore) return;

    prefetchedRef.current = true;
    isFetchingRef.current = true;

    try {
      const nextPage = page + 1;
      const result = await fetchFn(nextPage);

      setData((prev) => [...prev, ...result.data]);
      setHasMore(result.hasMore);
      setPage(nextPage);
    } catch {
      // Silently fail on prefetch
      prefetchedRef.current = false;
    } finally {
      isFetchingRef.current = false;
    }
  }, [fetchFn, hasMore, page]);

  // Scroll handler con pre-fetch
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const scrollPercentage = scrollTop / (scrollHeight - clientHeight);

      // Pre-fetch cuando llegamos al umbral
      if (
        scrollPercentage >= prefetchThreshold &&
        hasMore &&
        !isFetchingRef.current
      ) {
        prefetchNext();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [hasMore, prefetchNext, prefetchThreshold]);

  // Fetch inicial al montar
  useEffect(() => {
    fetchInitial();
  }, [fetchInitial]);

  // Reset function
  const reset = useCallback(() => {
    setData([]);
    setPage(1);
    setHasMore(true);
    prefetchedRef.current = false;
    fetchInitial();
  }, [fetchInitial]);

  return {
    data,
    isLoading,
    error,
    hasMore,
    containerRef,
    reset,
  };
}
