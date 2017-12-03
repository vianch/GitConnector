 'user strict';

 import React, { Component } from 'react';
 import {
    NavigatorIOS, 
    TabBarIOS,
    Text,
    View,
} from 'react-native';

import {loginStyles} from '../styles/login.styles';
import {Feed} from './feed';
import {Search} from './search';

export const tabsTypes = {
    feed: 'feed',
    search: 'search',
};

 export class Container extends Component<{}> {
    constructor(props) {
        super(props);

        this.state = { 
            selectedTab: tabsTypes.feed,
        };
    }

    render() {
        return (
            <TabBarIOS style={loginStyles.container}>
                <TabBarIOS.Item 
                    title="Feed"
                    selected={this.state.selectedTab === tabsTypes.feed}
                    icon={require('../images/inbox.png')}
                    onPress={() => this.setState({selectedTab: tabsTypes.feed})}
                >
                   <NavigatorIOS
                        style={{
                            flex: 1
                        }}
                        initialRoute={{
                            component: Feed,
                            title: 'Feed'
                        }}
                   >
                   
                   </NavigatorIOS>
                </TabBarIOS.Item>

                <TabBarIOS.Item 
                    title="Search"
                    selected={this.state.selectedTab === tabsTypes.search}
                    icon={require('../images/search.png')}
                    onPress={() => this.setState({selectedTab: tabsTypes.search})}
                >
                    <NavigatorIOS
                        style={{
                            flex: 1
                        }}
                        initialRoute={{
                            component: Search,
                            title: 'Search'
                        }}
                   >
                   
                   </NavigatorIOS>
                </TabBarIOS.Item> 
            </TabBarIOS>
        );
    }
 }
