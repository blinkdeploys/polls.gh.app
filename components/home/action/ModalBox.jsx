import React, { useState, useEffect } from 'react'
import { View, Modal, TextInput, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { COLORS, SIZES } from '../../../constants'
import styles from './agentActions.style'


const ModalBox = ({ title, detail, value, handleChange, handleOk, handleCancel, inputPlaceholder }) => {
    const [overlayVisible, setOverlayVisible] = useState(false);

    return (<Modal
            animationType="fade"
            transparent={true}
            visible={true}
            onRequestClose={handleCancel}
        >
        <View style={styles.overlay}>
        <View style={styles.overlayContent}>
            <Text style={{
            ...styles.headerTitle,
            fontSize: SIZES.large,
            fontWeight: "bold",
            marginBottom: 10,
            }}>{title ? title : 'Poll Result'}</Text>

            <Text style={{
            ...styles.overlayText,
            marginBottom: 5,
            fontSize: SIZES.large,
            }}>{detail}</Text>

            <View style={styles.voteInputContainer}>
            <View style={styles.voteInputWrapper}>
                <TextInput
                style={{
                    fontWeight: 'bold',
                    ...styles.voteInput,
                }}
                value={value}
                onChangeText={handleChange}
                placeholder={inputPlaceholder || `enter vote count`}
                keyboardType="numeric"
                />
            </View>
            </View>

            <View
            style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                marginTop: SIZES.large,
                height: 50,
            }}
            >
            <TouchableOpacity
                style={{
                flex: 1,
                paddingVertical: 1,
                margin: 0,
                justifyContent: "center",
                alignItems: 'center',
                }}
                onPress={handleCancel}
            >
                <Text
                style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    width: "auto",
                }}
                >Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                flex: 1,
                paddingVertical: 1,
                margin: 0,
                justifyContent: "center",
                alignItems: 'center',
                }}
                onPress={handleOk}
            >
                <Text
                style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    width: "auto",
                }}
                >Ok</Text>
            </TouchableOpacity>
            </View>
        </View>
        </View>
    </Modal>)
}

export default ModalBox;
