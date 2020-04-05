//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'native-base';
import { Header as Head } from 'native-base';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { APP_URL } from '../config/config';

class HeaderOriginal extends Component {
    // toggleDrawer = () => {
    //     //Props to open/close the drawer
    //     this.props.navigationProps.toggleDrawer();
    //   };
    render() {

        return (
            <Head androidStatusBarColor="#222" style={styles.head}>
                {this.props.auth.data &&
                    <View style={styles.headWrapper}>
                        <TouchableWithoutFeedback
                            // onPress={()=> this.props.navigation.openDrawer()}
                            onPress={() => this.props.navigation.navigate('SideMenu')}
                        >
                            <Icon name="menu" size={30} />
                        </TouchableWithoutFeedback>

                        <TouchableOpacity style={styles.imageWrapper} onPress={() => this.props.navigation.navigate('Profile')}>
                            <Text style={styles.name}> {this.props.auth.data.user_fullname}</Text>

                            {this.props.auth.data.user_image !== null &&
                                <Image source={{ uri: APP_URL.concat(this.props.auth.data.user_image) }} style={styles.image} />
                            }

                            {this.props.auth.data.user_image === null &&
                                <Image style={styles.image} source={require('../assets/images/default.png')} />
                            }

                        </TouchableOpacity>
                    </View>
                }
            </Head>
        );
    }
}


// define your styles
const styles = StyleSheet.create({
    head: { height: 100, backgroundColor: '#fff', elevation: 0, },
    headWrapper: { flex: 1, flexDirection: 'row', padding: 20, alignItems: 'center', justifyContent: 'space-between' },
    nameWrapper: { flex: 1, flexDirection: 'column' },
    name: { fontFamily: 'Nunito-Regular', fontSize: 18 },
    title: { fontFamily: 'Nunito-Regular', color: '#008080' },
    imageWrapper: { flex: 1, justifyContent: 'center', alignItems: 'flex-end' },
    image: { width: 40, height: 40, borderRadius: 100 },
});

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const Header = withNavigation(HeaderOriginal)

//make this component available to the app
export default connect(mapStateToProps)(Header);
