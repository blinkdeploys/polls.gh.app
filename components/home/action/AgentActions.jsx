import React from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'

import styles from './agentActions.style'
import { COLORS } from '../../../constants'
import AgentActionCard from '../../common/cards/action/AgentActionCard'
import useFetch from '../../../hook/useFetch'

const AgentActions = ({ selectMode }) => {
  const router = useRouter();
  const { data, isLoading, isError } = useFetch(
    'nav', { query: 'React Developer', page: 1, num_pages: 1 }
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={{
            ...styles.headerTitle,
            fontWeight: 'bold'
          }}>ACTION CHURCH AIYINASE</Text>
          <Text style={{
          }}>ELLEMBELE Constituency</Text>
          <Text style={{
          }}>WESTERN Region</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : isError ? (
          <Text>Something went wrong</Text>
        ) : (
          data?.map((job) => (
            <AgentActionCard 
              job={job}
              key={`action-${job?.id}`}
              handleNavigate={() => selectMode(`${job?.path}`)}
              // handleNavigate={() => router.push(`/${job?.path}`)}
            />
          ))
        )}
      </View>

    </View>
  )
}

export default AgentActions