//import liraries
import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Root, Tab } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//Components Screens
import Author from '../screens/Author';
import AuthorDetail from '../screens/AuthorDetail';
import BookDetail from '../screens/BookDetail';
import Category from '../screens/Category';
import CategoryDetail from '../screens/CategoryDetail';
import ForgotPassword from '../screens/ForgotPassword';
import ForgotPasswordSuccess from '../screens/ForgotPasswordSuccess';
import Home from '../screens/Home';
import SideMenu from '../screens/SideMenu'
import SliderBar from '../components/SliderBar';
import Login from '../screens/Login';
import Verify from '../screens/Verify'
import Profile from '../components/SideMenu/Profile';
import ProfileSetting from '../components/SideMenu/ProfileSetting';
import Register from '../screens/Register';
import Search from '../screens/Search';
import ReviewHistory from '../screens/ReviewHistory';
import Splash from '../screens/Splash';
import UserAuthentication from '../screens/UserAuthentication';
import { Header } from 'react-native/Libraries/NewAppScreen';


//Component Side Menu
import BestBooks from '../components/SideMenu/BestBooks';
import MyFavoriteBooks from '../components/SideMenu/MyBooks';
import ReadingChallenge from '../components/SideMenu/ReadingChallenge';
import Recommendations from '../components/SideMenu/Recommendations';
import Setting from '../components/SideMenu/Setting';

//Splash 
const SplashNav = createStackNavigator({
    Splash: {
        screen: Splash,
        navigationOptions: {
            headerShown: false,
        }
    },
}, {
    // initialRouteName: 'Splash',
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
    Verify: {
        screen: Verify,
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
    ForgotPasswordSuccess: {
        screen: ForgotPasswordSuccess,
        navigationOptions: {
            headerShown: false
        }
    }
}, {
    //  initialRouteName: 'UserAuthentication',
})

//const ListNav = createListNavigator({
const CategoryNav = createStackNavigator({
    Category: {
        screen: Category,
        navigationOptions: {
            headerShown: false,
        },
    },
    CategoryDetail: {
        screen: CategoryDetail,
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

const MenuNav = createStackNavigator({
    BestBooks: {
        screen: BestBooks,
        navigationOptions: {
            headerShown: false,
        }
    },
    MyFavoriteBooks: {
        screen: MyFavoriteBooks,
        navigationOptions: {
            headerShown: false,
        }
    },
    ReadingChallenge: {
        screen: ReadingChallenge,
        navigationOptions: {
            headerShown: false,
        }
    },
    Recommendations: {
        screen: Recommendations,
        navigationOptions: {
            headerShown: false,
        }
    },
    Setting: {
        screen: Setting,
        navigationOptions: {
            headerShown: false,
        }
    },

}, {
    // initialRouteName: 'Author',
})

MenuNav.navigationOptions = ({ navigation }) => {
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
    SideMenu: {
        screen: SideMenu,
        navigationOptions: {
            headerShown: false,
        },
    },
    SliderBar: {
        screen: SliderBar,
        navigationOptions: {
            headerShown: false,
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
    ReviewHistory: {
        screen: ReviewHistory,
        navigationOptions: {
            headerShown: false,
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
        headerLeft: <Header navigationProps={navigation} />,

    }
}

const AuthorNav = createStackNavigator({
    Author: {
        screen: Author,
        navigationOptions: {
            headerShown: false
        }
    },
    AuthorDetail: {
        screen: AuthorDetail,
        navigationOptions: {
            headerShown: false
        }
    },
    AuthorBook: {
        screen: BookDetail,
        navigationOptions: {
            headerShown: false
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
    //  initialRouteName: 'Profile',
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
            borderTopWidth: 1,
            borderTopColor: '#3399ff',
            paddingBottom: 3,
            height: 60,
            shadowColor: '#00cc00',
            shadowOpacity: 0.8,
            shadowRadius: 20,
            shadowOffset: { width: 0, height: 0 }
        }
    }
})

// const DrawerNavigator = createDrawerNavigator({
//     Dashboard:{
//         screen:BottomNav
//     },
//     MyProfile:{
//         screen:ProfileNav
//     },

// })

const SwitchNav = createSwitchNavigator({
    SplashNav,
    AuthNav,
    BottomNav,
    MenuNav


}, {
    //  initialRouteName: 'SplashNav',
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
