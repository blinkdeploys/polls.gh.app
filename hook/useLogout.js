import { useState } from 'react';
import { URL_API } from '../constants';


const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const logout = async () => {
    setLoading(true);
    setError(null);

    try {
        const response = await fetch(URL_API, {
                                        'method': 'POST',
                                        'headers': {
                                            'Content-Type': 'application/json',
                                        },
                                        'body': JSON.stringify({}),
                                    });
        if (!response.ok) {
            throw new Error('Logout failed');
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

  return { loading, error, logout };
};

export default useLogout;
