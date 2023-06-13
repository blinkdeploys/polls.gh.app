import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';

import styles from './agentActions.style'
import { AntDesign } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../../constants'

const ECSummary = ({ title, goHome }) => {
  const [filePath, setFilePath] = useState('')
  const pickFile = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync({
        type: '*/*', // Allow all file types, you can specify specific types here (e.g., 'application/pdf', 'image/*')
      });

      if (file.type === 'success') {
        const formData = new FormData();
        setFilePath(file.uri)
        formData.append('file', {
          uri: file.uri,
          name: file.name,
          type: file.type,
        });

        const response = await fetch('https://example.com/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          Alert.alert('Success', 'File uploaded successfully');
        } else {
          Alert.alert('Error', 'Failed to upload file');
        }
      }
    } catch (error) {
      console.log('Error while picking the file:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.header,
          width: '100%',
        }}
      >
        <TouchableOpacity
          onPress={goHome}
          style={{
            backgroundColor: COLORS.white,
            padding: 8,
            borderRadius: 10,
          }}
        >
          <Text style={{
            ...styles.headerBtn,
            color: '#000000',
            fontWeight: 'bold',
          }}>Back</Text>
        </TouchableOpacity>
        <View>
            <Text style={styles.headerTitle}>{title}</Text>
            <Text style={styles.headerMedium}>A090783</Text>
            <Text style={styles.headerMedium}>Action Church Aiyinase</Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#000000',
            padding: 8,
            borderRadius: 10,
          }}
        >
          {/*<Text style={{
            ...styles.headerBtn,
            color: COLORS.white,
            fontWeight: 'bold',
          }}>Save</Text>*/}
        </TouchableOpacity>
      </View>

      <View
        style={{
          padding: 10,
          margin: 5,
      }}
      >
        <Text
          style={{
            fontSize: 18,
            marginVertical: 10,
          }}
        >Upload a copy of the EC Summary Sheet.</Text>
        {/*<Text
        >A copy of the EC Summary Sheet is required to be submitted as proof of the polling results.</Text>*/}
      </View>

      <View
        style={{
          ...styles.header,
          width: '100%',
        }}
      >
        <TouchableOpacity
          onPress={goHome}
          style={{
            backgroundColor: COLORS.white,
            padding: 8,
            borderRadius: 10,
          }}
        >
          <AntDesign name="ellipsis1" size={24} color="black" />
        </TouchableOpacity>
        <View>
          {(filePath)
            ? <Text style={{fontSize: 18, marginVertical: 10,}}>Uploading file...</Text>
            : <></>
          }
        </View>
      </View>
        

      <TouchableOpacity
          onPress={pickFile}
          style={{
            backgroundColor: '#000000',
            padding: 10,
            margin: 10,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
        <Text
          style={{
            ...styles.headerBtn,
            color: COLORS.white,
            fontWeight: 'bold',
            flex: 1,
            fontSize: 20,
          }}
        >Upload from Camera</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={pickFile}
        style={{
          backgroundColor: '#000000',
          padding: 10,
          margin: 10,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
      <Text
        style={{
          ...styles.headerBtn,
          color: COLORS.white,
          fontWeight: 'bold',
          flex: 1,
          fontSize: 20,
        }}
      >Upload from Phone</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
          onPress={goHome}
          style={{
            backgroundColor: COLORS.white,
            padding: 10,
            marginHorizontal: 10,
            marginVertical: 20,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
        <Text
          style={{
            ...styles.headerBtn,
            color: '#000000',
            fontWeight: 'bold',
            flex: 1,
            fontSize: 20,
          }}
        >Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ECSummary;
