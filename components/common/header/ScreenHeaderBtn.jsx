import React from 'react'
import { Text, TouchableOpacity, Image } from 'react-native'

import styles from './screenheader.style'

const ScreenHeaderBtn = ({ iconUrl, title, dimension, handlePress }) => {
  return (
    <TouchableOpacity
      style={[styles.btnContainer,
      ]}
      onPress={handlePress}
    >
      {iconUrl && <Image
        source={iconUrl}
        resizeMode="cover"
        style={styles.btnImg(dimension)}
      />}
      {title && <Text
                  style={{
                    paddingHorizontal: 5,
                    fontWeight: 'bold',
                   }}
                  >{title}</Text>}
    </TouchableOpacity>
  )
}

export default ScreenHeaderBtn