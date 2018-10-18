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

export default class HomeScene extends Component {
    constructor(props) {
        super(props);
        var row=this.props.row;
        this.state=({
            row:row,
            up:row.voted,
        })
    }

    _up(){

    }

    _pressRow(){
        alert('Hello')
    }

    render() {
        var row=this.state.row;
        return (
            <TouchableHighlight onPress={()=>this.props.onSelect}>
                <View style={styles.item}>
                    <Text style={styles.title}>{row.title}</Text>
                    <ImageBackground
                        source={{uri:row.thumb}}
                        style={styles.thumb}
                    >
                        <Icon name='md-arrow-dropright-circle' size={30} style={styles.play}/>
                    </ImageBackground>

                    <View style={styles.itemFooter}>
                        <View style={styles.handleBox}>
                            <Icon name='md-heart' size={28} color='#000'/>
                            <Text style={styles.down}>喜欢</Text>
                        </View>

                        <View style={styles.handleBox}>
                            <Icon name='md-chatbubbles' size={28} color='#000'/>
                            <Text style={styles.comment}>评论</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}


const styles = StyleSheet.create({
    handleText:{
        padding:10,
        fontSize:18,
        color:'#333',
    },
    item:{
        width:width,
        marginBottom: 10,
        backgroundColor:'#fff',
    },
    thumb:{
        width:width,
        height:width*0.56,
    },
    title:{
        padding: 10,
        fontSize: 18,
        color: '#333',
    },
    itemFooter:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#eee',
    },
    handleBox:{
        padding:10,
        flexDirection: 'row',
        width:width/2-0.5,
        justifyContent: 'center',
        backgroundColor:'#fff',
    },
    play:{
        position: 'absolute',
        bottom:14,
        right:14,
        width:28,
        height:28,
        backgroundColor:'transparent',
        borderColor:'#fff',
        borderWidth: 1,
        borderRadius:15,
        color: '#ed7b66'
    },
    up:{
        fontSize:22,
        color:'#ed7b66'
    },
    down:{
        fontSize:22,
        color:'#333',
    },
    comment:{
        fontSize:22,
        color:'#333',
    },
});