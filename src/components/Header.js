//import liraries
import React, { Component } from 'react';
import { View,StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Header as Head } from 'native-base';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { APP_URL } from '../config/config';
import SearchBar from '../components/SearchBar'

class HeaderOriginal extends Component {
    render() {
        return (
            <Head androidStatusBarColor="#3399ff" style={styles.head}>
                {this.props.auth.data &&
                    <View style={styles.headWrapper}>
                        <TouchableWithoutFeedback  onPress={() => this.props.navigation.navigate('SideMenu')} >
                            <Icon name="menu" size={33} style={{marginBottom:20, color:'#3399ff'}}/>
                        </TouchableWithoutFeedback>
                        <SearchBar style={{}}/>
                        <TouchableOpacity style={styles.imageWrapper} onPress={() => this.props.navigation.navigate('Profile')}>
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
    head: { height: 80, backgroundColor: '#fff'},
    headWrapper: { flex: 1, flexDirection: 'row', padding: 20,paddingTop:40, alignItems: 'center' },
    nameWrapper: { flex: 1, flexDirection: 'column' },
    name: { fontFamily: 'Nunito-Regular', fontSize: 18 },
    title: { fontFamily: 'Nunito-Regular', color: '#008080' },
    imageWrapper: { flex: 1, justifyContent: 'center', alignItems: 'flex-end',marginBottom:8},
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
