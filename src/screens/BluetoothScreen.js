import React, { useState, useEffect } from 'react';
import { View, Text, PermissionsAndroid, TouchableOpacity, Alert } from 'react-native';
import RNBluetoothClassic from 'react-native-bluetooth-classic';
import LocationSwitch from 'react-native-location-permission';
import BtListGenerator from '../context/BtListGenerator';
import styles from '../styles/BTStyles';

const requestPermission = async () => {

    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
        title: "Request for Location Permission",
        message: "Bluetooth Scanner requires access to Fine Location Permission",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
    });
    return (granted === PermissionsAndroid.RESULTS.GRANTED);
};

const BluetoothScreen = ({ }) => {

    const [discovery, setDiscovery] = useState();
    const [isSearching, setIsSearching] = useState(false);
    const [unpairedDevices, setUnpairedDevices] = useState([]);
    const [pairedDevices, setPairedDevices] = useState([]);
    const [errText, setErrText] = useState('');

    useEffect(() => {
        getConnecteDevices();
    }, []);

    async function getConnecteDevices() {
        try {
            let connected = await RNBluetoothClassic.getBondedDevices();
            if (connected.length > 0) {
                setPairedDevices(connected);
            }
        } catch (err) {
            console.log(err);
        }
    };

    async function startDiscovery() {
        try {
            let granted = await requestPermission();
            if (!granted) {
                throw new Error(`Access fine location was not granted`);
            }
            setDiscovery({ discovering: true });
            try {
                setIsSearching(true);
                let unpaired = await RNBluetoothClassic.startDiscovery();
                setUnpairedDevices(filterScannedDevices(unpaired));
            } finally {
                setDiscovery({ discovery, discovering: false });
            }
        } catch (err) {
            console.log(err);
        }
        setIsSearching(false);
    };

    const filterScannedDevices = (scannedDevices) => {
        let filteredList;
        filteredList = scannedDevices.filter((device) => {
            return (!device.name.includes(':'));
        });
        return filteredList;
    };
    //let macAddressValidator = new RegExp(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/);

    async function pair(item) {
        try {
            RNBluetoothClassic.pairDevice(item.address);
            if (!isOnList(pairedDevices, item)) {
                setPairedDevices([...pairedDevices, item]);
                removeFromList(unpairedDevices, setUnpairedDevices, item);
            }
        } catch (err) {
            Alert.alert('There was a problem connecting to the device.\nPlease try again.');
        }
    };

    async function unpair(item) {
        try {
            if (item.address != null) {
                RNBluetoothClassic.unpairDevice(item.address);
            }
            if (!isOnList(unpairedDevices, item)) {
                setUnpairedDevices([...unpairedDevices, item]);
            }
            removeFromList(pairedDevices, setPairedDevices, item);
        } catch (err) {
            Alert.alert('There was a problem connecting to the device.\nPlease try again.');
        }
    };

    const removeFromList = (devices, setter, item) => {
        var list = [...devices];
        var index = list.indexOf(item);
        list.splice(index, 1);
        setter(list);
    };

    const isOnList = (devices, item) => {
        for (let i = 0; i < devices.length; i++) {
            if (devices[i].id === item.id) {
                return true;
            }
        }
        return false;
    };

    async function scanButtonHandler() {
        if (await isBTEnabled()) {
            await isLocationEnabled();
        }
    };

    async function isBTEnabled() {
        if (await RNBluetoothClassic.isBluetoothEnabled()) {
            return true;
        } else {
            setErrText("Please enable Bluetooth in order to scan for devices")
            return false;
        }
    };

    async function isLocationEnabled() {
        try {
            await LocationSwitch.isLocationEnabled(() => {
                setErrText('');
                startDiscovery();
            },
                () => { setErrText("Please enable Location in order to scan for devices"); return false; });
        } catch (err) {
        }
    };

    return (
        <View style={styles.container}>
            {isSearching &&
                <Text style={[styles.button, styles.scanning]}>Scanning for bluetooth devices...</Text>}
            {!isSearching &&
                <View style={styles.listContainer}>
                    {(pairedDevices.length > 0) &&
                        <BtListGenerator deviceList={pairedDevices} callBack={unpair} text={{ listHeader: 'Paired Devices', buttonText: 'Unpair' }} />}
                    {(unpairedDevices.length > 0) &&
                        <BtListGenerator deviceList={unpairedDevices} callBack={pair} text={{ listHeader: 'Unpaired Devices', buttonText: 'Pair' }} />}
                </View>}
            {(errText != '') &&
                <Text style={styles.button}>{errText}</Text>}
            {!isSearching &&
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            scanButtonHandler();
                        }}>
                        <Text style={styles.text}>Search Devices</Text>
                    </TouchableOpacity>
                </View>}
        </View>
    );
};

export default BluetoothScreen;
