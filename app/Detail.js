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

const {width, height} = Dimensions.get('window');
import request from './request'
import Video from 'react-native-video'

//npm i react-native-video --save
//rnpm link react-native-video

export default class Detail extends Component {
    constructor(props) {
        super(props);
        var data = this.props.row;
        this.state = ({
            data: data,
            rate: 1,
            mute: false,
            repeat: false,
            resizeMode: 'contain',
            videoLoaded: false,
            playing: false,
            videoProgress: 0.01,
            videoTotal: 0,
            currentTime: 0,
        })
    }


    _pressRow() {
        alert('Hello')
    }

    _backToList() {
        let {navigator} = this.props;
        if (navigator) {
            this.props.navigator.pop()
        } else {
            alert(data._id)
        }
    }

    _onLoadStart() {
        console.log('_onLoadStart')
    }

    _onLoad() {
        console.log('_onLoad')
    }

    _onProgress(data) {
        if (!this.state.videoLoaded) {
            this.setState({
                videoLoaded: true,
            })
        }
        var duration = data.playableDuration;
        var currentTime = data.currentTime;
        var percent = Number((currentTime / duration).toFixed(2));
        var newState={
            videoTotal: duration,
            currentTime: Number(data.currentTime.toFixed(2)),
            videoProgress: percent,
        };

        if (!this.state.videoLoaded) {
            newState.videoLoaded=true;
        }

        if (!this.state.videoLoaded) {
            newState.playing=true;
        }

        this.setState({
            videoTotal: duration,
            currentTime: Number(data.currentTime.toFixed(2)),
            videoProgress: percent,
            playing:true,
        });
        console.log('_onProgress')
    }

    _onEnd() {
        this.setState({
            videoProgress: 1,
        });
        console.log('_onEnd')
    }

    _onError() {
        console.log('_onError')
    }


    render() {
        var data = this.state.data;
        return (
            <View style={styles.page}>
                <Text onPress={this._backToList} style={{fontSize: 18, padding: 15, color: 'red'}}>详情页面</Text>
                <View style={styles.videoBox}>
                    <Video
                        ref='videoPlayer'
                        source={{uri: data.video}}
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
                        resizeMode={this.state.resizeMode}
                        repeat={this.state.repeat}
                        onLoadStart={this._onLoadStart}
                        onLoad={this._onLoad}
                        onProgress={this._onProgress}
                        onEnd={this._onEnd}
                        onError={this._onError}/>
                    {
                        !this.state.videoLoaded && <ActivityIndicatorIOS color='#ee735c' style={styles.loading}/>
                    }

                    {
                        this.state.videoLoaded && !this.state.playing ?
                        <Icon onPress={this._replay} name='play' style={styles.playIcon}></Icon>:null
                    }

                    <View style={styles.progressBox}>
                        <View style={[styles.progressBar, {width: width * this.state.videoProgress}]}>

                        </View>
                    </View>

                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    videoBox: {
        width: width,
        height: 360,
        backgroundColor: '#000',
    },
    video: {
        width: width,
        height: 360,
        backgroundColor: '#000',
    },
    loading: {
        position: 'absolute',
        left: 0,
        top: 140,
        width: width,
        alignSelf: 'center',
        backgroundColor: 'transparent',
    },
    progressBox: {
        width: width,
        height: 2,
        backgroundColor: '#ccc',
    },
    progressBar: {
        width: 1,
        height: 2,
        backgroundColor: '#ff6600',
    },
});