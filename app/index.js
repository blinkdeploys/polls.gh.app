import { useState } from 'react'
import { View, ScrollView, SafeAreaView, Text } from 'react-native'
import { Stack, useRouter } from 'expo-router'
import { COLORS, SIZES, icons, images } from '../constants'
import {
    ResultSheet, AgentActions, ECSummary, ScreenHeaderBtn, Welcome
} from '../components'

const Home = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('')
    const [mode, setMode] = useState('')

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: COLORS.lightWhite }}
        >
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn iconUrl={icons.menu}
                            dimension="60%"
                            handlePress={() => setMode('')} />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn iconUrl={images.profile} dimension="80%" />
                    ),
                    headerTitle: () => (
                        <View>
                            <Text
                                style={{
                                    fontWeight: 'bold', fontSize: 18,
                                    paddingHorizontal: 10,
                                }}
                            >Polls.GH</Text>
                        </View>
                    )
                }}
            />
            <ScrollView showVerticalScrollIndicator={false}>
                <View
                    style={{
                        flex: 1,
                        paddingHorizontal: SIZES.medium
                    }}
                >
                    {/*<Welcome
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleClick={() => {
                            if (searchTerm) {
                                router.push(`/search/${searchTerm}`)
                            }
                        }}
                    />*/}
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
                    {(mode === '')
                        ? <AgentActions selectMode={setMode} />
                        : <></>}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Home;


