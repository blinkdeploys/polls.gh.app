import { useState, useEffect } from 'react'
import { navigation, mockPresidentialResultSheet, mockParliamentaryResultSheet, mockSearch, mockJobDetails } from '../mock/jSearch'
import axios from 'axios'
import { URL_API } from './constants';
import { getAuthToken } from '../utils'
import useCsrfToken from './useCsrfToken'


const usePost = (query) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const { getCsrfToken } = useCsrfToken()

    useEffect(() => {
        setTimeout(() => {
            setMessage('')
        }, 20000)
    }, [message])

    const postData = async (endpoint, station, results, resultSheet) => {
        endpoint = endpoint.split('_')[0]
        if (endpoint.length <= 0) {
            console.log('There was an error saving result data. Missing URL')
            setIsError(true)
        }
        endpoint = `${endpoint}/save`
        const url = `${URL_API}/${endpoint}/`
        setIsLoading(true)
        const body = JSON.stringify({
            station: station,
            results: results,
            result_sheet: resultSheet,
        })
        const token = await getAuthToken()
        try {
            // let response = { data: { data: [] }}
            const csrfToken = await getCsrfToken()
            const response = await fetch(`${url}`, {
                                            'method': 'POST',
                                            'headers': {
                                                'X-CSRFToken': csrfToken,
                                                'Authorization': `Token ${token}`,
                                                'Content-Type': 'application/json',
                                                'Referer': `${URL_API}/`,
                                            },
                                            'body': body,
                                        });
            if (!response.ok) {
                throw new Error('An error was encountered posting form. Please try again.');
            }
            const data = await response.json()
            console.log(data?.message?.detail);
            setMessage(data?.message?.detail)
            setIsError(!data?.message?.ok)
            return data;
        } catch (error) {
            console.log('There was an error saving result data. Network error')
            setIsError(true)
            console.error(error);
        } finally {
            setIsLoading(false)
        }
    }
    
    return { isLoading, postData, message, isError }
}

export default usePost;
