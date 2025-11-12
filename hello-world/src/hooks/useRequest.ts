import { useState, useEffect } from 'react';

export interface FetchState<T> {
    data: T | null;
    error: Error | null;
    loading: boolean;
}

function useFetch<T>(url: string, options?: RequestInit): FetchState<T> {
    const [state, setState] = useState<FetchState<T>>({
        data: null,
        error: null,
        loading: true,
    });

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            setState({ data: null, error: null, loading: true });
            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (isMounted) {
                    setState({ data, error: null, loading: false });
                }
            } catch (error) {
                if (isMounted) {
                    setState({ data: null, error: error as Error, loading: false });
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [url, options]);

    return state;
}

export default useFetch;
