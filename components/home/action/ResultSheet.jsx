import React from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'

import styles from './agentActions.style'
import { COLORS } from '../../../constants'
import ResultSheetCard from '../../common/cards/action/ResultSheetCard'
import useFetch from '../../../hook/useFetch'

const ResultSheet = () => {
  const router = useRouter();
  const { data, isLoading, isError } = useFetch(
    'sheet', { query: 'React Developer', page: 1, num_pages: 1 }
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
            <Text style={styles.headerTitle}>Presidential Results</Text>
            <Text style={styles.headerMedium}>A090783 - Action Church Aiyinase</Text>
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
            <ResultSheetCard 
             job={job}
             key={`action-${job?.pk}`}
             handleNavigate={() => router.push(`/job-details/${job?.job_id}`)}
            />
          ))
        )}
      </View>

    </View>
  )
}

export default ResultSheet
