import React, { useState, useEffect } from 'react'
import { View, Modal, TextInput, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';

import { useRouter } from 'expo-router'

import styles from './agentActions.style'
import { COLORS, SIZES } from '../../../constants'
import ResultSheetCard from '../../common/cards/action/ResultSheetCard'
import AgentActionCard from '../../common/cards/action/AgentActionCard'
import useFetch from '../../../hook/useFetch'
import usePost from '../../../hook/usePost'
import useFetchProtected from '../../../hook/useFetchProtected'

const ResultSheet = ({ user, title, mode, goHome, selectMode }) => {
  const router = useRouter();
  const { fetchData, isLoading, isError } = useFetchProtected()
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [modalCandidate, setModalCandidate] = useState({});
  const [modalCandidateId, setModalCandidateId] = useState(-1);
  const [data, setData] = useState([]);
  const post = usePost()

  useEffect(() => {
    const init = async () => {
      const initData = await fetchData(mode, user?.zone?.pk)
      setData(initData)
    }
    init()
  }, [])


  const handleSubmit = () => {
    const result = post.postData(mode, user?.zone?.pk, data)
  }

  const setCandidate = (candidate={}) => {
    setModalCandidate(candidate);
  };

  const closeOverlay = () => {
    setOverlayVisible(false);
  }

  const openOverlay = (c=null) => {
    if (c === null || c == undefined) {
      setOverlayVisible(false);
      return
    }
    setModalCandidateId(c);
    setModalCandidate(data[c]);
    setOverlayVisible(true);
  }

  const okOverlay = () => {
    data[modalCandidateId] = modalCandidate
    setOverlayVisible(false);
  }

  const task = {
    title: "EC Summary Sheet",
    detail: `Upload EC Summary Sheet for ${title}`,
    path: mode,
  }

  const toggleOverlay = (c=null) => {
    if (c === null || c == undefined) {
      setOverlayVisible(false);
      return
    }
    if (data === null || data == undefined) return
    if (data[c]) {
      setModalCandidate(data[c]);
      setOverlayVisible(!overlayVisible);
    }
  };


  return (
    <View>

      <View
        style={styles.header}
      >
        <TouchableOpacity
          onPress={goHome}
          style={{
            backgroundColor: COLORS.white,
            padding: 8,
            borderRadius: 10,
          }}
        >
          <Text style={{
            ...styles.headerBtn,
            color: '#000000',
            fontWeight: 'bold',
          }}>Back</Text>
        </TouchableOpacity>
        <View>
            <Text style={styles.headerTitle}>{title}</Text>
            <Text style={styles.headerMedium}>{user.zone.station_code} {user.zone.station_title}</Text>
            <Text style={styles.headerMedium}>{user.zone.constituency_title} Constituency</Text>
            <Text style={styles.headerMedium}>{user.zone.region_title} Region</Text>
        </View>
      </View>

      {post.message &&
      <View
        style={{
          backgroundColor: COLORS.gray,
          paddingHorizontal: 20,
          paddingVertical: 15,
          borderRadius: 5,
          marginTop: 25,
        }}
      >
        <Text
          style={{
            color: COLORS.white,
            fontSize: 17,
            fontWeight: 'bold',
            paddingHorizontal: 10,
            paddingBottom: 5,
          }}
        >{(post.isError) ? 'Success' : 'Error'}</Text>
        <Text
          style={{
            color: COLORS.white,
            fontSize: 15,
            paddingHorizontal: 10,
            paddingTop: 5,
          }}
        >{post.message}</Text>
      </View>}

      <View
        style={{
          marginVertical: 15,
        }}
      >
        <TouchableOpacity
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
            fontWeight: 'bold',
          }}>Save Results</Text>
        </TouchableOpacity>
      </View>

      <Spinner visible={post.isLoading} 
                textContent={'Saving...'}
                textStyle={{ color: '#FFF' }} />

      <View style={styles.cardsContainer}>
        <AgentActionCard 
          task={task}
          key={`action-upload-${task?.id}`}
          handleNavigate={() => selectMode(`${mode}_file`)}
          />
      </View>


      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : isError ? (
          <Text>Something went wrong</Text>
        ) : (
          data?.map((candidate, c) => (
            <ResultSheetCard 
             job={candidate}
             key={`action-${candidate?.pk}`}
             /*handleNavigate={() => router.push(`/job-details/${candidate?.job_id}`)}*/
             handleNavigate={() => openOverlay(c)}
            />
          ))
        )}
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={overlayVisible}
        onRequestClose={closeOverlay}
      >
        <View style={styles.overlay}>
          <View style={styles.overlayContent}>
            <Text style={{
              ...styles.headerTitle,
              fontSize: SIZES.large,
              fontWeight: "bold",
              marginBottom: 10,
            }}>Poll Result</Text>

            <Text style={{
              ...styles.overlayText,
              marginBottom: 5,
              fontSize: SIZES.large,
            }}>Enter the {modalCandidate?.party__code} Candidate's vote count</Text>

            <View style={styles.voteInputContainer}>
              <View style={styles.voteInputWrapper}>
                <TextInput
                  style={{
                    fontWeight: 'bold',
                    ...styles.voteInput,
                  }}
                  value={`${modalCandidate?.total_votes}`}
                  onChangeText={(text) => setModalCandidate({
                    ...modalCandidate,
                    total_votes: text,
                  })}
                  placeholder="enter vote count"
                  keyboardType="numeric"
                  />
              </View>
            </View>

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                marginTop: SIZES.large,
                height: 50,
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  paddingVertical: 1,
                  margin: 0,
                  justifyContent: "center",
                  alignItems: 'center',
                }}
                onPress={closeOverlay}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    width: "auto",
                  }}
                >Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  paddingVertical: 1,
                  margin: 0,
                  justifyContent: "center",
                  alignItems: 'center',
                }}
                onPress={okOverlay}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    width: "auto",
                  }}
                >Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  )
}


export default ResultSheet
