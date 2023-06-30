import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import useLogin from '../../../hook/useLogin';
import useLogout from '../../../hook/useLogout';
import styles from './agentActions.style'
import { URL_API, COLORS, SIZES } from '../../../constants'
import {
    getUserProfile,
    isValid
} from '../../../utils'
import { Ionicons } from '@expo/vector-icons';


const LoginScreen = ({ onLogin, onFailure }) => {
  const [username, setUsername] = useState('eakatue');
  const [password, setPassword] = useState('pollsgh.2023.$$');
  const [loadingMessage, setLoadingMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { loading, error, login } = useLogin();
  const [passwordVisible, setPasswordVisible] = useState(false)
 
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async () => {
    // Retrieving the user profile from async storage
    let data = await getUserProfile()

    // Retreive from login
    if (!isValid(data)) {
        setLoadingMessage('Logging in...')
        setIsLoading(true)
        await login(username, password)
        data = await getUserProfile()
        setLoadingMessage('')
        setIsLoading(false)
    }

    // change screen states
    if (isValid(data)) {
        onLogin()
    } else {
        console.log('Error logging in. Please try again.')
    }
};

  return (
    <View
        style={{
            flex: 1,
            padding: 20,
        }}
    >
        <Text
            style={{
                fontSize: 30,
                fontWeight: 'bold',
                padding: 8,
            }}
        >Log In</Text>
        <View
            style={{
                marginVertical: 25,
            }}
        >
            
            <Spinner visible={isLoading} 
                textContent={loadingMessage}
                textStyle={{ color: '#FFF' }} />

            {error && <Text
                style={{
                    padding: 8,
                    fontSize: SIZES.large,
                }}
                >Error: {error}</Text>}
            <TextInput
                style={{
                    marginVertical: 7,
                    paddingVertical: 12,
                    paddingHorizontal: 15,
                    borderRadius: SIZES.medium,
                    fontSize: SIZES.large,
                    backgroundColor: COLORS.white,
                }}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <View style={{ flexDirection: 'row', }}>
                <TextInput
                    style={{
                        width: '85%',
                        marginVertical: 7,
                        paddingVertical: 12,
                        paddingHorizontal: 15,
                        borderRadius: SIZES.medium,
                        fontSize: SIZES.large,
                        backgroundColor: COLORS.white,
                    }}
                    placeholder="Password"
                    secureTextEntry={!passwordVisible}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}
                    style={{ width: '20%', paddingHorizontal: 15, paddingVertical: 25, alignContent: 'center', }}
                >
                    <Ionicons
                        name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
                        size={24}
                        color="black"
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity>
                <Text
                    style={{
                        padding: 8,
                        fontSize: SIZES.large,
                    }}
                >forgot password?</Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity
            onPress={handleLogin}
            style={{
                backgroundColor: '#000000',
                padding: 10,
                margin: 10,
                borderRadius: SIZES.large,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Text
                style={{
                    ...styles.headerBtn,
                    color: COLORS.white,
                    fontWeight: 'bold',
                    fontSize: 20,
                }}
            >Log In</Text>
        </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
