import { useState } from 'react';
import { saveApiUrl, saveAuthToken, saveCSRFToken, saveUserProfile } from '../utils'
import useCsrfToken from './useCsrfToken'
import { URL_API } from '../constants'


const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getCsrfToken } = useCsrfToken()

  const login = async (username, password) => {
    const endpoint = 'login'
    const loginUrl = `${URL_API}/${endpoint}/`
    const body = JSON.stringify({ username, password })
    const csrfToken = await getCsrfToken()
    setLoading(true);
    setError(null);
    try {
        const response = await fetch(loginUrl, {
                                        'method': 'POST',
                                        'headers': {
                                            'Content-Type': 'application/json',
                                            'Referer': `${URL_API}/`,
                                            'X-CSRFToken': `${csrfToken}`,
                                        },
                                        'body': body,
                                    });
        if (!response.ok) {
            throw new Error(`Login failed (${response.status})`);
        }
        const data = await response.json();
        await saveApiUrl(URL_API)
        await saveAuthToken(data?.token)
        await saveCSRFToken(data?.csrfToken)
        await saveUserProfile(data)
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
