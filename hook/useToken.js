import { useState } from 'react';


const URL = 'https://app.blinkdeploys-env.blinkdeploys.arc.domains/api/poll/app/csrf/' // 'https://www.localhost.architect.sh/api/poll/app/login/'

const useToken = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getToken = async () => {
    setLoading(true);
    setError(null);

    try {
        const response = await fetch(URL, {
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
