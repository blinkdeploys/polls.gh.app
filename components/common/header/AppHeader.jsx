import { View, Modal, TextInput, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../../constants'
import styles from '../../../components/home/action/agentActions.style'

const AppHeader = ({ user, goHome, title }) => {
    return (<View style={{ ...styles.header, flexDirection: 'row' }}>
        <TouchableOpacity
            style={{
                width: '20%',
                backgroundColor: COLORS.white,
                borderRadius: 10,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {goHome && <Text
                style={{
                    ...styles.headerBtn,
                    color: '#000000',
                    fontWeight: 'bold',
                }}
                onPress={goHome}
            >Back</Text>}
            {!goHome && <AntDesign name="ellipsis1" size={24} color="black" />}
        </TouchableOpacity>
        <View
        style={{
            width: '90%',
            paddingHorizontal: 20,
            paddingBottom: 20,
        }}
        >
        <Text style={{...styles.headerTitle, paddingBottom: 10 }}>{title || user?.full_name }</Text>
        <Text style={styles.headerMedium}>{user.zone.station_code} {user.zone.station_title}</Text>
        <Text style={styles.headerMedium}>{user.zone.constituency_title}, {user.zone.region_title} Region</Text>
        </View>
    </View>)
}
export default AppHeader;
