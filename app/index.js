import React, { useState, useEffect } from 'react'
import { View, ScrollView, SafeAreaView, Text, TouchableOpacity } from 'react-native'
import { Stack, useRouter } from 'expo-router'
import { COLORS, SIZES, icons, images } from '../constants'
import {
    ResultSheet, AgentActions, ECSummary, ScreenHeaderBtn, LoginScreen, Welcome
} from '../components'
import {
    getAuthToken, getCSRFToken, getUserProfile,
    saveAuthToken, saveCSRFToken, saveUserProfile,
    removeAuthToken, removeCSRFToken, removeUserProfile,
    isValid,
} from '../utils'
import Spinner from 'react-native-loading-spinner-overlay';
import styles from './index.style'

const Home = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('')
    const [token, setToken] = useState('')
    const [csrfToken, setCsrfToken] = useState('')
    const [userProfile, setUserProfile] = useState('')
    const [mode, setMode] = useState('')
    const [isGuest, setIsGuest] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        fetchAuth()
    }, [])

    useEffect(() => {
    }, [token])

    useEffect(() => {
        // refresh the csrf token if the user is still logged in
        if (typeof csrfToken !== 'string') { setCsrfToken('') }
        if (isValid(csrfToken)) {
            setIsGuest(false)
        } else {
            setIsGuest(true)
            console.log(`No token found!`)
        }
    }, [csrfToken])

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
        setToken('')
        setCsrfToken('')
        setMode('')
        setIsLoading(false)
    }

    const fetchAuth = async () => {
        const user = await getUserProfile()
        const token = await getAuthToken()
        const csrf = await getCSRFToken()
        setUserProfile(user)
        setToken(token)
        setCsrfToken(csrf)
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

            {false && <View>
                <Text>{token}</Text>
                <Text>{csrfToken}</Text>
                <Text>{userProfile?.username} {userProfile?.email}</Text>
            </View>}

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
                            goHome={() => setMode('presidential_sheet')}
                            />
                        : <></>}
                    {(mode == 'parliamentary_sheet_file')
                        ? <ECSummary
                            title="EC Summary Document"
                            goHome={() => setMode('parliamentary_sheet')}
                            />
                        : <></>}
                    {!isValid(mode) && <AgentActions user={userProfile} selectMode={setMode} />}
            </ScrollView>}

        </SafeAreaView>
    );
}

export default Home;
