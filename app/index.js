import React, { useState, useEffect } from 'react'
import { View, ScrollView, SafeAreaView, Text, TouchableOpacity } from 'react-native'
import { Stack, useRouter } from 'expo-router'
import { URL_API, COLORS, SIZES, icons, images } from '../constants'
import {
    ResultSheet, AgentActions, ECSummary, ScreenHeaderBtn, LoginScreen, Welcome
} from '../components'
import {
    getApiUrl,
    getAuthToken, getCSRFToken, getUserProfile,
    removeAuthToken, removeCSRFToken, removeUserProfile,
    removeResultData,
    isValid,
} from '../utils'
import Spinner from 'react-native-loading-spinner-overlay';
import styles from './index.style'

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

    useEffect(() => {
        const fetchApiUrl = async () => {
            const url = await getApiUrl()
            setApiUrl(url)
        }
        fetchApiUrl()
        fetchAuth()
    }, [])

    useEffect(() => {
        if (URL_API !== apiUrl) {
            // log out
            ditchAuth()
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
            ditchAuth()
        }
    }, [mode])


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
                            : (<ScreenHeaderBtn iconUrl={images.profile} dimension="80%" />),
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
                    {!isValid(mode) && <AgentActions user={userProfile} selectMode={setMode} />}
            </ScrollView>}

        </SafeAreaView>
    );
}

export default Home;
