import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import useLogin from '../../../hook/useLogin';
import useLogout from '../../../hook/useLogout';
import styles from './agentActions.style'
import { COLORS, SIZES } from '../../../constants'
import {
    getAuthToken, getCSRFToken, getUserProfile,
    saveAuthToken, saveCSRFToken, saveUserProfile,
    isValid
} from '../../../utils'

const LoginScreen = ({ onLogin, onFailure }) => {
  const [username, setUsername] = useState('eakatue');
  const [password, setPassword] = useState('pollsgh.2023.$$');
  const { loading, error, login } = useLogin();
  
  const handleLogin = async () => {
    // Retrieving the user profile from async storage
    let data = await getUserProfile()

    // Retreive from login
    if (!isValid(data)) {
        await login(username, password)
        data = await getUserProfile()
    }

    // change screen states
    if (isValid(data)) {
        await saveUserProfile(data || null)
        await saveAuthToken(data.token || '')
        await saveCSRFToken(data.csrfToken || '')
        onLogin()
    }

    if (!isValid(data)) {
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
                fontSize: SIZES.large,
                padding: 8,
            }}
        >Login</Text>
        <View
            style={{
                marginVertical: 25,
            }}
        >
            {error && <Text
                style={{
                    padding: 8,
                    fontSize: SIZES.large,
                }}
                >Error: {error}</Text>}
            <TextInput
                style={{
                    fontSize: SIZES.large,
                    padding: 12,
                    marginVertical: 7,
                }}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={{
                    fontSize: SIZES.large,
                    padding: 12,
                    marginVertical: 7,
                }}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
        </View>
        <TouchableOpacity
            onPress={handleLogin}
            style={{
                backgroundColor: '#000000',
                padding: 10,
                margin: 10,
                borderRadius: 10,
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
            >Login</Text>
        </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
