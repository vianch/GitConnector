import {
    StyleSheet,
} from 'react-native';

const loginStyles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        flex: 1,
        paddingTop: 66,
        alignItems: 'center',
        padding: 25,
    },
    logo: {
        width: 150,
        height: 150,
    },
    headingText: {
        fontSize: 30,
        marginTop: 25,
        marginBottom: 15,
    },
    textInput: {
        height: 50,
        marginTop: 10,
        padding: 14,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#48bbec',
        width: '100%',
        color: '#48bbec',
    },
    sendButton: {
        height: 50,
        backgroundColor: '#48bbec',
        alignSelf: 'stretch',
        marginTop: 10,
        justifyContent: 'center'
    },
    sendButtonText: {
        color: 'white',
        fontSize: 22,
        alignSelf: 'center',
    },
    loader: {
        marginTop: 20,
    },
    errorMessage: {
        color: '#D9534F',
        marginBottom: 5,
    },
}); 

export {loginStyles}
