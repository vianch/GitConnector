const Buffer = require('buffer').Buffer;
import {AsyncStorage,} from 'react-native';

export const storageKeys = {
    user: 'user',
    auth: 'auth',
};

export class AuthService {
    static logIn(credentials, callback  ) {
        const loginHeaders = this.setLoginHeaders(credentials.username, credentials.password);

        fetch('https://api.github.com/user', {
            headers: loginHeaders
        })
        .then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return response;
            } 

            throw {
                badCredentials: response.status === 401,
                unknownError: response.status !== 401,
                successLogin: false,
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((result) => {
           if (result) {
               AsyncStorage.multiSet([
                   [storageKeys.user, JSON.stringify(result)],
                   [storageKeys.auth, JSON.stringify(loginHeaders)],
               ], (error) => {
                    if (error) { throw error; }
               });
               return callback({successLogin: true});
           }
        })
        .catch((error) => {
            callback(error);
        });
    }

    static setLoginHeaders(username, password) {
        const buffer = new Buffer(`${username}:${password}`);

        return {
            'Authorization' : `Basic ${buffer.toString('base64')}`,
        };
    }

    static getAuthorizationInfo(callback) {
        AsyncStorage.multiGet([storageKeys.user, storageKeys.auth], (error, value) => { 
            if (error) {
                return callback(error);
            }

            if (!value) {
                return callback();
            }

            return callback(null, {
                user: JSON.parse(value[0][1]),
                auth: JSON.parse(value[1][1]),
            });
            
        });
    }
}
