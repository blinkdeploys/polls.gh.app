import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList
 } from 'react-native'
import { useRouter } from 'expo-router'

import styles from './welcome.style'
import { icons, SIZES } from '../../../constants'
const jobTypes = ['Full-Time', 'Part-Time', 'Contracts']

const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {
  const router = useRouter()
  const [activeJobType, setActiveJobType] = useState('Full-Time')
  return (
    <View>
      <View style={styles.container}>
        <Text
          style={styles.userName}
        >Hello Blink!</Text>
        <Text
          style={styles.welcomeMessage}
        >Polls.GH</Text>
      </View>
    </View>
  )
}

export default Welcome