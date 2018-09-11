'use strict';
import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default class MainScene extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <Text>213123</Text>
            </View>
        );
    }
}
