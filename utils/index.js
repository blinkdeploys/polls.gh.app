import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'auth_token';
const CSRF_TOKEN_KEY = 'csrf_token';
const PROFILE = 'user_profile';


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


export const saveAuthToken = async (token) => {
    try {
        await AsyncStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
        // Handle error
    }
};

export const getAuthToken = async () => {
    try {
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        return token;
    } catch (error) {
        // Handle error
        return null;
    }
};

export const removeAuthToken = async () => {
    try {
        await AsyncStorage.removeItem(TOKEN_KEY);
    } catch (error) {
        // Handle error
    }
};

export const saveCSRFToken = async (token) => {
    try {
        await AsyncStorage.setItem(CSRF_TOKEN_KEY, token);
    } catch (error) {
        // Handle error
    }
};

export const getCSRFToken = async () => {
    try {
        const token = await AsyncStorage.getItem(CSRF_TOKEN_KEY);
        return token;
    } catch (error) {
        // Handle error
        return null;
    }
};

export const removeCSRFToken = async () => {
    try {
        await AsyncStorage.removeItem(CSRF_TOKEN_KEY);
    } catch (error) {
        // Handle error
    }
};

export const saveUserProfile = async (data) => {
    try {
        if (typeof data === 'object') {
            data = JSON.stringify(data)
        }
        await AsyncStorage.setItem(PROFILE, data);
    } catch (error) {
        // Handle error
    }
};

export const getUserProfile = async () => {
    try {
        let data = await AsyncStorage.getItem(PROFILE);
        return JSON.parse(data);
    } catch (error) {
        // Handle error
        return null;
    }
};

export const removeUserProfile = async () => {
    try {
        await AsyncStorage.removeItem(PROFILE);
    } catch (error) {
        // Handle error
    }
};


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
  