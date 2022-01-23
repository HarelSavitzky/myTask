import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    view: {
        flex: 1,
    },
    view_2: {
        position: 'absolute',
        height: 500,
        width: 350,
        alignSelf: 'center',
        paddingHorizontal: 10,
    },
    buttonsContainer: {
        flex: 1,
        alignSelf: 'center',
        borderColor: '#8F46B3',
        borderRadius: 15,
        borderWidth: 3,
        marginVertical: 100,
        justifyContent: 'space-around',
        backgroundColor: 'white',
    },
    button: {
        alignSelf: 'center',
        marginHorizontal: 30,
        borderRadius: 15,
        borderWidth: 3,
        borderColor: '#ccd1d1',
        backgroundColor: '#8F46B3',
        paddingHorizontal: 20,
        paddingVertical: 20,
        width: 300,
    },
    text: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
    },
});
