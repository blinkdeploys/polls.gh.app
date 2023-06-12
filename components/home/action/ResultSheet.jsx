import React, { useState } from 'react'
import { View, Modal, TextInput, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native'

import { useRouter } from 'expo-router'

import styles from './agentActions.style'
import { COLORS, SIZES } from '../../../constants'
import ResultSheetCard from '../../common/cards/action/ResultSheetCard'
import useFetch from '../../../hook/useFetch'

const ResultSheet = ({ title, mode, goHome }) => {
  const router = useRouter();
  const { data, isLoading, isError } = useFetch(
    mode, { query: 'React Developer', page: 1, num_pages: 1 }
  )
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [modalCandidate, setModalCandidate] = useState({});
  const [modalCandidateId, setModalCandidateId] = useState(-1);

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
    <View style={styles.container}>

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
            <Text style={styles.headerMedium}>A090783</Text>
            <Text style={styles.headerMedium}>Action Church Aiyinase</Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#000000',
            padding: 8,
            borderRadius: 10,
          }}
        >
          <Text style={{
            ...styles.headerBtn,
            color: COLORS.white,
            fontWeight: 'bold',
          }}>Save</Text>
        </TouchableOpacity>
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
