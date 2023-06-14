import { useState } from 'react';

const URL = 'https://app.blinkdeploys-env.blinkdeploys.arc.domains/api/poll/app/login/' // 'https://www.localhost.architect.sh/api/poll/app/login/'

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
        const response = await fetch(URL, {
                                        'method': 'POST',
                                        'headers': {
                                            'Content-Type': 'application/json',
                                        },
                                        'body': JSON.stringify({ username, password }),
                                    });
        // console.log('*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*')
        // console.log(response)
        // console.log('*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*')
        if (!response.ok) {
            throw new Error(`Login failed (${response.status})`);
        }
        const data = await response.json();
        return data.token;
    } catch (error) {
        setError(error.message);
        return null;
    } finally {
        setLoading(false);
    }
  };

  return { loading, error, login };
};

export default useLogin;
