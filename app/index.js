import React, { useState, useEffect } from 'react'
import { View, ScrollView, SafeAreaView, Text, TouchableOpacity } from 'react-native'
import { Stack, useRouter } from 'expo-router'
import { URL_API, SYNC_TIME, COLORS, SIZES, icons, images } from '../constants'
import {
    ResultSheet, AgentActions, ECSummary, ScreenHeaderBtn, LoginScreen, Welcome
} from '../components'
import {
    getApiUrl,
    getAuthToken, getCSRFToken, getUserProfile,
    removeAuthToken, removeCSRFToken, removeUserProfile,
    removeResultData,
    saveAsyncNetworkStatus,
    getAsyncSyncRegister,
    isValid,
} from '../utils'
import Spinner from 'react-native-loading-spinner-overlay';
import styles from './index.style'

import NetInfo from '@react-native-community/netinfo';
import useFetchProfile from '../hook/useFetchProfile'


const Home = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('')
    const [authToken, setAuthToken] = useState('')
    const [csrfToken, setCsrfToken] = useState('')
    const [userProfile, setUserProfile] = useState('')
    const [mode, setMode] = useState('')
    const [isGuest, setIsGuest] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [apiUrl, setApiUrl] = useState('')
    const [networkStatus, setNetworkStatus] = useState('Offline')
    const [syncRegister, setSyncRegister] = useState({})

    const useProfile = useFetchProfile()

    useEffect(() => {
        const init = async () => {
            fetchApiUrl()
            fetchAuth()
            await checkInternetConnectivity()
            setInterval(async () => {
                await checkInternetConnectivity()
            }, SYNC_TIME)
        }
        init()
    }, [])

    useEffect(() => {
        if (URL_API !== apiUrl) {
            // log out
            // ditchAuth()
        }
     }, [apiUrl])

    useEffect(() => {
        if (isValid(authToken)) {
            setIsGuest(false)
        } else {
            setIsGuest(true)
            // ditchAuth()
            console.log(`No auth token found. Logging out...`)
        }
    }, [authToken])

    useEffect(() => {
        if (mode === 'logout') {
            // ditchAuth()
        }
    }, [mode])


    const checkInternetConnectivity = async () => {
        setNetworkStatus('Syncing...')
        console.log('Syncing...')
        const netInfoState = await NetInfo.fetch();
        const isConnected = (netInfoState.isConnected) ? 'Online' : 'Offline'
        console.log(isConnected)
        await saveAsyncNetworkStatus(isConnected)
        setNetworkStatus(isConnected)

        // sync when online
        if (netInfoState.isConnected) {
            // refresh the user profile
            await useProfile.fetchData()
            const data = await getAsyncSyncRegister()
            setSyncRegister(data)
            // refresh the results (presidential)
            // refresh the results (parliamentary)
        }
        return netInfoState.isConnected
    };

    const checkIC = () => {
        checkInternetConnectivity().then(isConnected => {
            if (isConnected) {
                // Internet connection is available
                setNetworkStatus('Online')
                console.log('Internet is connected');
            } else {
                // No internet connection
                setNetworkStatus('Offline')
                console.log('No internet connection');
            }
        });
    };

    const ditchAuth = async () => {
        setIsLoading(true)
        await removeUserProfile()
        await removeAuthToken()
        await removeCSRFToken()
        setUserProfile(null)
        setAuthToken('')
        setCsrfToken('')
        setMode('')
        setIsLoading(false)
    }

    const fetchApiUrl = async () => {
        const url = await getApiUrl()
        setApiUrl(url)
    }

    const fetchAuth = async () => {
        const user = await getUserProfile()
        const csrf = await getCSRFToken()
        const token = await getAuthToken()
        setUserProfile(user)
        setCsrfToken(csrf)
        setAuthToken(token)
        setMode('')
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
                        : (<ScreenHeaderBtn
                                iconUrl={null}
                                dimension="80%"
                                title={networkStatus}
                                handlePress={() => checkInternetConnectivity()}
                            />),
                    headerTitle: () => (
                        <View>
                            <Text style={styles.logoText}>Polls.GH</Text>
                        </View>
                    )
                }}
                />

            <Spinner visible={isLoading}
                    textContent={'Ending session...'}
                    textStyle={{ color: '#FFF' }} />

            {!isValid(userProfile) && <LoginScreen onLogin={fetchAuth} />}

            {isValid(userProfile) && <ScrollView
                showVerticalScrollIndicator={false}
                style={styles.scrollViewContainer}
                >
                    {(mode === 'presidential_sheet')
                        ? <ResultSheet
                            title="Presidential Results"
                            mode={mode}
                            user={userProfile}
                            goHome={() => setMode('')}
                            selectMode={setMode}
                            />
                        : <></>}
                    {(mode === 'parliamentary_sheet')
                        ? <ResultSheet
                            title="Parliamentary Results"
                            mode={mode}
                            user={userProfile}
                            goHome={() => setMode('')}
                            selectMode={setMode}
                            />
                        : <></>}
                    {(mode == 'presidential_sheet_file')
                        ? <ECSummary
                            title="EC Summary Document"
                            mode="presidential_sheet"
                            user={userProfile}
                            goHome={() => setMode('presidential_sheet')}
                            />
                        : <></>}
                    {(mode == 'parliamentary_sheet_file')
                        ? <ECSummary
                            title="EC Summary Document"
                            mode="parliamentary_sheet"
                            user={userProfile}
                            goHome={() => setMode('parliamentary_sheet')}
                            />
                        : <></>}
                    {!isValid(mode) && <AgentActions
                                            user={userProfile}
                                            selectMode={setMode}
                                            register={syncRegister}
                                            />}
            </ScrollView>}

        </SafeAreaView>
    );
}

export default Home;
