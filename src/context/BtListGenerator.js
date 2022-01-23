import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import styles from '../styles/BTStyles';

const BtListGenerator = ({ deviceList, callBack, text }) => {

    return (
        <View >
            <Text style={styles.listHeader}>{text.listHeader}({deviceList.length})</Text>
            <FlatList data={deviceList}
                keyExtractor={(list) => list.id}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.row}>
                            <Text style={styles.listText}>{`${item.name} (${item.name})`}</Text>
                            <TouchableOpacity onPress={() => {
                                try {
                                    callBack(item);
                                } catch (err) {
                                }
                            }}>
                                <Text style={styles.button}>{text.buttonText}</Text>
                            </TouchableOpacity>
                        </View>
                    );
                }}
            />
        </View>
    );
};
export default BtListGenerator;
