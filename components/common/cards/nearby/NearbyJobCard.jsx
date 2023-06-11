import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { checkImageURL } from '../../../../utils'
import { images } from '../../../../constants'

import styles from './nearbyjobcard.style'


const NearbyJobCard = ({ job, handleNavigate }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleNavigate}
    >
      <TouchableOpacity
        style={styles.logoContainer}
      >
        <Image
          source={{ uri: checkImageURL(job.employer_logo) ? job.employer_logo : images.defaultLogo }}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <View
        style={styles.textContainer}
      >
        <Text
          style={styles.jobName}
          numberOfLines={1}
        >{job.job_title}</Text>
        {(job?.station) ? <Text style={styles.jobType} >{job?.station}</Text> : null}
        {(job?.constituency) ? <Text style={styles.jobType} >{job?.constituency}</Text> : null}
        {(job?.region) ? <Text style={styles.jobType} >{job?.region}</Text> : null}
        {(job?.job_employment_type === null) ? null : <Text style={styles.jobType} >{job?.job_employment_type}</Text>}
        
      </View>
    </TouchableOpacity>
  )
}

export default NearbyJobCard