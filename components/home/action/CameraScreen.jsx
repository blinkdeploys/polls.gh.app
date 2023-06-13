import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Alert, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';

import styles from './agentActions.style'
import { AntDesign } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../../constants'


const ECSummary = ({ title, goHome }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isLoading, setIsLoading] = useState(false);
  const [photoUri, setPhotoUri] = useState(null);
  const [filePath, setFilePath] = useState('')

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

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

  const takePhoto = async () => {
    if (cameraRef) {
        setIsLoading(true)
        const photo = await cameraRef.takePictureAsync();
        setIsLoading(false)
        setPhotoUri(photo.uri);
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
            type={cameraType} ref={(ref) => (cameraRef = ref)}>
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
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
                style={{
                    backgroundColor: '#000000',
                    paddingVertical: 8,
                    paddingHorizontal: 10,
                    margin: 20,
                    borderRadius: 10,
                }}
                onPress={takePhoto}
            >
                <Text
                    style={{ fontSize: 20, color: COLORS.white }}
                >Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    backgroundColor: '#000000',
                    paddingVertical: 8,
                    paddingHorizontal: 10,
                    margin: 20,
                    borderRadius: 10,
                }}
                onPress={selectPhoto}
            >
                <Text
                    style={{ fontSize: 20, color: COLORS.white }}
                >Select Photo</Text>
            </TouchableOpacity>
        </View>)}

      {photoUri && (
        <View style={{ alignItems: 'center' }}>
            <Image source={{ uri: photoUri }} style={{ width: 330, height: 350 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: '#000000',
                        paddingVertical: 8,
                        paddingHorizontal: 10,
                        margin: 20,
                        borderRadius: 10,
                    }}
                    onPress={uploadPhoto}
                >
                    <Text style={{ fontSize: 20, color: COLORS.white }}>Upload Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        backgroundColor: '#000000',
                        paddingVertical: 8,
                        paddingHorizontal: 10,
                        margin: 20,
                        borderRadius: 10,
                    }}
                    onPress={() => setPhotoUri(null)}
                >
                    <Text style={{ fontSize: 20, color: COLORS.white }}>Retake Photo</Text>
                </TouchableOpacity>
            </View>
        </View>
      )}
    </View>
  );
};

export default ECSummary;
