import React from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'

import styles from './agentActions.style'
import { COLORS } from '../../../constants'
import AgentActionCard from '../../common/cards/action/AgentActionCard'
import useFetch from '../../../hook/useFetch'
import { AntDesign } from '@expo/vector-icons';

const AgentActions = ({ selectMode }) => {
  const router = useRouter();
  const { data, isLoading, isError } = useFetch(
    'nav', { query: 'React Developer', page: 1, num_pages: 1 }
  )

  return (
    <View>
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
          <Text style={styles.headerBtn}>
            <AntDesign name="ellipsis1" size={24} color="black" />
          </Text>
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
