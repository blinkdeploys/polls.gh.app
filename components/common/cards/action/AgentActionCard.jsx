import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { getResultData, getResultSheetData, checkImageURL } from '../../../../utils'
import { images } from '../../../../constants'
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 

import styles from './agentActionCard.style'


const AgentActionCard = ({ task, theme, icon, handleNavigate }) => {

  useEffect(() => {
    const init = async () =>  {
      // determine if a task can be marked as completed
      const results = await getResultData(task?.path);
      const resultSheet = await getResultSheetData(task?.path);
      if (results && resultSheet) {
        task.done = (resultSheet && resultSheet?.result_sheet) ? true : false
      }
    }
    init()
  }, [])
 
  return (
    <TouchableOpacity
      style={{ ...styles.container, ...theme }}
      onPress={handleNavigate}
    >
      <TouchableOpacity
        style={[
          styles.logoContainer,
          { width: 'auto', minWidth: 50, paddingHorizontal: 10, },
        ]}
      >
        {(task?.required === true)
        ? ((task?.done === true)
            ? <AntDesign name="check" size={24} color="black" />
            : <Feather name="square" size={24} color="black" />)
        : (icon ? icon : <AntDesign name="ellipsis1" size={24} color="black" />)}
      </TouchableOpacity>
      <View
        style={styles.textContainer}
      >
        <Text
          style={styles?.jobName}
          numberOfLines={1}
        >{task?.title}</Text>
        {(task?.detail) ? <Text style={styles.jobType} >{task?.detail}</Text> : null}
      </View>
    </TouchableOpacity>
  )
}

export default AgentActionCard
