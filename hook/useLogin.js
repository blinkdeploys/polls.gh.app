import { useState } from 'react';
import { saveAuthToken, saveCSRFToken, saveUserProfile } from '../utils'
import useCsrfToken from './useCsrfToken'
import { URL, URL_LOCALHOST } from './constants'


const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getCsrfToken } = useCsrfToken()

  const login = async (username, password) => {
    const endpoint = 'login'
    const loginUrl = `${URL_LOCALHOST}${endpoint}/`
    const body = JSON.stringify({ username, password })
    const csrfToken = await getCsrfToken()
    setLoading(true);
    setError(null);
    try {
        const response = await fetch(loginUrl, {
                                        'method': 'POST',
                                        'headers': {
                                            'Content-Type': 'application/json',
                                            'X-CSRFToken': csrfToken,
                                        },
                                        'body': body,
                                    });
        if (!response.ok) {
            throw new Error(`Login failed (${response.status})`);
        }
        const data = await response.json();
        saveAuthToken(data?.token)
        saveCSRFToken(data?.csrfToken)
        saveUserProfile(data)
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
