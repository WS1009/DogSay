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
import Video from 'react-native-video'

//npm i react-native-video --save
//rnpm link react-native-video

export default class Detail extends Component {
    constructor(props) {
        super(props);
        var data=this.props.row;
        this.state=({
            data:data,
            rate:1,
            mute:false,
            repeat:false,
            resizeMode:'contain',
        })
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

    _onLoadStart(){
        console.log('_onLoadStart')
    }

    _onLoad(){
        console.log('_onLoad')
    }

    _onProgress(){
        console.log('_onProgress')
    }

    _onEnd(){
        console.log('_onEnd')
    }

    _onError(){
        console.log('_onError')
    }


    render() {
        var data=this.state.data;
        return (
            <View style={styles.page}>
                <Text onPress={this._backToList} style={{fontSize:18,padding: 15,color:'red'}}>详情页面</Text>
                <View style={styles.videoBox}>
                    <Video
                        ref='videoPlayer'
                        source={{uri:data.video}}
                        style={styles.video}
                        //声音的放大倍数
                        volume={3}
                        //是否停止
                        paused={false}
                        //是否暂停
                        rate={this.state.rate}
                        //是否静音
                        muted={this.state.mute}
                        //显示方式
                        resizeMode={this.state.resizeMode }
                        repeat={this.state.repeat}
                        onLoadStart={this._onLoadStart}
                        onLoad={this._onLoad}
                        onProgress={this._onProgress}
                        onEnd={this._onEnd}
                        onError={this._onError}
                    />
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