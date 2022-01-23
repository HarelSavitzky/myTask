import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import styles from '../styles/CameraStyles';

const CameraWindow = ({ onSubmit }) => {

    const [hasPermission, setHasPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(RNCamera.Constants.Type.back);


    useEffect(() => {
        (async () => {
            try {
                const cameraStatus = await RNCamera.requestCameraPermissionsAsync();
                setHasPermission(cameraStatus.status === 'granted');
            } catch (err) {
            }
        })();
    }, []);

    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync(null);
            setImage(data.uri);
        };
    };


    if (hasPermission === false) {
        return <Text style={styles.button}>Need To Grant Camera Permission</Text>;
    }

    const pictureTransform = () => {

        if (image) {
            if (type === RNCamera.Constants.Type.back) {
                return <Image source={{ uri: image }} style={{ flex: 1 }} />;
            } else {
                return <Image source={{ uri: image }} style={{ flex: 1, transform: [{ scaleX: -1 },] }} />;
            }
        }
    };
    return (
        <View style={styles.wrapper}>
            <View style={styles.windowContainer}>
                <View style={styles.cameraContainer}>
                    {!image &&
                        <RNCamera ref={ref => setCamera(ref)}
                            style={styles.fixedRatio}
                            type={type}
                            ratio={'16:9'}
                            captureAudio={false}
                            androidCameraPermissionOptions={{
                                title: 'Permission to use camera',
                                message: 'We need your permission to use your camera',
                                buttonPositive: 'Ok',
                                buttonNegative: 'Cancel',
                            }} />}
                    {image &&
                        pictureTransform()}
                </View>

                {!image &&
                    <TouchableOpacity
                        style={[styles.reverseCamera]}
                        onPress={() => setType(type === RNCamera.Constants.Type.back ?
                            RNCamera.Constants.Type.front : RNCamera.Constants.Type.back)}>
                        <Text style={styles.text}>Flip</Text>
                    </TouchableOpacity>}

                <TouchableOpacity
                    style={[styles.exitCamera]}
                    onPress={() => onSubmit(false)}>
                    <Text style={styles.text}>Close</Text>
                </TouchableOpacity>


                <View style={styles.bottomButtonsContainer}>

                    {!image &&
                        <TouchableOpacity
                            style={[styles.bottomButton,
                            { alignSelf: 'center' }]}
                            onPress={() => takePicture()}>
                            <Text style={styles.bottomText}>TakePicture</Text>
                        </TouchableOpacity>}

                    {image &&
                        <TouchableOpacity
                            style={styles.bottomButton}
                            onPress={() => setImage(null)}>
                            <Text style={styles.bottomText}>Clear</Text>
                        </TouchableOpacity>}
                </View>

            </View>
        </View>
    );
};
export default CameraWindow;
