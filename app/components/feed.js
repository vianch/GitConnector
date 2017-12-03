'use strict';

import React, { Component } from 'react';
import {
    ActivityIndicator,
    Image,
    SectionList,
    Text,
    TouchableHighlight,
    View,
  } from 'react-native';

import {loginStyles} from '../styles/login.styles';
import {AuthService} from '../services/auth.service';
import {RowDetail} from './row-detail';

export class Feed extends Component<{}> {
    constructor(props) {
        super(props);

        this.state = { 
            dataSource: [{title: 'loading', data: [{actor: {login: 'LOAAADING!!!'}}]},],
            showProgress: true,
        };
    }

    componentDidMount() {
        this.fetchFeed();
    }

    fetchFeed() {
        AuthService.getAuthorizationInfo((error, authInfoUser) => {
            if(authInfoUser.user !== null ) {
                const url = `https://api.github.com/users/${authInfoUser.user.login}/received_events`;
                fetch(url, {
                    headers: authInfoUser.auth,
                })
                .then((response) => response.json())
                .then((data) => {
                    if (data) {
                        this.setFeedData(data);
                    }
                });
            }
        });
    }

    setFeedData(data) {
        const feedItems = data.filter((ev) => ev.type === 'PullRequestEvent');
        const users = [];

        feedItems.forEach(element => {
            users.push(element);
        });

        this.setState({
            dataSource: [{title: 'loaded', data: users},],
            showProgress: false,
        });
    }

    onPressRow(rowData) {
        console.log("Press: ", rowData);
        this.props.navigator.push({
            title: 'Detail',
            component: RowDetail,
            passProps: {
                pushEvent: rowData,
            }
        });
    }

    render() {
        if (this.state.showProgress) {
            return (
                <View style={loginStyles.container}>
                    <ActivityIndicator animating={true} size="large" style={loginStyles.loader}></ActivityIndicator>
                </View>
            );
            
        } 
        return (
            <View style={{marginTop: 70}}>
                <SectionList 
                    sections={this.state.dataSource}
                    renderItem={({item}) =>
                    <TouchableHighlight 
                        onPress={() => this.onPressRow(item)}
                        underlayColor='#ddd'
                    >
                        <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                padding: 20,
                                alignItems: 'center',
                                borderColor: '#D7D7D7',
                                borderBottomWidth: 1,
                        }}>
                          <Image 
                                source={{uri: item.actor.avatar_url}}
                                style={{height: 36, width: 36, borderRadius: 18,}}
                            />
                            
                            <View style={{paddingLeft: 20}}>
                                <Text style={{fontSize: 10}}>
                                    {item.created_at}
                                </Text>
                                <Text>
                                    {item.actor.login}
                                </Text>
                                <Text>
                                    {item.payload.ref}
                                </Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                        
                    }
                    keyExtractor={(item, index) => index}
                />
            </View>
        );  
        
    }
}
