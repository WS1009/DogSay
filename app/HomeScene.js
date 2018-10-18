'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    RefreshControl,
    ActivityIndicator,
    Dimensions,
} from 'react-native';
import Item from './Item'
import Detail from './Detail'
import request from './request'
import config from './config'
const{width,height}= Dimensions.get('window');

var cacheResults = {
    nextPage: 1,
    items: [],
    total: 0
};

export default class HomeScene extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = ({
            dataSource: ds.cloneWithRows([]),
            isRefreshing: false,
            isLoadingTail: false,
        })
    }

    componentDidMount() {
        this._fetchData(1)
    }

    _hasMore = () => {
        return cacheResults.items.length !== cacheResults.total
    };

    _fetchMoreData = () => {
        if (!this._hasMore || this.state.isLoadingTail) {
            return
        }
        const page = cacheResults.nextPage;
        this._fetchData(page)
    };

    _renderFooter = () => {
        if (!this._hasMore() || this.state.total !== 0) {
            return (
                <View style={styles.loadingMore}>
                    <Text style={styles.loadingText}>没有更多了</Text>
                </View>
            )
        }

        return (
            <View style={[styles.loadingMore, styles.horizontal]}>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
        )
    };

    _onRefresh = () => {
        if (!this._hasMore || this.state.isRefreshing) {
            return
        }
        this._fetchData(0)
    };

    _fetchData(page) {
        var that = this;

        if (page !== 0) {
            this.setState({
                isLoadingTail: true
            })
        } else {
            this.setState({
                isRefreshing: true
            })
        }

        request.get(config.api.base + config.api.creations, {
            accessToken: 'abc',
        })
            .then((data) => {
                if (data.success) {
                    //对数组进行部分截取，并返回一个数组的副本
                    var items = cacheResults.items.slice();
                    if (page !== 0) {
                        items = items.concat(data.data);
                        cacheResults.nextPage += 1;
                    } else {
                        items = data.data.concat(items)
                    }
                    cacheResults.items = items;
                    cacheResults.total = data.total;

                    setTimeout(function () {
                        if (page !== 0) {
                            that.setState({
                                isLoadingTail: false,
                                dataSource: that.state.dataSource.cloneWithRows(cacheResults.items)
                            })
                        } else {
                            that.setState({
                                isRefreshing: false,
                                dataSource: that.state.dataSource.cloneWithRows(cacheResults.items)
                            })
                        }
                    }, 0);

                }
            })
            .catch((error)=>{
                if (page!==0){
                    this.setState({
                        isLoadingTail:false,
                    })
                } else{
                    this.setState({
                        isRefreshing:false,
                    })
                }
                console.warn(error)
            })
    }

    _loadPage(row){
        const{navigator}=this.props;
        if (navigator) {
            navigator.push({
                name:'detail',
                component:Detail,
                params:{
                    row:row
                }
            })
        }else {
            alert(row._id)
        }
    }

    _renderRow(row){
        return (
            <Item
                row={row}
                key={row._id}
                onSelect={()=>this._loadPage(row)}
            />
        )
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>
                        列表页面
                    </Text>
                </View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow.bind(this)}
                    enableEmptySections={true}
                    //去除list和title之间的间隙
                    automaticallyAdjustContentInsets={false}
                    //当列表触底的时候加载更多
                    onEndReached={this._fetchMoreData}
                    //当距离底部20的时候预加载下一页
                    onEndReachedThreshold={20}
                    //上滑加载更多
                    renderFooter={this._renderFooter}
                    //去掉垂直方向的滚动条
                    showsVerticalScrollIndicator={false}
                    //下拉加载更多
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh}
                            tintColor='#ff6600'
                            title='拼命加载中...'
                        />
                    }
                />


            </View>
        );
    }
}


const styles = StyleSheet.create({
    loadingMore:{
      marginTop: 20,
    },
    loadingText:{
        color:'#777',
        textAlign: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#f5fcff'
    },
    header: {
        paddingTop: 25,
        paddingBottom: 15,
        backgroundColor: '#ee753c',
    },
    headerTitle: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '600',
    },

});