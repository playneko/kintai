import { useState, useEffect } from 'react';
import useFetcher from './useFetcher';

function useFetchData(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Imperative fetcher from separate hook
  const fetcher = useFetcher();

  // Keep the original hook behavior when a URL is provided
  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const parsed = await fetcher(url);
        if (!cancelled) setData(parsed);
      } catch (err) {
        console.error('Error fetching/parsing data:', err);
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (url) load();

    return () => {
      cancelled = true;
    };
  }, [url, fetcher]);

  // If called with no URL, return the imperative fetch function (used like: const fetchData = useFetchData();)
  if (!url) return fetcher;

  return { data, loading, error, refetch: () => fetcher(url) };
}

export default useFetchData;