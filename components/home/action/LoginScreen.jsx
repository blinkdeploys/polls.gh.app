import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import useLogin from '../../../hook/useLogin';
import useLogout from '../../../hook/useLogout';
import useToekn from '../../../hook/useToken';
import styles from './agentActions.style'
import { COLORS, SIZES } from '../../../constants'

const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error, login } = useLogin();
  const { getToken } = useToekn();

  const setAsyncToken = async (token) => {
    if (token) { await AsyncStorage.setItem('token', token); }
  }

  // transfer to helper
  const tokenIsValid = (token) => {
    return (!(token === null
            || token === undefined
            || token === false
            || token === ''))
  }

  const handleLogin = async () => {
    // Retrieving the token from async storage
    let token = await AsyncStorage.getItem('token');

    // Retrieving the token from api
    if (!tokenIsValid(token)) {
        token = await getToken()
    }

    // Retreive from login
    if (!tokenIsValid(token)) {
        token = await login(username, password)
    }

    // change screen states
    if (tokenIsValid(token)) {
        setAsyncToken(token)
        onLogin(token)
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
                value={username || 'eakatue'}
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
                value={password || 'pollsgh.2023.$$'}
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
