import { useState } from 'react';
import { URL_LOCALHOST } from './constants'; 


const useCsrfToken = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCsrfToken = async () => {
    setLoading(true);
    setError(null);
    const endpoint = 'csrf'
    const url = `${URL_LOCALHOST}${endpoint}/`
    try {
        const response = await fetch(url, {
                                        'method': 'GET',
                                        'headers': {
                                            'Content-Type': 'application/json',
                                        },
                                    });
        if (!response.ok) {
            throw new Error('CSRF Token fetch failed');
        }
        const data = await response.json();
        return data.csrfToken;
    } catch (error) {
        setError(error.message);
        return null;
    } finally {
        setLoading(false);
    }
  };

  return { loading, error, getCsrfToken };
};

export default useCsrfToken;
