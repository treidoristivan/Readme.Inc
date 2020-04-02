//import liraries
import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createBottomTabNavigator } from 'react-navigation-tabs';
import { Root } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AuthorDetail from '../screens/AuthorDetail';
import BookDetail from '../screens/BookDetail';
import Category from '../screens/Category';
import ForgotPassword from '../screens/ForgotPassword';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Profile from '../screens/Profile';
import ProfileSetting from '../screens/ProfileSetting';
import Register from '../screens/Register';
import Search from '../screens/Search';
import ReviewHistory from '../screens/ReviewHistory';
import SideMenu from '../screens/SideMenu';
import Splash from '../screens/Splash';
import UserAuthentication from '../screens/UserAuthentication';


//Splash 
const SplashNav = createStackNavigator({
    Splash: {
        screen: Splash,
        navigationOptions: {
            headerShown: false,
        }
    },
}, {
    initialRouteName: 'Splash',
})

//Auth Screen Navigate
const AuthNav = createStackNavigator({
    UserAuthentication: {
        screen: UserAuthentication,
        navigationOptions: {
            headerShown: false,
        },
    },
    Login: {
        screen: Login,
        navigationOptions: {
            headerShown: false,
        },
    },
    Register: {
        screen: Register,
        navigationOptions: {
            headerShown: false,
        },
    },
    ForgotPassword: {
        screen: ForgotPassword,
        navigationOptions: {
            headerShown: false,
        }
    },
}, {
    // initialRouteName: 'UserAuthentication',
})




//const ListNav = createListNavigator({
const CategoryNav = createStackNavigator({
    // Search: {
    //     screen: Search,
    //     navigationOptions: {
    //         headerShown: false,
    //     },
    // },
    Category: {
        screen: Category,
        navigationOptions: {
            headerShown: false,
        },
    },
    BookDetail: {
        screen: BookDetail,
        navigationOptions: {
            headerShown: false,
        },
    },
    AuthorDetail: {
        screen: AuthorDetail,
        navigationOptions: {
            headerShown: false,
        },
    },
}, {
    // initialRouteName: 'Category',
})

CategoryNav.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        tabBarVisible,
    }
}
//
const HomeNav = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            headerShown: false,
        },
    },
    SideMenu:{
        screen: SideMenu,
        navigationOptions:{
            headerShown:false,
        },
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            headerShown: false,
        },
    },
    ProfileSetting: {
        screen: ProfileSetting,
        navigationOptions: {
            headerShown: false,
        },  
    },
    ReviewHistory:{
        screen:ReviewHistory,
        navigationOptions:{
            headerShown:false,
        }
    },
    Search: {
        screen: Search,
        navigationOptions: {
            headerShown: false,
        },
    },
    BookDetail: {
        screen: BookDetail,
        navigationOptions: {
            headerShown: false,
        },
    },
    AuthorDetail: {
        screen: AuthorDetail,
        navigationOptions: {
            headerShown: false,
        },
    },
}, {
    // initialRouteName: 'Home',
})

HomeNav.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        tabBarVisible,
    }
}

const AuthorNav = createStackNavigator ({
    Search: {
        screen: Search,
        navigationOptions: {
            headerShown: false,
        },
    }, AuthorDetail: {
        screen: AuthorDetail,
        navigationOptions: {
            headerShown:false
        }
    },
    AuthorBook:{
        screen: BookDetail,
        navigationOptions: {
            headerShown:false
        }
    }
}, {
    // initialRouteName: 'Author',
})

AuthorNav.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        tabBarVisible,
    }
}

const ProfileNav = createStackNavigator({
    Profile: {
        screen: Profile,
        navigationOptions: {
            headerShown: false,
        },
    },
    ProfileSetting: {
        screen: ProfileSetting,
        navigationOptions: {
            headerShown: false,
        },  
    },
    
}, {
    // initialRouteName: 'Profile',
})

ProfileNav.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        tabBarVisible,
    }
}

const MainNav = createStackNavigator ({
    SideMenu:{
        screen: SideMenu,
        navigationOptions:{
            tabBarIcon:({tintColor}) => {
                return <Icon name="menu" size={25} color={tintColor}/>
            }
        }
    },
    
},{
        // initialRouteName: 'SideMenu',
        tabBarOptions: {
            activeTintColor: 'white',
            activeBackgroundColor: '#3399ff',
            inactiveTintColor: '#3399ff',
            style: {
                backgroundColor: 'white',
                borderTopColor: 'transparent',
            }
        }
    })
   
const BottomNav = createBottomTabNavigator({
    
    Category: {
        screen: CategoryNav,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => {
                return <Icon name="wunderlist" size={25} color={tintColor} />;
            },
        },
    },
    Menu: {
        screen: HomeNav,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => {
                return <Icon name="book-open-page-variant" size={30} color={tintColor} />;
            },
        },
    },
    Author: {
        screen: AuthorNav,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => {
                return <Icon name="feather" size={25} color={tintColor} />;
            },
        },
    },
    
}, {
    // initialRouteName: 'Menu',
    tabBarOptions: {
        activeTintColor: 'white',
        activeBackgroundColor: '#3399ff',
        inactiveTintColor: '#3399ff',
        style: {
            backgroundColor: 'white',
            borderTopColor: 'transparent',
        }
    }
})

const SwitchNav = createSwitchNavigator({
    SplashNav,
    AuthNav,
    MainNav,
    BottomNav,
}, {
    // initialRouteName: 'SplashNav',
})

const AppContainer = createAppContainer(SwitchNav)
// create a component
class Router extends Component {
    render() {
        return (
            <Root>
                <AppContainer />
            </Root>
        );
    }
}

//make this component available to the app
export default Router;
