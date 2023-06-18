import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'

import styles from './agentActions.style'
import { COLORS } from '../../../constants'
import AgentActionCard from '../../common/cards/action/AgentActionCard'
import useFetch from '../../../hook/useFetch'
import { AntDesign } from '@expo/vector-icons';

const AgentActions = ({ user, selectMode }) => {
  const router = useRouter();
  const { data, isLoading, isError } = useFetch(
    'nav', { query: 'React Developer', page: 1, num_pages: 1 }
  )

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>
            <AntDesign name="ellipsis1" size={24} color="black" />
          </Text>
        </TouchableOpacity>
        <View>
          <Text style={{
            ...styles.headerTitle,
            fontWeight: 'bold'
          }}>{user.zone.station_code} {user.zone.station_title}</Text>
          <Text style={{
          }}>{user.zone.constituency_title} Constituency</Text>
          <Text style={{
          }}>{user.zone.region_title} Region</Text>
        </View>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : isError ? (
          <Text>Something went wrong</Text>
        ) : (
          data?.map((task) => (
            <AgentActionCard 
              task={task}
              key={`action-${task?.id}`}
              handleNavigate={() => selectMode(`${task?.path}`)}
            />
          ))
        )}
      </View>

    </View>
  )
}

export default AgentActions
