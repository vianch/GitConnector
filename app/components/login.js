'use strict';

import React, { Component } from 'react';
import {
    ActivityIndicator,
    Platform,
    Text,
    TextInput,
    TouchableHighlight,
    View,
    Image,
} from 'react-native';

import {loginStyles} from '../styles/login.styles';
import {AuthService} from '../services/auth.service';

export class Login extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            showProgress: false,
        };
        this.logoImage = Platform.select({
            ios: require('../images/octocat.png'),
            android: require('../images/heisencat.png'),
        });
    }

    onLoginPressed() { 
        this.setState({showProgress: true});
        AuthService.logIn({
            username: this.state.username,
            password: this.state.password,
        }, (result) => {
            this.setState(Object.assign({showProgress: false}, result));
            
            if (result.successLogin && this.props.onLogin) {
                this.props.onLogin();
            }
        });
    }

    render() {
        let errorControl = <View />;

        if (!this.state.successLogin && this.state.badCredentials) {
            errorControl = <Text style={loginStyles.errorMessage}> Username or password wrong.</Text>
        }

        if (!this.state.successLogin && this.state.unknownError) {
            errorControl = <Text style={loginStyles.errorMessage}> Unknown error try later .</Text>
        }
         
        return(
            <View style={loginStyles.container}>
                <Image style={loginStyles.logo} source={this.logoImage} />
                <Text style={loginStyles.headingText}> 
                    Github connector
                </Text>

                {errorControl}
                <TextInput 
                    onChangeText={(text) => this.setState({username: text})} 
                    style={loginStyles.textInput} placeholder="Github username"  underlineColorAndroid='transparent' />
                <TextInput
                    onChangeText={(text) => this.setState({password: text})} 
                    secureTextEntry={true}
                    style={loginStyles.textInput} placeholder="Github password"  underlineColorAndroid='transparent' />  
                <TouchableHighlight onPress={this.onLoginPressed.bind(this)} style={loginStyles.sendButton}>  
                    <Text style={loginStyles.sendButtonText}> 
                        Log in 
                    </Text>
                </TouchableHighlight>

                <ActivityIndicator animating={this.state.showProgress} size="large" style={loginStyles.loader}></ActivityIndicator>
            </View>
        ); 
    }
}
