import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { checkImageURL } from '../../../../utils'
import { images } from '../../../../constants'
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 

import styles from './agentActionCard.style'


const AgentActionCard = ({ task, handleNavigate }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleNavigate}
    >
      <TouchableOpacity
        style={styles.logoContainer}
      >
        {(task.required === true)
        ? ((task.done === true)
            ? <AntDesign name="check" size={24} color="black" />
            : <Feather name="square" size={24} color="black" />)
        : <AntDesign name="ellipsis1" size={24} color="black" />}
      </TouchableOpacity>
      <View
        style={styles.textContainer}
      >
        <Text
          style={styles?.jobName}
          numberOfLines={1}
        >{task.title}</Text>
        {(task?.detail) ? <Text style={styles.jobType} >{task?.detail}</Text> : null}
      </View>
    </TouchableOpacity>
  )
}

export default AgentActionCard
