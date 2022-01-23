import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, Linking, View } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import styles from '../styles/QRStyles';

const QRScanner = () => {
    const [link, setLink] = useState('');
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('Position the barcode inside the frame');

    useEffect(() => {
        (async () => {
            try {
                const cameraStatus = await RNCamera.requestCameraPermissionsAsync();
                setHasPermission(cameraStatus.status === 'granted');
            } catch (error) {
            }
        })();
    }, []);

    const activateLink = () => {
        try {
            Linking.openURL(link);
            setText('Position the barcode inside the frame');
        } catch (err) {
            setText('It seems something is wrong with the link');
        }
    };
    //check if permission granted
    if (hasPermission === false) {
        return <Text style={styles.button}>Need To Grant Camera Permission</Text>;
    }
    return (
        <View style={styles.container}>
            <View style={styles.barcodeContainer}>
                <QRCodeScanner
                    reactivate={true}
                    reactivateTimeout={2000}
                    vibrate={false}
                    style={styles.scanner}
                    onRead={(code) => {
                        setText('The code link is:');
                        setScanned(true);
                        setLink(code.data.replace(/ /g, ''));
                    }} />
            </View>
            <View style={styles.bottomContainer}>
                <Text style={[styles.text, { color: 'purple' }]}>{text}</Text>
                {scanned &&
                    <Text style={[styles.text, { color: 'purple' }]}>{link}</Text>}
                {scanned &&
                    <TouchableOpacity
                        onPress={() => {
                            setScanned(false);
                            setText('Position the barcode inside the frame');
                        }}>
                        <Text
                            style={styles.button}>Scan again</Text>
                    </TouchableOpacity>}
                {scanned &&
                    <TouchableOpacity
                        onPress={() => {
                            setScanned(false);
                            activateLink();
                        }}>
                        <Text
                            style={styles.button}>Activate Link</Text>
                    </TouchableOpacity>}
            </View>
        </View>
    );
};
export default QRScanner;
