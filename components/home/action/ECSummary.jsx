import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Alert, Image } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios'
import CameraScreen from './CameraScreen.jsx'
import styles from './agentActions.style'
import { AntDesign } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../../constants'
import { URL_BASE, URL_API } from '../../../hook/constants'; 
import { getAuthToken, getCSRFToken } from '../../../utils'
import useCsrfToken from '../../../hook/useCsrfToken'
import mime from "mime";
import * as ImagePicker from 'expo-image-picker'
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ECSummary = ({ title, mode, user, goHome }) => {
  const [filePath, setFilePath] = useState(false)
  const [fileObject, setFileObject] = useState(null)
  const [showCamera, setShowCamera] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatusMessage, setUploadStatusMessage] = useState(false)
  const [uploadStatusIcon, setUploadStatusIcon] = useState('ellipsis1')
  const [selectedImage, setSelectedImage] = useState(null)
  const [savedImage, setSavedImage] = useState(null)
  const [showResultSheet, setShowResultSheet] = useState(false)
  const { getCsrfToken } = useCsrfToken()


  const savedFileKey = `${mode}_result_sheet`
  let modeTitle = mode.replace('_sheet', '')
  modeTitle = modeTitle[0].toUpperCase() + modeTitle.slice(1,)

  useEffect(() => {
    const initSavedImage = async () => {
      const file = await AsyncStorage.getItem(savedFileKey)
      setSavedImage(file)
    }
    initSavedImage()
  }, [])

  const handleUnsetFile = async () => {
    setFilePath(false)
    setFileObject(null)
  }

  const makeFileObject = (file) => {
    const trimmedURI = (Platform.OS === "android") ? file.uri : file.uri.replace("file://", "");
    const fileName = trimmedURI.split("/").pop();
    const mimeType = mime.getType(trimmedURI)
    return {
      name: fileName,
      uri: trimmedURI,
      type: mimeType,
      height: file.height,
      width: file.width,
    }
  }

  const handleSetFile = async () => {
    const allFiles = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      base64: true,
      aspect: [4, 3]
    })
    if (!allFiles.canceled) {
      const file = allFiles.assets[0]
      setSelectedImage(file.uri);
      const trimmedURI = (Platform.OS === "android") ? file.uri : file.uri.replace("file://", "");
      const fileName = trimmedURI.split("/").pop();
      const mimeType = mime.getType(trimmedURI)
      const selectedFile = {
        name: fileName,
        uri: trimmedURI,
        type: mimeType,
        height: file.height,
        width: file.width,
      }
      setFilePath(selectedFile?.name)
      setFileObject(selectedFile)
    }
  }

  const handleFileUpload = async () => {
    let alertStatus = ''
    let alertMessage = ''
    setIsUploading(true)
    setUploadStatusMessage(`Uploading ${modeTitle} EC Summary Sheet...`)

    const token = getAuthToken()
    const csrfToken = getCsrfToken()

    try {
      const url = `${URL_API}/upload/`;
      const formData = new FormData();
      formData.append('path', fileObject);
      formData.append('title', filePath);
      formData.append('purpose', mode)
      const response = await axios.post(url, formData, {
        headers: {
          Accept: '*/*',
          'Content-Type': 'multipart/form-data',
          'Referer': `${URL_API}/`,
          'X-CSRFToken': csrfToken,
          'Authorization': `Token ${token}`,
        },
      });
      if (response.data.ok) {
        alertStatus = 'Success'
        alertMessage = `${modeTitle} Result Sheet uploaded successfully`
        const savedFilePath = `${URL_BASE}${response.data.file_path}`
        console.log(savedFileKey)
        await AsyncStorage.setItem(savedFileKey, savedFilePath)
        setSavedImage(savedFilePath)
        setUploadStatusMessage(alertMessage)
        setUploadStatusIcon('checksquareo')
        if (showCamera) { setShowCamera(false) }
      } else {
        alertStatus = 'Error'
        alertMessage = `Failed to upload ${modeTitle} Result Sheet`
        setUploadStatusMessage(alertMessage)
        setUploadStatusIcon('exclamationcircleo')
      }
      Alert.alert(alertStatus, alertMessage);
    } catch (error) {
      alertMessage = 'Failed to upload file'
      setUploadStatusMessage(alertMessage)
      setUploadStatusIcon('exclamationcircleo')
      console.log(alertMessage);
      console.error(error);
    }
    setIsUploading(false)
    setFilePath(false)
    setFileObject(null)
  };

  return (
    <View style={{ flex: 1 }}>

      <Spinner visible={isUploading} 
              textContent={uploadStatusMessage}
              textStyle={{ color: '#FFF' }} />

      {/* Header */}
      <View
        style={{
          ...styles.header,
          flexDirection: 'row',
        }}
      >
        <TouchableOpacity
          onPress={goHome}
          style={{
            backgroundColor: COLORS.white,
            padding: 8,
            borderRadius: 10,
            width: '25%',
          }}
        >
          <Text style={{
            ...styles.headerBtn,
            color: '#000000',
            fontWeight: 'bold',
          }}>Back</Text>
        </TouchableOpacity>
        <View
          style={{ width: '75%', }}
        >
            <Text style={styles.headerTitle}>{title}</Text>
            <Text style={styles.headerMedium}>A090783</Text>
            <Text style={styles.headerMedium}>Action Church Aiyinase</Text>
        </View>
      </View>

      {/* Instructions */}
      {!(showCamera || filePath)
        && <View
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
          >Upload a copy of the {modeTitle} EC Summary Sheet.</Text>
          </View>}

      {/* Photo Camera */}
      {showCamera && <CameraScreen
        closeCamera={() => setShowCamera(false)}
        makeFile={(file) => makeFileObject(file)}
        setFilePath={setFilePath}
        setFile={setFileObject}
        uploadFile={handleFileUpload}
        unsetFile={handleUnsetFile}
        />}

      {savedImage && (<Image
                        source={{ uri: savedImage }}
                        style={{ width: '100%', minHeight: 250, }}
                        />)}

      {/* File Preview */}
      {filePath && <View style={{
              marginBottom: 40,
      }}>
        <View
          style={{ marginHorizontal: SIZES.large,
            marginBottom: 20,
          }}
        >
          {/*<Text style={{fontSize: 18, marginVertical: 2, }}>File Name:</Text>
          <Text style={{fontSize: 18, marginVertical: 5, fontWeight: 'bold', }}>{filePath}</Text>*/}
          <Text style={{fontSize: 18, marginVertical: 15, }}>Would you like to upload this file?</Text>
          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={{ width: '100%', minHeight: 300, }}
            />
          )}
        </View>

        <TouchableOpacity
          onPress={handleFileUpload}
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
          >Yes, Upload file</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleUnsetFile}
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
          >No, Select new file</Text>
        </TouchableOpacity>

      </View>}

      {/* File Upload Status */}
      {uploadStatusMessage
      && <View
        style={{
          ...styles.header,
          flexDirection: 'row',
          marginVertical: 10,
          paddingVertical: 20,
          backgroundColor: (uploadStatusIcon === 'exclamationcircleo') ? COLORS.error : COLORS.success,
        }}
      >
        <TouchableOpacity
          onPress={goHome}
          style={{
            width: '20%',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
            borderRadius: 10,
          }}
        >
          <AntDesign name={uploadStatusIcon} size={24} color="black" />
        </TouchableOpacity>
        <View style={{
          width: '80%',
        }}>
          <Text style={{ fontSize: 20, marginVertical: 10, fontWeight: 'bold' }}>
            {uploadStatusMessage}
          </Text>
        </View>
      </View>}
      
      {/* Controls */}
      {!(filePath || showCamera) && <View>
        {/*<TouchableOpacity
            onPress={() => setShowResultSheet(true)}
            style={{
              backgroundColor: '#000000',
              margin: 10,
              paddingHorizontal: 10,
              paddingVertical: 15,
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
          >Preview Result Sheet</Text>
        </TouchableOpacity>*/}
        <TouchableOpacity
            onPress={() => setShowCamera(true)}
            style={{
              backgroundColor: '#000000',
              margin: 10,
              paddingHorizontal: 10,
              paddingVertical: 15,
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
          onPress={handleSetFile}
          style={{
            backgroundColor: '#000000',
            margin: 10,
            paddingHorizontal: 10,
            paddingVertical: 15,
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
              paddingHorizontal: 10,
              paddingVertical: 15,
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
      </View>}

    </View>
  );
};

export default ECSummary;
