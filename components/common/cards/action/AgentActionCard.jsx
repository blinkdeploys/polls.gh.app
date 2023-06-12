import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { checkImageURL } from '../../../../utils'
import { images } from '../../../../constants'
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 

import styles from './agentActionCard.style'


const AgentActionCard = ({ job, handleNavigate }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleNavigate}
    >
      <TouchableOpacity
        style={styles.logoContainer}
      >
        {(job.required === true)
        ? ((job.done === true)
            ? <AntDesign name="check" size={24} color="black" />
            : <Feather name="square" size={24} color="black" />)
        : <AntDesign name="ellipsis1" size={24} color="black" />}
        {/*
        <Image
          source={{ uri: checkImageURL(job?.employer_logo) ? job?.employer_logo : images.defaultLogo }}
          resizeMode="contain"
          style={styles.logoImage}
          />
        */}
      </TouchableOpacity>
      <View
        style={styles.textContainer}
      >
        <Text
          style={styles?.jobName}
          numberOfLines={1}
        >{job.title}</Text>
        {(job?.detail) ? <Text style={styles.jobType} >{job?.detail}</Text> : null}
      </View>
    </TouchableOpacity>
  )
}

export default AgentActionCard
