import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import { AntDesign } from '@expo/vector-icons';
import AppHeader from '../../common/header/AppHeader'
import AgentActionCard from '../../common/cards/action/AgentActionCard'
import useFetch from '../../../hook/useFetch'

import { COLORS } from '../../../constants'
import styles from './agentActions.style'

const AgentActions = ({ user, selectMode }) => {
  const router = useRouter();
  const { data, isLoading, isError } = useFetch(
    'nav', { query: 'React Developer', page: 1, num_pages: 1 }
  )

  return (
    <View>
      <AppHeader user={user} goHome={null} title={''} />

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
