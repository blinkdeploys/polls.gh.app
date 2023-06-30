import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import { useRouter } from 'expo-router'
import { COLORS, SIZES } from '../../../constants'
import ResultSheetCard from '../../common/cards/action/ResultSheetCard'
import AgentActionCard from '../../common/cards/action/AgentActionCard'
import AppHeader from '../../common/header/AppHeader'
import usePost from '../../../hook/usePost'
import useFetchProtected from '../../../hook/useFetchProtected'
import ModalBox from './ModalBox'
import { Octicons } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

import styles from './agentActions.style'


const ResultSheet = ({ user, title, mode, goHome, selectMode }) => {
  const router = useRouter();
  const scrollViewRef = useRef(null);
  const { fetchData, isLoading, isError } = useFetchProtected()
  const [modalCandidate, setModalCandidate] = useState({});
  const [modalCandidateId, setModalCandidateId] = useState(-1);
  const [data, setData] = useState([]);
  const [resultSheet, setResultSheet] = useState(null)
  const [tmpValue, setTmpValue] = useState(0)
  const [showModalInvalidVotes, setShowModalInvalidVotes] = useState(false)
  const [showModalCandidate, setShowModalCandidate] = useState(false)
  const post = usePost()

  const hasResultSheet = () => {
    const sheet = `${resultSheet?.result_sheet}`
    if (sheet) {
      if (sheet?.length > 0) {
        return true
      }
    }
    return false
  }

  useEffect(() => {
    const init = async () => {
      await fetchData(mode, user?.zone?.pk)
      let asyncData = await AsyncStorage.getItem(`${mode}_data`)
      try {
        asyncData = await JSON.parse(asyncData)
        setResultSheet(asyncData?.result_sheet)
        setData(asyncData?.sheet)
        // sumVotes()
      } catch (e) {
      }
    }
    init()
  }, [])


  const sumVotes = () => {
    let total = 0
    data.map(m => total += Number(m?.votes || 0))
    setResultSheet({
      ...resultSheet,
      total_votes: total || 0
    })
  }

  const handleSubmit = async () => {
    const result = await post.postData(mode, user?.zone?.pk, data, resultSheet)
    // scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
  }

  const closeOverlay = () => {
    setShowModalCandidate(false);
    setShowModalInvalidVotes(false);
  }

  const openOverlay = (c=null) => {
    if (c === null || c == undefined) {
      setShowModalCandidate(false);
      return
    }
    setModalCandidateId(c);
    setModalCandidate({
      ...data[c],
      votes: data[c].votes || 0,
    });
    setShowModalCandidate(true);
  }

  const okOverlay = async () => {
    data[modalCandidateId] = modalCandidate
    await AsyncStorage.setItem(`${mode}_data`, JSON.stringify({
      'result_sheet': resultSheet,
      'sheet': data,
    }))
    sumVotes()
    closeOverlay();
  }


  return (
    <View style={inStyles.container}>

      <ScrollView
        ref={scrollViewRef}
        style={inStyles.content}
      >

        <AppHeader user={user} goHome={goHome} title={title} />

        {post.message && <View
          style={{
            backgroundColor: (post.isError) ? '#ECD6D3' : '#D9F6AF',
            paddingHorizontal: 20,
            paddingVertical: 12,
            borderRadius: 5,
            marginTop: 25,
          }}
        >
          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              paddingHorizontal: 10,
              paddingBottom: 3,
            }}
          >{(post.isError) ? 'Error' : 'Success'}</Text>
          <Text
            style={{
              fontSize: 15,
              paddingHorizontal: 10,
              paddingVertical: 5,
              lineHeight: 22,
            }}
          >{post?.message}</Text>
        </View>}

        {!isLoading && resultSheet && <View style={styles.cardsContainer}>
          <AgentActionCard 
            task={{
              title: "EC Summary Sheet",
              detail: (hasResultSheet()) ? `Preview EC Summary Sheet for ${title}` : `Upload EC Summary Sheet for ${title}`,
              path: mode,
            }}
            key={`action-upload-ec-summary-sheet`}
            handleNavigate={() => selectMode(`${mode}_file`)}
            icon={<Octicons name="file-zip" size={24} color="black" />}
            />
        </View>}

        <View style={styles.cardsContainer}>
          {!isLoading && <AgentActionCard
            task={{
              title: "Invalid Votes",
              detail: `Enter total invalid votes`,
              path: mode,
            }}
            theme={{backgroundColor: '#ECD6D3'}}
            key={`action-total-invalid-votes`}
            handleNavigate={() => {
              setTmpValue(resultSheet?.total_invalid_votes || 0)
              setShowModalInvalidVotes(true)
            }}
            icon={<Text style={{ fontSize: SIZES.medium, fontWeight: 'bold', }}>{resultSheet?.total_invalid_votes || 0}</Text>}
            />}
          {!isLoading && <AgentActionCard 
            task={{
              title: "Total Votes",
              detail: `Cumulative Total Votes`,
              path: mode,
            }}
            key={`action-total-votes`}
            theme={{backgroundColor: '#D9F6AF'}}
            icon={<Text style={{ fontSize: SIZES.medium, fontWeight: 'bold', }}>{resultSheet?.total_votes || 0}</Text>}
            />}
        </View>

        <Spinner visible={post.isLoading} 
                  textContent={'Saving...'}
                  textStyle={{ color: '#FFF' }} />

        <View style={styles.cardsContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" colors={COLORS.primary} />
          ) : isError ? (
            <Text>Something went wrong</Text>
          ) : (
            data?.map((candidate, c) => (
              <ResultSheetCard 
              row={candidate}
              key={`action-${candidate?.pk}-${c}`}
              handleNavigate={() => {
                openOverlay(c)
              }}
              />
            ))
          )}
        </View>

        {post.message && <View
          style={{
            backgroundColor: (post.isError) ? '#ECD6D3' : '#D9F6AF',
            paddingHorizontal: 20,
            paddingVertical: 12,
            borderRadius: 5,
            marginTop: 25,
          }}
        >
          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              paddingHorizontal: 10,
              paddingBottom: 3,
            }}
          >{(post.isError) ? 'Error' : 'Success'}</Text>
          <Text
            style={{
              fontSize: 15,
              paddingHorizontal: 10,
              paddingVertical: 5,
              lineHeight: 22,
            }}
          >{post?.message}</Text>
        </View>}

        <View
          style={inStyles.footer}
        >
          {!isLoading && <TouchableOpacity
            onPress={handleSubmit}
            style={{
              backgroundColor: '#000000',
              padding: 15,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
            }}
          >
            <Text style={{
              ...styles.headerBtn,
              color: COLORS.white,
              borderRadius: SIZES.large,
              fontWeight: 'bold',
              fontSize: 20,
            }}>Save Results</Text>
          </TouchableOpacity>}
        </View>

      </ScrollView>

      {showModalInvalidVotes && <ModalBox
        title={'Invalid Vote Count'}
        detail={'Enter total number Invalid Votes for this station'}
        value={`${tmpValue}`}
        handleCancel={closeOverlay}
        handleOk={() => {
          if (tmpValue) {
            setResultSheet({
              ...resultSheet,
              total_invalid_votes: tmpValue,
            })
            // setTmpValue(null)
          }
          closeOverlay()
        }}
        handleChange={(text) => {
          setTmpValue(text)
        }}
      />}

      {showModalCandidate && <ModalBox
        title={'Poll Result'}
        detail={`Enter the ${modalCandidate?.party__code} Candidate's vote count`}
        value={`${modalCandidate?.votes}`}
        handleOk={okOverlay}
        handleCancel={closeOverlay}
        handleChange={(text) => {
          setModalCandidate({
            ...modalCandidate,
            votes: text,
          })
        }}
      />}

    </View>
  )
}

const inStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    position:'relative',
  },
  content: {
    flex: 2,
  },
  footer: {
    flex: 3,
    marginVertical: 20,
  }
})

export default ResultSheet
