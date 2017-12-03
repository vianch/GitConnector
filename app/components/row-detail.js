import React, { Component } from 'react';
import {
    Image,
    Text,
    View
} from 'react-native';
import moment from 'moment';

export class RowDetail extends Component<{}> {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.state);
        return (
            <View style={{
                flex: 1,
                paddingTop: 80,
                justifyContent: 'flex-start',
                alignItems: 'center'
            }}>
                <Image 
                    source={{uri: this.props.pushEvent.actor.avatar_url}}
                    style={{
                        height: 120,
                        width: 120,
                        borderRadius: 60,
                    }}
                />
                <Text style={{
                    paddingTop: 20,
                    paddingBottom: 20,
                    fontSize: 20,
                }}>{moment(this.props.pushEvent.created_at).fromNow()}</Text>
                <Text>{this.props.pushEvent.actor.login}</Text>
                <Text>{this.props.pushEvent.payload.red}</Text>
                <Text>{this.props.pushEvent.repo.name}</Text>
                <Text>{this.props.pushEvent.payload.pull_request.title}</Text>
            </View>
        );
    }
}