import { useState, useEffect } from 'react'
import { navigation, mockPresidentialResultSheet, mockParliamentaryResultSheet, mockSearch, mockJobDetails } from '../mock/jSearch'
import axios from 'axios'
// import { RAPID_API_KEY } from '@env'

// const rapidApiKey = RAPID_API_KEY

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const options = {
      method: 'GET',
      url: `https://jsearch.p.rapidapi.com/${endpoint}`,
      headers: {
        'content-type': 'application/octet-stream',
        'X-RapidAPI-Key': `a71593e7f4msh3be636ca20edd97p10a060jsn239f5e936921`,
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
      },
      params: { ...query },
    };

    const fetchData = async () => {
        setIsLoading(true)

        try {
            // const response = await axios(options);
            let response = { data: { data: [] }}
            if (endpoint === 'presidential_sheet') {
                response = mockPresidentialResultSheet
            } else if (endpoint === 'parliamentary_sheet') {
                response = mockParliamentaryResultSheet
            } else if (endpoint === 'nav') {
                response = navigation
            } else if (endpoint === 'job-details') {
                response = mockJobDetails
            } else {
                response = mockSearch
            }
            setData(response.data.data);
            console.log('Data retreived successfully.');
        } catch (error) {
            console.log('There was an error accessing the endpoint')
            setIsError(error)
            console.error(error);
        } finally {
            setIsLoading(false)
        }
    }
    
    useEffect(() => {
        fetchData()
    }, [])

    const refetch = () => {
        setIsLoading(true)
        fetchData()
    }

    return { data, isLoading, isError, refetch }
}

export default useFetch;