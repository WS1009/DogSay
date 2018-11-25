import React, {Component} from 'react';
import {Text, Image, StyleSheet} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/Ionicons'
import {Navigator} from 'react-native-deprecated-custom-components'
import HomeScene from './HomeScene'
export default class TabBar extends Component {
    static defaultProps = {
        selectedColor: 'rgb(22,131,251)',
        normalColor: '#a9a9a9'
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'HOME',
            tabName: ['首页', '发现', '我']
        }
    }

    render() {
        const {selectedColor} = this.props;
        const {tabName} = this.state;
        return (
            <TabNavigator
                hidesTabTouch={true}
                tabBarStyle={styles.tabbar}
                sceneStyle={{paddingBottom: styles.tabbar.height}}>
                <TabNavigator.Item
                    tabStyle={styles.tabStyle}
                    title={tabName[0]}
                    selected={this.state.selectedTab === 'HOME'}
                    selectedTitleStyle={{color: selectedColor}}
                    renderIcon={() => <Icon name='md-home' size={28} color='#000'/>}
                    renderSelectedIcon={() => <Icon name='md-home' size={28} color='#dc143c'/>}
                    onPress={() => this.setState({selectedTab: 'HOME'})}>

                    <Navigator
                        initialRoute={{name: "HomeScene", component: HomeScene}}
                        configureScene={(route) => {
                            return Navigator.SceneConfigs.FloatFromRight;
                        }}
                        renderScene={(route, navigator) => {
                            let Component = route.component;
                            return <Component {...route.params} navigator={navigator}/>
                        }}
                    />
                </TabNavigator.Item>

                <TabNavigator.Item
                    tabStyle={styles.tabStyle}
                    title={tabName[1]}
                    selected={this.state.selectedTab === 'Find'}
                    selectedTitleStyle={{color: selectedColor}}
                    renderIcon={() => <Icon name='md-search' size={28} color='#000'/>}
                    renderSelectedIcon={() => <Icon name='md-search' size={28} color='#dc143c'/>}
                    onPress={() => this.setState({selectedTab: 'Find'})}>
                    {/*<HomeScene/>*/}
                </TabNavigator.Item>

                <TabNavigator.Item
                    tabStyle={styles.tabStyle}
                    title={tabName[2]}
                    selected={this.state.selectedTab === 'ME'}
                    selectedTitleStyle={{color: selectedColor}}
                    renderIcon={() => <Icon name='md-person' size={28} color='#000'/>}
                    renderSelectedIcon={() => <Icon name='md-person' size={28} color='#dc143c'/>}
                    onPress={() => this.setState({selectedTab: 'ME'})}>
                    {/*<HomeScene/>*/}
                </TabNavigator.Item>
            </TabNavigator>
        );
    }

}
const styles = StyleSheet.create({
    tabbar: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    tabStyle: {
        padding: 8
    },
    tab: {
        width: 22,
        height: 22
    }
});
