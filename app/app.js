/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Login, Container} from './components/index';
import {loginStyles} from './styles/login.styles';
import {AuthService} from './services/auth.service';

import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class App extends Component<{}> {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      checkingAuthorization: true,
    };
  }

  componentDidMount() {
    AuthService.getAuthorizationInfo((error, authInfo) => {
        
        this.setState({
          checkingAuthorization: false,
          isLoggedIn: authInfo.user != null,
        });
    });
  }

  onLogin() {
    this.setState({isLoggedIn: true});
  }

  render() {
    if (this.state.checkingAuthorization) {
        return (
          <View style={loginStyles.container}>
            <ActivityIndicator animating={true} size="large" style={loginStyles.loader}></ActivityIndicator>
          </View>
        );
    }
    if (this.state.isLoggedIn) {
      return (
        <Container />
      );
    } else {
      return (
        <Login onLogin={this.onLogin.bind(this)} />
      );
    }
  }
}
