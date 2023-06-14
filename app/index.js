import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ScrollView, SafeAreaView, Text, TouchableOpacity } from 'react-native'
import { Stack, useRouter } from 'expo-router'
import { COLORS, SIZES, icons, images } from '../constants'
import {
    ResultSheet, AgentActions, ECSummary, ScreenHeaderBtn, LoginScreen, Welcome
} from '../components'
import styles from './index.style'

const Home = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('')
    const [token, setToken] = useState('')
    const [mode, setMode] = useState('')
    const [isGuest, setIsGuest] = useState(true)

    const fetchAsyncToken = async () => {
        return await AsyncStorage.getItem('token')
    }

    const setAsyncToken = async (token) => {
        if (typeof token === 'string') {
            await AsyncStorage.setItem('token', token)
        }
    }

    useEffect(() => {
        let token = fetchAsyncToken()
        if (token instanceof Promise) {
            token = token.then((data) => {
                setToken(data)
                setAsyncToken(data)
            }).catch((err) => console.log(err))
        } else if (typeof token == 'string') {
            setToken(token)
        } else {
            console.log('error fetching token... loggin out')
        }
    }, [])

    useEffect(() => {
        console.log(mode)
        if (mode === 'logout') {
            console.log('logging out....')
            setToken('')
            setAsyncToken('')
        }
    }, [mode])

    useEffect(() => {
        if (typeof token !== 'string') { setToken('') }
        if (isValid(token)) {
            setIsGuest(false)
            console.log(`Token established! ${token}`)
        } else {
            setIsGuest(true)
            console.log(`Not token found!`)
        }
        console.log("Is Guest: ", isGuest)
    }, [token])

    const handleLogin = (token) => {
        setToken(token)
        setMode('')
    }

    const handleLogout = () => {
        setToken('')
        setAsyncToken('')
        setMode('')
    }

    const isValid = (item) => {
        return !(['', undefined, null, false].includes(item))
    }

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen
                options={{
                    headerStyle: styles.headerStyle,
                    headerShadowVisible: false,
                    headerLeft: () => isGuest
                            ? <></>
                            : (<ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" handlePress={() => setMode('')} />),
                    headerRight: () => isGuest
                            ? <></>
                            : (<ScreenHeaderBtn iconUrl={images.profile} dimension="80%" />),
                    headerTitle: () => (
                        <View>
                            <Text style={styles.logoText}>Polls.GH</Text>
                        </View>
                    )
                }}
                />
            {!isValid(token) && <LoginScreen onLogin={handleLogin} />}

            {isValid(token) && <ScrollView
                showVerticalScrollIndicator={false}
                style={styles.scrollViewContainer}
                >
                    {(mode === 'presidential_sheet')
                        ? <ResultSheet
                            title="Presidential Results"
                            mode={mode}
                            goHome={() => setMode('')}
                            selectMode={setMode}
                            />
                        : <></>}
                    {(mode === 'parliamentary_sheet')
                        ? <ResultSheet
                            title="Parliamentary Results"
                            mode={mode}
                            goHome={() => setMode('')}
                            selectMode={setMode}
                            />
                        : <></>}
                    {(mode == 'presidential_sheet_file')
                        ? <ECSummary
                            title="EC Summary Document"
                            goHome={() => setMode('presidential_sheet')}
                            />
                        : <></>}
                    {(mode == 'parliamentary_sheet_file')
                        ? <ECSummary
                            title="EC Summary Document"
                            goHome={() => setMode('parliamentary_sheet')}
                            />
                        : <></>}
                    {!isValid(mode) && <AgentActions selectMode={setMode} />}
            </ScrollView>}
        </SafeAreaView>
    );
}

export default Home;
