import AsyncStorage from '@react-native-async-storage/async-storage';
import { ASKEY_TOKEN, ASKEY_CSRF_TOKEN, ASKEY_PROFILE, ASKEY_URL } from '../constants'


export const isValid = (token) => {
    return (!(token === null
            || token === undefined
            || token === false
            || token === ''
            || token === {}))
}

export const checkImageURL = (url) => {
    if(!url) { return false }
    else {
        const pattern  = new RegExp('https?:\\/\\/.+\\.(png|jgp|jpeg|bmp|gif|webp)$', 'i')
        return pattern.test(url)
    }
}


export const getAsync = async (token) => {
    if (token instanceof Promise) {
        token.then((data) => {
            return data;
        }).catch((err) => {
            console.log(err);
            return '';
        })
    } else if (typeof token === 'string' || typeof token === 'object') {
        if (!token) { return token; }
        console.log('Error empty storage data.');
        return '';
    } else {
        console.log('Error fetching storage data.');
        return '';
    }
}

export const saveASData = async (askey, data) => {
    try {
        if (typeof data === 'object') {
            data = JSON.stringify(data)
        }
        await AsyncStorage.setItem(askey, data);
    } catch (error) {
        // Handle error
        console.log(error)
    }
};

export const getASData = async (askey, parse=false) => {
    try {
        let data = await AsyncStorage.getItem(askey);
        return parse ? JSON.parse(data) : data;
    } catch (error) {
        // Handle error
        print(error)
        return null;
    }
};

export const removeASData = async (askey) => {
    try {
        await AsyncStorage.removeItem(askey);
    } catch (error) {
        // Handle error
    }
};



export const saveApiUrl = async (data) => {
    await saveASData(ASKEY_URL, data)
}
export const getApiUrl = async () => {
    const data = await getASData(ASKEY_URL, false)
    return data
}
export const removeApiUrl = async () => {
    await removeASData(ASKEY_URL)
}

export const saveUserProfile = async (data) => {
    await saveASData(ASKEY_PROFILE, data)
}
export const getUserProfile = async () => {
    const data = await getASData(ASKEY_PROFILE, true)
    return data
}
export const removeUserProfile = async () => {
    await removeASData(ASKEY_PROFILE)
}


export const saveAuthToken = async (data) => {
    await saveASData(ASKEY_TOKEN, data)
}
export const getAuthToken = async () => {
    const data = await getASData(ASKEY_TOKEN, false)
    return data
}
export const removeAuthToken = async () => {
    await removeASData(ASKEY_TOKEN)
}


export const saveCSRFToken = async (data) => {
    await saveASData(ASKEY_CSRF_TOKEN, data)
}
export const getCSRFToken = async () => {
    const data = await getASData(ASKEY_CSRF_TOKEN, false)
    return data
}
export const removeCSRFToken = async () => {
    await removeASData(ASKEY_CSRF_TOKEN)
}


export const saveResultData = async (askey, data) => {
    if (askey) {
        await saveASData(`${askey}_data`, data)
    }
}
export const getResultData = async (askey) => {
    if (askey) {
        const data = await getASData(`${askey}_data`, false)
        return data
    }
    return null
}
export const removeResultData = async (askey) => {
    if (askey) {
        await removeASData(`${askey}_data`)
    }
}



export const handleHttpError = async = (code, prepend='', append='') => {
    let message = ''
    if (code === 200) {
        message = 'OK'
    } else if (code === 201) {
        message = 'Created'
    } else if (code === 404) {
        message = 'Bad Request'
    } else if (code === 404) {
        message = 'Not Found'
    } else if (code === 501) {
        message = 'Server Error'
    } else if (code === 502) {
        message = 'Bad Gateway'
    } else {
        message = 'Unkwown'
    }
    throw new Error(`${prepend}${message}${append}`)
}
  