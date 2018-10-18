'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    ImageBackground,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
const {width, height}= Dimensions.get('window');
import request from './request'

export default class Detail extends Component {
    constructor(props) {
        super(props);
        var data=this.props.row;
        this.state=({
            data:data,
            rate:1,
            mute:false,
            repeat:false,
            resizeMethod:'contain',
        })
    }

    _up(){

    }

    _pressRow(){
        alert('Hello')
    }

    _backToList(){
        let{navigator}=this.props;
        if (navigator) {
            this.props.navigator.pop()
        }else{
            alert(data._id)
        }
    }

    render() {
        var data=this.state.data;
        return (
            <View style={styles.page}>
                <Text onPress={this._backToList} style={{fontSize:18,padding: 15,color:'red'}}>详情页面</Text>
                <View style={styles.videoBox}>

                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    page:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#ffffff',
    },
    videoBox:{
        width:width,
        height: 360,
        backgroundColor:'#000',
    },
    video:{
        width:width,
        height:360,
        backgroundColor:'#000',
    },
});