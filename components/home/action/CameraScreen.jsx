import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Alert, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';

import styles from './agentActions.style'
import { AntDesign } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../../constants'


const CameraScreen = ({
  title, makeFile,
  setFile, setFilePath,
  uploadFile, unsetFile,
  closeCamera, }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isLoading, setIsLoading] = useState(false);
  const [photoUri, setPhotoUri] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePhoto = async () => {
    if (cameraRef) {
      setIsLoading(true)
      const photo = await cameraRef.takePictureAsync();
      const file = makeFile(photo)
      console.log(file)
      setFile(file)
      setFilePath(file?.name)
      setIsLoading(false)
      setPhotoUri(photo.uri);
    }
  };

  /*
  const selectPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Please allow access to the camera roll.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPhotoUri(result.uri);
    }
  };

  const uploadPhoto = async () => {
    if (!photoUri) {
      Alert.alert('No Photo', 'Please take or select a photo first.');
      return;
    }
    try {
        const formData = new FormData();
        formData.append('photo',
                        {
                          uri: photoUri,
                          name: 'photo.jpg',
                          type: 'image/jpg'
                        });
        const response = await fetch('https://example.com/upload',
                                    {
                                        method: 'POST',
                                        body: formData,
                                    });
        if (response.ok) {
            // Display a success message or perform any other actions upon successful upload
            Alert.alert('Photo Uploaded', 'Your photo has been successfully uploaded.');
        } else {
            let e = 'Error while uploading the file.'
            if (response.status === 404) {
                e = 'Server not found.'
            } else if (response.status === 500) {
                e = 'Server error.'
            }
            // response.statusText
            Alert.alert('Upload Error:', e);
        }
    } catch (error) {
        Alert.alert('Error while picking the file:', error);
    }
  };
  */

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{flex: 1, paddingVertical: 20, }}>

      <Spinner visible={isLoading} textContent={'Loading...'} textStyle={{ color: '#FFF' }} />

      {!photoUri && (
        <Camera
          style={{ flex: 1, }}
          ref={(ref) => setCameraRef(ref)}
          type={cameraType}
        >
            <View
            style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                paddingTop: 40,
                height: 350,
            }}
            >
            <TouchableOpacity
                style={{ alignSelf: 'flex-end', alignItems: 'center' }}
                onPress={() => {
                setCameraType(
                    cameraType === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
                }}
            >
                <Text
                    style={{
                        fontSize: 18,
                        marginBottom: 10,
                        color: COLORS.white,
                    }}
                >Flip</Text>
            </TouchableOpacity>
            </View>
        </Camera>)}

      {!photoUri && (
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 20,
        }}>
            <TouchableOpacity
                style={{
                    backgroundColor: '#000000',
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                }}
                onPress={takePhoto}
            >
                <Text
                    style={{ fontSize: 20, color: COLORS.white, fontWeight: 'bold' }}
                >Take Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={closeCamera}
              style={{
                backgroundColor: COLORS.white,
                paddingHorizontal: 10,
                paddingVertical: 15,
                marginHorizontal: 10,
                marginVertical: 20,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
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


        </View>)}

      {photoUri && (
        <View>
            <Image source={{ uri: photoUri }} style={{ width: 330, height: 350 }} />
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 0,
            }}>
                <TouchableOpacity
                    style={{
                      backgroundColor: '#000000',
                      paddingVertical: 15,
                      paddingHorizontal: 10,
                      borderRadius: 10,
                      margin: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                    }}
                    onPress={uploadFile}
                >
                    <Text style={{
                      fontSize: 20,
                      color: COLORS.white,
                      fontWeight: 'bold'
                    }}>Upload Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                      backgroundColor: COLORS.white,
                      paddingVertical: 15,
                      paddingHorizontal: 10,
                      borderRadius: 10,
                      margin: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                    }}
                    onPress={() => {
                      unsetFile()
                      setPhotoUri(null)
                    }}
                >
                    <Text style={{
                      fontSize: 20,
                      color: '#000000',
                      fontWeight: 'bold'
                    }}>Retake Photo</Text>
                </TouchableOpacity>


                
            </View>
        </View>
      )}
    </View>
  );
};

export default CameraScreen;
