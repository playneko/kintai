import { useCallback } from 'react';

export default function useFetcher() {
  const fetcher = useCallback(async (reqUrl, method = 'GET', body = null, headers = {}) => {
    const opts = {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers,
      },
    };
    if (body != null) opts.body = JSON.stringify(body);

    const response = await fetch(reqUrl, opts);
    const text = await response.text();

    // Try parse JSON
    let parsed = null;
    if (text) {
      try {
        parsed = JSON.parse(text);
      } catch (parseError) {
        const snippet = text.slice(0, 200);
        throw new Error(`Invalid JSON response${response.ok ? '' : ` (status ${response.status})`}: ${snippet}`);
      }
    }

    if (!response.ok) {
      const err = new Error(`HTTP error ${response.status}: ${response.statusText}`);
      err.status = response.status;
      // attach parsed JSON body if available, otherwise attach raw text
      err.body = parsed !== null ? parsed : text;
      throw err;
    }

    return parsed;
  }, []);

  return fetcher;
}
