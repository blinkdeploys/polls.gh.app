import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { checkImageURL } from '../../../../utils'
import { images } from '../../../../constants'
import { AntDesign } from '@expo/vector-icons';

import styles from './agentActionCard.style'


const ResultSheetCard = ({ row, handleNavigate, theme }) => {
  theme = theme || {}
  return (
    <TouchableOpacity
      style={{...styles.container,
        ...theme
      }}
      onPress={handleNavigate}
    >
      <View
        style={styles.textContainer}
      >
        <Text
          style={styles.jobName}
          numberOfLines={1}
        >{row?.party__code}</Text>
        {(false && row?.party__title) ? <Text style={styles.jobType} >{row?.party__title}</Text> : null}
        {(row?.candidate_name) ? <Text style={styles.jobType} >{row?.candidate_name}</Text> : null}
        {(row?.pk) ? <Text style={styles.jobType} >#{row?.pk}</Text> : null}
      </View>
      <TouchableOpacity
        style={styles.voteContainer}
        onPress={handleNavigate}
      >
        <Text
          style={styles.jobName}
          numberOfLines={1}
        >{(row?.votes > 0 || handleNavigate === null)
          ? row?.votes
          : <AntDesign name="plus" size={24} color="black" />}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default ResultSheetCard