import { useState } from 'react';
import { URL_API } from '../constants';


const useToken = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getToken = async () => {
    setLoading(true);
    setError(null);

    try {
        const response = await fetch(URL_API, {
                                        'method': 'GET',
                                        'headers': {
                                            'Content-Type': 'application/json',
                                        },
                                    });
        if (!response.ok) {
            throw new Error('Token fetch failed');
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

  return { loading, error, getToken };
};

export default useToken;
