import { useState, useEffect } from 'react'
import { navigation, mockPresidentialResultSheet, mockParliamentaryResultSheet, mockSearch, mockJobDetails } from '../mock/jSearch'
import { URL } from './constants'
import axios from 'axios'
import {
    getAuthToken, getCSRFToken, getUserProfile,
    saveAuthToken, saveCSRFToken, saveUserProfile
} from '../utils'

const useFectProtected = async ({ endpoint }) => {
    try {
        const csrfToken = getCSRFToken()
        const token = getAuthToken()
  
        const response = await axios.get(`${URL}/${endpoint}`, {
            headers: {
                'X-CSRFToken': csrfToken,
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
        });
  
        // Handle the response for protected data
        if (!response.ok) {
            throw new Error('Data fetch failed')
        }
        const data = await response.json()
        return data
    } catch (error) {
        // Handle error
        console.error('Error fetching protected data:', error);
    }
};

export default useFectProtected;