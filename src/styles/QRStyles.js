import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomContainer: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    barcodeContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: 300,
        overflow: 'hidden',
        borderRadius: 30,
        backgroundColor: '#8F46B3',
    },
    scanner: {
        height: 450,
        width: 450,
    },
    button: {
        alignSelf: 'center',
        borderRadius: 15,
        borderWidth: 3,
        borderColor: '#ccd1d1',
        backgroundColor: '#8F46B3',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    text: {
        borderRadius: 15,
        borderWidth: 3,
        borderColor: '#8F46B3',
        flexDirection: 'row',
        justifyContent: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        paddingHorizontal: 5,
        paddingVertical: 15,
        marginTop: 10,
    },
});
