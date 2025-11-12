import { useState, useEffect } from 'react';

export interface FetchOptions extends RequestInit {
    headers?: Record<string, string>;
}

export interface ErrorType extends Error {
    type?: string;
    message: string;
}

const useRequest = (url: string, options: FetchOptions) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (error: any) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, options]);

    return { data, error, loading };
};

export default useRequest;
