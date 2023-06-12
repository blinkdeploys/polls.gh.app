import React from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'

import styles from './agentActions.style'
import { COLORS } from '../../../constants'
import AgentActionCard from '../../common/cards/action/AgentActionCard'
import useFetch from '../../../hook/useFetch'

const AgentActions = () => {
  const router = useRouter();
  const { data, isLoading, isError } = useFetch(
    'nav', { query: 'React Developer', page: 1, num_pages: 1 }
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Agent Actions</Text>
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
             key={`action-${job?.job_id}`}
             handleNavigate={() => router.push(`/${job?.path}`)}
            />
          ))
        )}
      </View>

    </View>
  )
}

export default AgentActions
