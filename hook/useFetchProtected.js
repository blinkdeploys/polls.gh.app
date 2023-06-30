import { useState, useEffect } from 'react'
import { navigation, mockPresidentialResultSheet, mockParliamentaryResultSheet, mockSearch, mockJobDetails } from '../mock/jSearch'
import { URL_API } from './constants'
import axios from 'axios'
import {
    getAuthToken, 
    // getCSRFToken, getUserProfile, saveAuthToken, saveCSRFToken, saveUserProfile
} from '../utils'
import useCsrfToken from './useCsrfToken'
import AsyncStorage from '@react-native-async-storage/async-storage';


const useFetchProtected = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const { getCsrfToken } = useCsrfToken()

    const fetchData = async (endpoint, station) => {
        setIsLoading(true)
        try {
            const url = `${URL_API}/${endpoint}/`
            const csrfToken = await getCsrfToken()
            const token = await getAuthToken()
            const body = JSON.stringify({ station })
            // const csrfToken = await getCSRFToken()
            const response = await fetch(`${url}`, {
                                            'method': 'POST',
                                            'headers': {
                                                'Content-Type': 'application/json',
                                                'X-CSRFToken': csrfToken,
                                                'Authorization': `Token ${token}`,
                                                'Referer': `${URL_API}/`,
                                            },
                                            'body': body,
                                        });
            if (!response.ok) { throw new Error('Data fetch failed') }
            const data = await response.json()
            setIsLoading(false)
            await AsyncStorage.setItem(`${endpoint}_data`, JSON.stringify(data.data))
            return data.data.sheet
        } catch (error) {
            // Handle error
            setIsError(true)
            console.error('Error fetching protected data:', error);
        }
    }

    return { fetchData, isLoading, isError }
};

export default useFetchProtected;