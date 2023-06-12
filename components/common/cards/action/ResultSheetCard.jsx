import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { checkImageURL } from '../../../../utils'
import { images } from '../../../../constants'

import styles from './agentActionCard.style'


const AgentActionCard = ({ job, handleNavigate }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleNavigate}
    >
      <View
        style={styles.textContainer}
      >
        <Text
          style={styles.jobName}
          numberOfLines={1}
        >{job.party__code}</Text>
        {(job?.party__title) ? <Text style={styles.jobType} >{job?.party__title}</Text> : null}
      </View>
      <TouchableOpacity
        style={styles.voteContainer}
        onPress={handleNavigate}
      >
        <Text
          style={styles.jobName}
          numberOfLines={1}
        >{job.total_votes > 0 ? job.total_votes : '+'}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default AgentActionCard