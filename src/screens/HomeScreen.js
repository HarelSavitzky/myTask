import React, { useState } from "react";
import { View, Text, Linking, TouchableOpacity } from 'react-native';
import CameraWindow from "../components/CameraWindow";
import styles from '../styles/HomeStyles';

const HomeScreen = ({ navigation }) => {
    const [camera, setCamera] = useState(false);

    return (
        <View style={styles.view}>
            <View style={styles.buttonsContainer}>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        Linking.openURL("https://www.google.com/maps");
                    }}>
                    <Text style={styles.text}>Google Maps</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Bluetooth')}>
                    <Text style={styles.text}>Bluetooth Tool</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('QRScanner')}>
                    <Text style={styles.text}>QR Scanner</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}
                    onPress={() => { setCamera(true); }}>
                    <Text style={styles.text}>Windowed Camera</Text>
                </TouchableOpacity>
            </View>
            {camera &&
                <CameraWindow onSubmit={setCamera} />}
        </View>
    );
};
export default HomeScreen;
