import React, { Component } from 'react'
import  {StyleSheet, Text,View, SafeAreaView,ScrollView,Dimensions} from 'react-native'
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer'

import Profile from '../components/SideMenu/Profile'
// import MyBooks from '../components/SideMenu/MyBooks'
// import ReadingChallenge from '../components/SideMenu/ReadingChallenge'
// import BestBooks from '../components/SideMenu/BestBooks'
// import Recommendations from '../components/SideMenu/Recommendations'

export default class SideMenu extends Component {
    render() {
        return (
            <Drawer/>
        );
    }
}

const Custom = (props) => (
    <SafeAreaView style={{flex:1}}>
        <View style={{height:150, backgroundColor:'white', alignItems:'center', justifyContent:'center'}}>
            <Image source={require('../assets/images/default.png')} style={{height:120, width:120, borderRadius:50}}/>
        </View>
        <ScrollView>
            <Drawer {...props}/>
        </ScrollView>
    </SafeAreaView>
)

const Drawer = createDrawerNavigator({
    Profile: Profile,
    // MyBooks: MyBooks,
    // ReadingChallenge: ReadingChallenge,
    // BestBooks: BestBooks,
    // ReadingChallenge: Recommendations

},{
    contentComponent: Custom,
    drawerWidth: 'width'
})

const style = StyleSheet.create({
    container :{
        flex:1,
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center'
    }
})
