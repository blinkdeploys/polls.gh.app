import React from 'react'
import { View, Text, Image } from 'react-native'

import styles from './company.style'
import { icons, images } from  '../../../constants'
import { checkImageURL } from  '../../../utils'


const Company = ({ companLogo, jobTitle, companyName, location }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image
          source={{ uri: checkImageURL(companLogo) ? companLogo : images.defaultLogo }}
          style={styles.logoImage}
          />
        <Text>Company</Text>
      </View>

      <View style={styles.jobTitleBox}>
        <Text style={styles.jobTitle}>{jobTitle}</Text>
      </View>

      <View style={styles.companyInfoBox}>
        <Text style={styles.companyName}>{companyName} / </Text>
        <View style={styles.locationBox}>
          <Image
            source={icons.location}
            style={styles.locationImage}
            resizeMode="contain"
            />
            <Text style={styles.locationName}>{location}</Text>
        </View>
      </View>
    </View>
  )
}

export default Company