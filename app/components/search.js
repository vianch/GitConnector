'use strict';

import React, { Component } from 'react';
import {
    TextInput,
    TouchableHighlight,
    Text,
    View,
    Image,
} from 'react-native';

import {loginStyles} from '../styles/login.styles';

export class Search extends Component<{}> {
    constructor(props) {
        super(props);   
        this.state = {
            searchQuery: '',
        }
    }

    onSearchPressed() {
        console.log('search pressed'); 
    }

    render() {   
        return(
            <View style={loginStyles.container}>
                <TextInput
                    onChangeText={(text) => this.setState({searchQuery: text})} 
                    secureTextEntry={true}
                    style={loginStyles.textInput} placeholder="Search repository"  underlineColorAndroid='transparent' />  
                <TouchableHighlight onPress={this.onSearchPressed.bind(this)} style={loginStyles.sendButton}>  
                    <Text style={loginStyles.sendButtonText}> 
                        Get luck!
                    </Text>
                </TouchableHighlight>
            </View>
        ); 
    }
}
